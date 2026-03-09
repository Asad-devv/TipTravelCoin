import React from 'react';
import { CheckCircle, X, Sparkles } from 'lucide-react';

const SuccessModal = ({ tokensBought, onClose }) => {
  if (!tokensBought) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm mx-4 success-modal-card">
        {/* Glow */}
        <div className="success-modal-glow" />

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
          <X className="h-4 w-4" />
        </button>

        <div className="relative z-10 text-center p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="success-icon-ring">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-1">Purchase Confirmed!</h2>
          <p className="text-slate-400 text-sm mb-5">Your $TTC tokens are on the way.</p>

          {/* Amount box */}
          <div className="success-amount-box mb-5">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
              <span className="text-2xl font-black text-white">{tokensBought}</span>
              <span className="text-amber-400 font-bold text-lg">$TTC</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Tokens Received</p>
          </div>

          <p className="text-xs text-slate-500 mb-5">
            Thank you for joining the TIP Nation ecosystem.
          </p>

          <button onClick={onClose} className="success-close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
