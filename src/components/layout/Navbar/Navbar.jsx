import React from 'react';
import { useExam } from '../../../context/ExamContext';
import mlsaLogo from '../../../assets/mlsa-logo.png';

export const Navbar = () => {
  const { candidate } = useExam();

  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between select-none">
      <div className="flex items-center gap-3">
        <img 
          src={mlsaLogo} 
          alt="MLSA Shield Logo" 
          className="w-9 h-auto object-contain" 
        />
        <div className="h-5 w-px bg-slate-800" />
        <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-wide">
          MLSC Portal
        </span>
      </div>

      {candidate && (
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-slate-200 font-medium">{candidate.fullName}</span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md text-[11px]">
            {candidate.enrollmentNumber}
          </span>
        </div>
      )}
    </nav>
  );
};