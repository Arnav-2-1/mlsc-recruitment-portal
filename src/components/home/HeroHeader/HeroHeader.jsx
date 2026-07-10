import React from 'react';
// Step 1: Correctly import the new official MLSA logo asset
import mlsaLogo from '../../../assets/mlsa-logo.png'; 

export const HeroHeader = () => {
  return (
    <div className="flex flex-col items-center text-center mb-10 max-w-xl mx-auto animate-fadeIn select-none">
      
      {/* Step 2: Swap the old div icon for the official high-res brand image */}
      <img 
        src={mlsaLogo} 
        alt="Microsoft Learn Student Ambassadors Logo" 
        className="w-24 h-24 object-contain mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.25)]"
      />

      <h1 className="text-4xl font-black text-white tracking-tight sm:text-5xl">
        Recruitment Portal
      </h1>
      
      <p className="text-sm font-semibold text-blue-400 mt-2 tracking-wide uppercase">
        Microsoft Learn Student Chapter
      </p>

      {/* Recruitment Status Pill */}
      <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Recruitment 2026 Open
      </div>
    </div>
  );
};