import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-[#111827] border border-slate-800 rounded-sm p-6 shadow-sm transition-all ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};