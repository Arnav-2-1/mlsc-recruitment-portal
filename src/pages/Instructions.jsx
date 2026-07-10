import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../context/ExamContext';
import { PageContainer } from '../components/layout/PageContainer';
import { Checkbox } from '../components/common/Checkbox';
import { Button } from '../components/common/Button';
import mlsaLogo from '../assets/mlsa-logo.png'; // Path to your logo asset

export const Instructions = () => {
  const { candidate, setExamStarted } = useExam();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  useEffect(() => { if (!candidate) navigate('/'); }, [candidate, navigate]);
  if (!candidate) return null;

  const launchFullscreen = async () => {
    const element = document.documentElement;
    try {
      if (element.requestFullscreen) await element.requestFullscreen();
      else if (element.webkitRequestFullscreen) await element.webkitRequestFullscreen();
      else if (element.mozRequestFullScreen) await element.mozRequestFullScreen();
      else if (element.msRequestFullscreen) await element.msRequestFullscreen();
    } catch (err) {
      console.warn("Fullscreen request blocked:", err);
    }
  };

  const handleStartExam = async () => {
    await launchFullscreen();
    setExamStarted(true);
    navigate('/quiz');
  };

  return (
    <PageContainer className="max-w-4xl py-12 px-6 antialiased text-slate-300">
      
      {/* BRANDING & HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-800 pb-8 mb-10">
        <div className="flex items-center gap-4">
          <img 
            src={mlsaLogo} 
            alt="Microsoft Learn Student Ambassador Logo" 
            className="w-16 h-auto object-contain"
          />
          <div>
            <h1 className="text-xl font-semibold text-white tracking-tight">Microsoft Learn Student Ambassadors</h1>
            <p className="text-xs text-slate-400 mt-0.5">Official Examination Environment</p>
          </div>
        </div>
        
        <div className="flex gap-4 font-mono text-[11px] text-slate-400 bg-slate-900/50 px-3 py-2 rounded border border-slate-800">
          <div>QUESTIONS: <span className="text-white font-semibold">20</span></div>
          <div className="w-px bg-slate-800" />
          <div>DURATION: <span className="text-white font-semibold">30 MINS</span></div>
        </div>
      </div>

      {/* TWO COLUMN GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        
        {/* LEFT COMPARTMENT: INSTRUCTIONS LIST */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Section 1: Security Parameters */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Security & Proctoring Policy</h2>
            <div className="w-full h-px bg-slate-800 mb-2" />
            <ul className="space-y-2 text-xs text-slate-400 list-disc pl-4 leading-relaxed">
              <li>This examination enforces mandatory <span className="text-white font-medium">Fullscreen Mode</span>. Attempting to minimize or exit will trigger immediate technical violation parameters.</li>
              <li>System state operations (tab switches, screen blurs, or secondary window context selection) are actively monitored.</li>
              <li>Reaching <span className="text-rose-400 font-semibold underline">3 system warnings</span> terminates your test context and submits your current script automatically.</li>
            </ul>
          </div>

          {/* Section 2: Evaluation Parameters */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scoring Matrix</h2>
            <div className="w-full h-px bg-slate-800 mb-2" />
            <ul className="space-y-2 text-xs text-slate-400 list-disc pl-4 leading-relaxed">
              <li>Every correctly validated question submission awards <span className="text-emerald-400 font-semibold">+4.00 marks</span>.</li>
              <li>There is <span className="text-white font-medium">no negative marking penalty</span> calculated for incorrect answers.</li>
              <li>Unanswered questions skip processing calculations neutrally (<span className="text-slate-500">0.00 marks</span>).</li>
            </ul>
          </div>

        </div>

        {/* RIGHT COMPARTMENT: USER IDENTITY CARD */}
        <div className="bg-slate-900/30 border border-slate-800/80 rounded p-5 h-fit space-y-4">
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Candidate Validation</h2>
          
          <div>
            <label className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Name</label>
            <p className="text-sm font-medium text-white mt-0.5">{candidate.fullName}</p>
          </div>

          <div>
            <label className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Enrollment / Identifier</label>
            <p className="text-sm font-semibold text-white font-mono mt-0.5 tracking-tight">{candidate.enrollmentNumber}</p>
          </div>
        </div>

      </div>

      {/* FOOTER ACCEPTANCE BAR */}
      <div className="bg-slate-900/20 border border-slate-800/60 rounded p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Checkbox 
          id="agree" 
          label={
            <span className="text-xs text-slate-400 font-medium select-none cursor-pointer hover:text-slate-300 transition-colors">
              I acknowledge the compliance frameworks and am prepared to launch the verified exam environment.
            </span>
          }
          checked={agreed} 
          onChange={(e) => setAgreed(e.target.checked)} 
        />
        
        <Button 
          variant="primary" 
          disabled={!agreed} 
          onClick={handleStartExam} 
          className="w-full sm:w-auto px-6 py-2 text-xs font-semibold tracking-wide text-white bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 rounded border border-blue-500/20 shadow-sm transition-all"
        >
          Launch Portal Session
        </Button>
      </div>

    </PageContainer>
  );
};