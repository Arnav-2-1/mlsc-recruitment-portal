import React, { useEffect, useState } from 'react';
import { Laptop } from 'lucide-react';

export const DeviceBlocker = ({ children }) => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // 1. Check screen width (Standard tablets/phones are under 1024px width)
      const isLowWidth = window.innerWidth < 1024;

      // 2. Check user agent strings for absolute mobile/tablet identification
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileAgent = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

      // 3. Detect touch-only desktop emulators or modern iPads
      const isTouchDevice = ('ontouchstart' in window) && (navigator.maxTouchPoints > 1) && !/macintosh/i.test(userAgent);

      if (isLowWidth || isMobileAgent || isTouchDevice) {
        setIsMobileOrTablet(true);
      } else {
        setIsMobileOrTablet(false);
      }
    };

    // Run verification on mount and on window resize adjustments
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobileOrTablet) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#040814] flex items-center justify-center p-6 text-center select-none antialiased">
        <div className="max-w-md w-full border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl shadow-black/40 flex flex-col items-center">
          
          {/* Hardware Restriction Icon */}
          <div className="w-16 h-16 bg-blue-500/10 border-2 border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-950/40 text-blue-400">
            <Laptop className="w-8 h-8 animate-pulse" />
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight mb-3">
            Laptop or PC Required
          </h1>
          
          <p className="text-xs font-semibold text-blue-400 tracking-wide uppercase mb-4">
            Microsoft Learn Student Chapter
          </p>

          <p className="text-sm text-slate-400 leading-relaxed">
            To ensure assessment security, proctoring integrity, and compatibility with our development code environment, this evaluation platform cannot be accessed on mobile or tablet devices.
          </p>

          <div className="mt-6 text-xs text-slate-500 font-mono bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800/60">
            Please switch to a desktop browser to proceed.
          </div>
        </div>
      </div>
    );
  }

  // If the device is a laptop/PC, render the portal normally
  return <>{children}</>;
};