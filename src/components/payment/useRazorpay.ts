import { useState, useCallback, useRef } from 'react';
import { auth } from '../../lib/firebase';
import { PaymentState } from '../../types';
import { toast } from 'sonner';

const PRO_AMOUNT = 29900; // ₹299 in paise

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

interface UseRazorpayReturn {
  paymentState: PaymentState;
  startCheckout: () => Promise<void>;
  resetPayment: () => void;
  errorMessage: string | null;
}

export function useRazorpay(onSuccess: () => void): UseRazorpayReturn {
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const rzpInstanceRef = useRef<any>(null);

  const resetPayment = useCallback(() => {
    setPaymentState('idle');
    setErrorMessage(null);
  }, []);

  const startCheckout = useCallback(async () => {
    // Guard: prevent double-trigger
    if (!['idle', 'cancelled', 'failed', 'verification_failed'].includes(paymentState)) return;

    setErrorMessage(null);

    // 1. Ensure the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      toast.error('Please sign in to subscribe to Pro.');
      return;
    }

    // 2. Load Razorpay Checkout script
    setPaymentState('creating_order');
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setPaymentState('failed');
      const msg = 'Failed to load payment gateway. If you have an ad-blocker or Brave Shields active, please pause it for this page and try again.';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    // 3. Get Firebase ID token for backend auth
    let idToken: string;
    try {
      idToken = await user.getIdToken();
    } catch {
      setPaymentState('failed');
      setErrorMessage('Authentication error. Please sign in again.');
      return;
    }

    // 4. Create Razorpay order on backend
    let orderData: { orderId: string; amount: number; currency: string; keyId: string };
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ amount: PRO_AMOUNT }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Server error' }));
        throw new Error(err.error || `Server returned ${res.status}`);
      }

      orderData = await res.json();
    } catch (err: any) {
      setPaymentState('failed');
      setErrorMessage(err.message || 'Could not create payment order. Please try again.');
      return;
    }

    // 5. Open Razorpay Checkout
    setPaymentState('checkout_open');

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'FreelanceOS',
      description: 'Pro Subscription — Unlimited Intelligence',
      order_id: orderData.orderId,
      prefill: {
        name: user.displayName || '',
        email: user.email || '',
      },
      theme: {
        color: '#6F86F5',
      },
      modal: {
        ondismiss: () => {
          // Only set cancelled if we haven't already moved to verification
          setPaymentState((prev) =>
            prev === 'checkout_open' || prev === 'payment_processing' ? 'cancelled' : prev
          );
        },
      },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        // 6. Payment captured by Razorpay — now verify on backend
        setPaymentState('verification_pending');

        try {
          const freshToken = await user.getIdToken(true);
          const verifyRes = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${freshToken}`,
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            setPaymentState('success');
            onSuccess();
          } else {
            setPaymentState('verification_failed');
            setErrorMessage(verifyData.error || 'Payment verification failed. Contact support.');
          }
        } catch {
          setPaymentState('verification_failed');
          setErrorMessage('Network error during verification. Contact support with your payment ID.');
        }
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzpInstanceRef.current = rzp;
      rzp.on('payment.failed', (response: any) => {
        console.warn('[Razorpay] Payment failed event:', response?.error);
        setPaymentState('failed');
        setErrorMessage(response?.error?.description || 'Payment failed. Please try again.');
      });
      rzp.open();
    } catch (err: any) {
      console.warn('[Razorpay] Checkout modal initialization notice:', err);
      setPaymentState('failed');
      setErrorMessage('Could not open payment window. If an ad blocker is enabled, please pause it and try again.');
    }
  }, [paymentState, onSuccess]);

  return { paymentState, startCheckout, resetPayment, errorMessage };
}
