import React from 'react';
export const Checkbox = ({ label, id, className = '', ...props }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <input type="checkbox" id={id} className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500/40 focus:ring-offset-0 accent-blue-600 cursor-pointer" {...props} />
      {label && <label htmlFor={id} className="text-xs font-medium text-slate-400 cursor-pointer">{label}</label>}
    </div>
  );
};