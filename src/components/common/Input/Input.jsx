import React from 'react';
export const Input = ({ label, icon: Icon, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && <label className="text-xs font-medium text-slate-400 select-none">{label}</label>}
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-3 w-4 h-4 text-slate-500 pointer-events-none" />}
        <input className={`w-full bg-slate-900/60 border border-slate-700 rounded-lg text-sm text-slate-200 py-2.5 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 ${Icon ? 'pl-9 pr-4' : 'px-4'}`} {...props} />
      </div>
    </div>
  );
};