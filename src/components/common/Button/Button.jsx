import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', disabled, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold tracking-wide transition-all duration-300 transform rounded-xl active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 select-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/40 border border-blue-500/30",
    secondary: "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 shadow-md shadow-black/20",
    success: "bg-emerald-600/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-900/20",
    danger: "bg-rose-600/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 shadow-lg shadow-rose-900/20"
  };

  return (
    <button 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};