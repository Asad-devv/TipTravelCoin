import React from "react";

const Loader = ({ label }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="loader-card">
      <div className="loader-glow" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="loader-spinner-ring">
          <svg className="animate-spin h-8 w-8 text-amber-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-white">{label || "Processing..."}</p>
          <p className="text-xs text-slate-500 mt-0.5">Please don't close this window</p>
        </div>
      </div>
    </div>
  </div>
);

export default Loader;
