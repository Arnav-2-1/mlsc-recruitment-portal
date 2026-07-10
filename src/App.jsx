import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ExamProvider } from './context/ExamContext';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Instructions } from './pages/Instructions';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
// ✨ IMPORT THE NEW DEVICE BLOCKER
import { DeviceBlocker } from './components/common/DeviceBlocker';

function App() {
  
  useEffect(() => {
    // 1. GLOBAL GESTURE LOCKDOWN: Prevent Control + Scroll / Pinch-to-zoom on Trackpads
    const handleWheelZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // 2. GLOBAL GESTURE LOCKDOWN: Block browser context menus (two-finger tap / right-click)
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Bind layout listeners at the absolute root level with passive: false
    window.addEventListener('wheel', handleWheelZoom, { passive: false });
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('wheel', handleWheelZoom);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <ExamProvider>
      <BrowserRouter>
        {/* ✨ WRAP YOUR ENTIRE LAYOUT CONTAINER IN THE DEVICE BLOCKER */}
        <DeviceBlocker>
          <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </DeviceBlocker>
      </BrowserRouter>
    </ExamProvider>
  );
}

export default App;