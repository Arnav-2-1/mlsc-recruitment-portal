import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../context/ExamContext';
import { PageContainer } from '../components/layout/PageContainer';
import { TimerCard } from '../components/quiz/TimerCard';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { QuestionPalette } from '../components/quiz/QuestionPalette';
import { StatsCard } from '../components/quiz/StatsCard';
import { NavigationBar } from '../components/quiz/NavigationBar';
import { SecurityModal } from '../components/quiz/SecurityModal';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Maximize2, ShieldAlert } from 'lucide-react';

export const Quiz = () => {
  const { candidate, examStarted, examCompleted, triggerWarning } = useExam();
  const navigate = useNavigate();
  
  // Track if the app is actively in fullscreen mode
  const [isFullscreenActive, setIsFullscreenActive] = useState(
    () => !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
  );

  // ✨ ANTI-RACE CONDITION LOCK: Prevents multiple events from triggering at the exact same millisecond
  const lastViolationTime = useRef(0);

  useEffect(() => {
    if (!candidate) navigate('/');
    else if (!examStarted) navigate('/instructions');
    else if (examCompleted) navigate('/result');
  }, [candidate, examStarted, examCompleted, navigate]);

  useEffect(() => {
    if (!examStarted || examCompleted) return;

    // Helper wrapper to ensure warnings can only trigger once every 1.5 seconds
    const safeTriggerWarning = (reason) => {
      const now = Date.now();
      if (now - lastViolationTime.current > 1500) { 
        lastViolationTime.current = now;
        triggerWarning(reason);
      }
    };

    const handleVisibilityChange = () => { 
      if (document.hidden) safeTriggerWarning("Tab Switch Detected"); 
    };
    
    const handleBlur = () => {
      // Small timeout ensures alert dialog box blurs don't trigger false positives
      setTimeout(() => {
        if (!document.hasFocus() && !examCompleted) {
          safeTriggerWarning("Window Blur Detected");
        }
      }, 200);
    };
    
    const handleFullscreenChange = () => {
      const activeElement = document.fullscreenElement || 
                            document.webkitFullscreenElement || 
                            document.mozFullScreenElement || 
                            document.msFullscreenElement;
      
      const checkFullscreen = !!activeElement;
      setIsFullscreenActive(checkFullscreen);

      if (!checkFullscreen && !examCompleted) {
        safeTriggerWarning("Exited Fullscreen Mode");
      }
    };

    // TOUCHPAD LOCKDOWN: Prevent Control + Scroll zoom tricks on Trackpads
    const handleWheelZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // TOUCHPAD LOCKDOWN: Block browser secondary tap options context menus 
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    // Bind trackpad defensive listeners with passive flag set to false to support preventDefault()
    window.addEventListener('wheel', handleWheelZoom, { passive: false });
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      
      window.removeEventListener('wheel', handleWheelZoom);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [examStarted, examCompleted]);

  // Function to lock fullscreen mode again post-refresh
  const handleRestoreFullscreen = async () => {
    const element = document.documentElement;
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      }
      setIsFullscreenActive(true);
    } catch (err) {
      console.warn("Fullscreen recovery blocked:", err);
    }
  };

  if (!candidate || !examStarted) return null;

  // INTERCEPTOR VIEWPORT: Triggered if the student reloads the page or escapes fullscreen
  if (!isFullscreenActive && !examCompleted) {
    return (
      <div className="fixed inset-0 z-50 bg-[#020617] flex items-center justify-center p-6 select-none">
        <Card className="max-w-md w-full border-slate-800 bg-slate-900/40 text-center p-8 shadow-2xl">
          <div className="mx-auto w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 mb-4">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-xl font-black text-slate-100 tracking-wide mb-2">Fullscreen Required</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            The page environment was reloaded or disrupted. To protect evaluation security and resume your assessment session, you must lock the screen context.
          </p>
          <Button variant="primary" onClick={handleRestoreFullscreen} className="w-full py-3 font-semibold text-sm gap-2">
            <Maximize2 className="w-4 h-4" /> Restore Fullscreen Mode
          </Button>
        </Card>
      </div>
    );
  }

  // STANDARD VIEWPORT: Shown when everything is operating securely
  return (
    <div className="w-full min-h-[calc(100vh-65px)] flex flex-col justify-between bg-[#020617]">
      <PageContainer className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
        <div className="lg:col-span-2"><QuestionCard /></div>
        <div className="space-y-4">
          <TimerCard />
          <StatsCard />
          <QuestionPalette />
        </div>
      </PageContainer>
      <NavigationBar />
      <SecurityModal />
    </div>
  );
};