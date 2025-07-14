import React from 'react';
import { CheckCircle, PartyPopper } from 'lucide-react';

const SuccessModal = ({ tokensBought, onClose }) => {
  if (!tokensBought) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center border border-gray-700">
        <div className="flex justify-center mb-3 space-x-3">
          <CheckCircle className="text-green-400 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-green-400 mb-2">Purchase Successful</h2>
        <p className="text-gray-300">You’ve received:</p>
    
    <div className='flex items-center justify-center'>    <PartyPopper className="text-yellow-400 w-6 h-6 mr-1 " />

        <p className="text-2xl font-semibold text-blue-500 mt-4">{tokensBought} $DEM Tokens</p>

        </div>
        <p className="text-xs font-semibold text-blue-300 mt-1 mb-4">Thanks for being part of community</p>

        <button
          onClick={onClose}
          className="mt-4 px-5 py-2 bg-blue-900 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
