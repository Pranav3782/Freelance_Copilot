import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, LoaderCircle, ShieldCheck, RefreshCw, ArrowRight, X } from 'lucide-react';
import { PaymentState } from '../../types';

interface PaymentStatusDialogProps {
  paymentState: PaymentState;
  errorMessage: string | null;
  onDismiss: () => void;
  onRetry: () => void;
  onGoToDashboard: () => void;
}

const isVisible = (state: PaymentState) =>
  ['verification_pending', 'success', 'cancelled', 'failed', 'verification_failed'].includes(state);

export const PaymentStatusDialog: React.FC<PaymentStatusDialogProps> = ({
  paymentState,
  errorMessage,
  onDismiss,
  onRetry,
  onGoToDashboard,
}) => {
  return (
    <AnimatePresence>
      {isVisible(paymentState) && (
        <motion.div
          key="payment-dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            key="payment-dialog-panel"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] border-2 border-[#050505] shadow-retro-lg p-7 sm:p-9 text-[#050505] overflow-y-auto max-h-[90dvh] sm:max-h-none"
          >
            {/* Close button — only when dismissible */}
            {(paymentState === 'cancelled' || paymentState === 'failed' || paymentState === 'verification_failed') && (
              <button
                onClick={onDismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F7F7F5] border-2 border-[#050505] flex items-center justify-center hover:bg-[#FFD51F] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* VERIFICATION PENDING */}
            {paymentState === 'verification_pending' && (
              <div className="flex flex-col items-center text-center space-y-5">
                <div className="w-20 h-20 rounded-3xl bg-[#6F86F5]/15 border-2 border-[#6F86F5] flex items-center justify-center">
                  <LoaderCircle className="w-10 h-10 text-[#6F86F5] animate-spin" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight">Verifying Payment…</h3>
                  <p className="text-sm font-medium text-[#050505]/70 leading-relaxed">
                    We're confirming your payment with our server. This takes just a moment — please don't close this window.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFF39A] border-2 border-[#050505] text-xs font-black">
                  <ShieldCheck className="w-4 h-4 text-[#050505]" />
                  Secured by Razorpay
                </div>
              </div>
            )}

            {/* SUCCESS */}
            {paymentState === 'success' && (
              <div className="flex flex-col items-center text-center space-y-5">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 24, delay: 0.1 }}
                  className="w-24 h-24 rounded-3xl bg-[#4DBA76] border-2 border-[#050505] shadow-retro flex items-center justify-center"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD51F] text-[#050505] text-[10px] font-black uppercase tracking-wider border-2 border-[#050505] shadow-retro-sm mb-3">
                      🎉 Welcome to Pro
                    </span>
                    <h3 className="text-2xl font-black tracking-tight">You're officially Pro!</h3>
                    <p className="text-sm font-medium text-[#050505]/70 mt-1 leading-relaxed">
                      Your subscription is active. Unlimited project analyses, full risk scanner, truth-checked proposals — all unlocked.
                    </p>
                  </motion.div>
                </div>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={onGoToDashboard}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#6F86F5] hover:bg-[#536CE8] text-white font-black text-base border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer transition-all"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}

            {/* CANCELLED */}
            {paymentState === 'cancelled' && (
              <div className="flex flex-col items-center text-center space-y-5">
                <div className="w-20 h-20 rounded-3xl bg-[#FFF39A] border-2 border-[#050505] shadow-retro-sm flex items-center justify-center">
                  <X className="w-10 h-10 text-[#050505]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight">Payment Cancelled</h3>
                  <p className="text-sm font-medium text-[#050505]/70 leading-relaxed">
                    No charges were made. You can try again any time — your free trial is still active.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={onDismiss}
                    className="flex-1 py-3.5 rounded-xl border-2 border-[#050505] bg-white hover:bg-[#F7F7F5] text-sm font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={onRetry}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#FFD51F] hover:bg-[#6F86F5] hover:text-white text-[#050505] text-sm font-black border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* FAILED / VERIFICATION FAILED */}
            {(paymentState === 'failed' || paymentState === 'verification_failed') && (
              <div className="flex flex-col items-center text-center space-y-5">
                <div className="w-20 h-20 rounded-3xl bg-[#F05D5E]/15 border-2 border-[#F05D5E] shadow-retro-sm flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-[#F05D5E]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight">
                    {paymentState === 'verification_failed' ? 'Verification Failed' : 'Payment Failed'}
                  </h3>
                  <p className="text-sm font-medium text-[#050505]/70 leading-relaxed">
                    {errorMessage ||
                      (paymentState === 'verification_failed'
                        ? 'We could not verify your payment. If you were charged, contact support.'
                        : 'Something went wrong. No charges were made.')}
                  </p>
                </div>
                {paymentState === 'verification_failed' && (
                  <div className="w-full p-3 rounded-xl bg-[#F05D5E]/10 border-2 border-[#F05D5E]/30 text-xs font-bold text-[#F05D5E] text-left">
                    ⚠️ If you were charged, please contact support with your Razorpay payment ID. We'll manually activate your subscription.
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={onDismiss}
                    className="flex-1 py-3.5 rounded-xl border-2 border-[#050505] bg-white hover:bg-[#F7F7F5] text-sm font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
                  >
                    Dismiss
                  </button>
                  {paymentState === 'failed' && (
                    <button
                      onClick={onRetry}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#6F86F5] hover:bg-[#536CE8] text-white text-sm font-black border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Retry Payment
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
