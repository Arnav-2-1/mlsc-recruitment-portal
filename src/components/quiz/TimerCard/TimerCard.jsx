import React, { useEffect } from 'react';
import { useExam } from '../../../context/ExamContext';
import { Card } from '../../common/Card';
import { Clock } from 'lucide-react';

export const TimerCard = () => {
  const { timeLeft, setTimeLeft, completeExam } = useExam();

  // Total initial duration of the exam (e.g., 1 hour = 3600 seconds)
  const totalDuration = 3600; 

  useEffect(() => {
    if (timeLeft <= 0) {
      completeExam();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, completeExam, setTimeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return { hours: h, minutes: m, seconds: s };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  // Percentage calculations
  const percentageLeft = Math.max(0, Math.min(100, (timeLeft / totalDuration) * 100));
  
  // Calculate exact rotation degrees for the clock hand (0 to 360 deg)
  // Winding down from 360 back to 0 as time runs out
  const rotationDegrees = (timeLeft / totalDuration) * 360;

  // Color logic matching your system benchmarks
  let clockThemeColor = 'text-emerald-400 stroke-emerald-400';
  let pulseOverlay = '';

  if (percentageLeft <= 15) {
    clockThemeColor = 'text-rose-500 stroke-rose-500';
    pulseOverlay = 'animate-pulse bg-rose-500/5 absolute inset-1 rounded-full';
  } else if (percentageLeft <= 35) {
    clockThemeColor = 'text-amber-500 stroke-amber-500';
  }

  return (
    <Card className="p-6 border-slate-800 bg-[#040814] relative overflow-hidden select-none">
      <div className="flex items-center justify-between">
        
        {/* Left Side: Layout Data */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-400 tracking-wider">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Time Remaining</span>
          </div>
          
          {/* Numbers Area */}
          <div className="flex items-center gap-2 font-sans antialiased tracking-tight">
            <span className="text-4xl font-extrabold text-white font-mono">{hours}</span>
            <span className="text-xl font-bold text-slate-600">:</span>
            <span className="text-4xl font-extrabold text-white font-mono">{minutes}</span>
            <span className="text-xl font-bold text-slate-600">:</span>
            <span className={`text-4xl font-extrabold font-mono transition-colors duration-300 ${percentageLeft <= 15 ? 'text-rose-400' : 'text-white'}`}>
              {seconds}
            </span>
          </div>
        </div>

        {/* Right Side: True Analog Clock Display */}
        <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
          
          <div className={pulseOverlay} />

          {/* Clock Dial Structure */}
          <svg className="w-full h-full" viewBox="0 0 64 64">
            {/* Outer Rim Ring */}
            <circle 
              cx="32" cy="32" r="28" 
              className="stroke-slate-800" 
              strokeWidth="2" 
              fill="transparent" 
            />
            
            {/* Subtle Clock Hour Ticks */}
            <g className="stroke-slate-700" strokeWidth="1.5" strokeLinecap="round">
              <line x1="32" y1="6" x2="32" y2="9" />   {/* 12 o'clock */}
              <line x1="58" y1="32" x2="55" y2="32" /> {/* 3 o'clock */}
              <line x1="32" y1="58" x2="32" y2="55" /> {/* 6 o'clock */}
              <line x1="6" y1="32" x2="9" y2="32" />   {/* 9 o'clock */}
            </g>

            {/* Moving Clock Hand Ring Axis */}
            <g 
              transform={`rotate(${rotationDegrees} 32 32)`} 
              className="transition-transform duration-1000 ease-linear"
            >
              {/* Sweeping Center Hand pointing to current time status */}
              <line 
                x1="32" y1="32" 
                x2="32" y2="10" 
                className={`stroke-2 stroke-linecap-round ${clockThemeColor.split(' ')[1]}`}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* Solid Center Core Pin */}
            <circle 
              cx="32" cy="32" r="2.5" 
              className={`fill-slate-900 stroke-2 ${clockThemeColor.split(' ')[1]}`} 
            />
          </svg>
          
        </div>

      </div>
    </Card>
  );
};