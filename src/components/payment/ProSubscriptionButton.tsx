import React, { useState, useEffect, useCallback } from 'react';
import { Crown, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { toast } from 'sonner';

export const RAZORPAY_PRO_PAYMENT_URL = 'https://rzp.io/rzp/xDK9HxA';

interface ProSubscriptionButtonProps {
  isAuthenticated: boolean;
  isPro: boolean;
  onOpenAuth: () => void;
  onGoToDashboard: () => void;
}

export const ProSubscriptionButton: React.FC<ProSubscriptionButtonProps> = ({
  isAuthenticated,
  isPro,
  onOpenAuth,
  onGoToDashboard,
}) => {
  const [inlineStatus, setInlineStatus] = useState<'idle' | 'cancelled' | 'failed'>( 'idle');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('payment') || params.get('status');
    if (status === 'cancelled') {
      setInlineStatus('cancelled');
    } else if (status === 'failed' || status === 'error') {
      setInlineStatus('failed');
    }
  }, []);

  const handleClick = useCallback(() => {
    if (!isAuthenticated) {
      onOpenAuth();
      return;
    }
    if (isPro) {
      onGoToDashboard();
      return;
    }

    // Production Razorpay Payment Page Redirection
    window.location.href = RAZORPAY_PRO_PAYMENT_URL;
  }, [isAuthenticated, isPro, onOpenAuth, onGoToDashboard]);

  return (
    <div className="w-full">
      <button
        id="pro-subscription-btn"
        onClick={handleClick}
        disabled={isPro}
        className={`mt-6 sm:mt-8 w-full py-3 sm:py-3.5 rounded-xl font-black text-sm border-2 border-[#050505] shadow-retro transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group
          ${isPro
            ? 'bg-[#4DBA76] text-white hover:bg-[#3da867] shadow-retro'
            : 'bg-[#FFD51F] text-[#050505] hover:bg-white hover:translate-y-[-2px] hover:shadow-[6px_8px_0px_#050505]'
          }`}
        aria-label={isPro ? 'Already subscribed to Pro' : 'Upgrade to Pro plan'}
      >
        {isPro ? (
          <>
            <CheckCircle className="w-4 h-4 text-white" />
            Already on Pro
          </>
        ) : (
          <>
            <Crown className="w-4 h-4 text-[#050505] group-hover:scale-110 transition-transform" />
            Upgrade to Pro
          </>
        )}
      </button>

      {/* Inline Notification contained visually INSIDE the Pricing card container */}
      {inlineStatus === 'cancelled' && (
        <div className="mt-4 p-3.5 rounded-xl bg-[#FFF39A] border-2 border-[#050505] text-[#050505] text-xs font-bold text-left space-y-1 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="font-black text-sm">Payment was cancelled.</span>
            <button
              onClick={() => setInlineStatus('idle')}
              className="p-1 text-[#050505]/70 hover:text-[#050505] cursor-pointer"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-[#050505]/80 font-semibold">
            You were not charged. You can try again anytime.
          </p>
        </div>
      )}

      {inlineStatus === 'failed' && (
        <div className="mt-4 p-3.5 rounded-xl bg-[#F05D5E]/15 border-2 border-[#F05D5E] text-[#050505] text-xs font-bold text-left space-y-1 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="font-black text-sm text-[#F05D5E]">Payment could not be completed.</span>
            <button
              onClick={() => setInlineStatus('idle')}
              className="p-1 text-[#050505]/70 hover:text-[#050505] cursor-pointer"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-[#050505]/80 font-semibold">
            No charges were made. Please try again.
          </p>
        </div>
      )}
    </div>
  );
};
