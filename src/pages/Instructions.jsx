import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../context/ExamContext';
import { PageContainer } from '../components/layout/PageContainer';
import { Checkbox } from '../components/common/Checkbox';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ShieldAlert, Award, UserCheck } from 'lucide-react';
import mlsaLogo from '../assets/mlsa-logo.png'; // Path to your logo asset

export const Instructions = () => {
  // ✨ Added "questions" extraction from useExam context to dynamically get total length
  const { candidate, setExamStarted, questions } = useExam();
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
    
    // ✨ Invokes your Fisher-Yates array randomizer layer seamlessly right before navigating
    setExamStarted(); 
    
    navigate('/quiz');
  };

  return (
    <PageContainer className="max-w-5xl py-12 px-6 antialiased text-[#111827]">
      
      {/* BRANDING & HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-[#E5E7EB] pb-8 mb-10">
        <div className="flex items-center gap-4">
          <img 
            src={mlsaLogo} 
            alt="Microsoft Learn Student Ambassador Logo" 
            className="w-16 h-auto object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-[#111827] tracking-tight">Microsoft Learn Student Ambassadors</h1>
            <p className="text-xs text-[#6B7280] mt-0.5">Official Examination Environment</p>
          </div>
        </div>
        
        <div className="flex gap-4 font-mono text-[11px] text-[#6B7280] bg-white px-3 py-2 rounded-xl border border-[#E5E7EB] shadow-sm">
          {/* ✨ Dynamic question array length tracking output replaces hardcoded 20 values */}
          <div>QUESTIONS: <span className="text-[#0067B8] font-bold">{questions?.length || 15}</span></div>
          <div className="w-px bg-slate-200" />
          <div>DURATION: <span className="text-[#0067B8] font-bold">30 MINS</span></div>
        </div>
      </div>

      {/* TWO COLUMN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        {/* LEFT COMPARTMENT: INSTRUCTIONS LIST */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Security Parameters */}
          <Card className="border-red-100 bg-red-50/20 p-6 sm:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="p-2.5 bg-red-100 rounded-xl">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">Security & Proctoring Policy</h2>
            </div>
            <div className="h-px bg-red-200/60 w-full mb-5" />
            <ul className="space-y-4 text-sm sm:text-base text-[#4B5563] leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1 font-bold">✕</span>
                <span>This examination enforces mandatory <span className="text-red-700 font-semibold">Fullscreen Mode</span>. Attempting to minimize or exit will trigger immediate technical violation warnings.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1 font-bold">✕</span>
                <span>System state operations (tab switches, screen blurs, or secondary window context selection) are actively monitored.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1 font-bold">✕</span>
                <span>Reaching <span className="text-red-600 font-bold underline">3 system warnings</span> terminates your test context and submits your current script automatically.</span>
              </li>
            </ul>
          </Card>

          {/* Section 2: Evaluation Parameters */}
          <Card className="border-emerald-100 bg-emerald-50/15 p-6 sm:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 text-emerald-600 mb-4">
              <div className="p-2.5 bg-emerald-100 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">Scoring Matrix</h2>
            </div>
            <div className="h-px bg-emerald-200/60 w-full mb-5" />
            <ul className="space-y-4 text-sm sm:text-base text-[#4B5563] leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1 font-bold">✓</span>
                <span>Every correctly validated question submission awards <span className="text-emerald-700 font-bold">+4.00 marks</span>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1 font-bold">✓</span>
                <span>There is <span className="text-emerald-700 font-semibold">no negative marking penalty</span> calculated for incorrect answers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1 font-bold">✓</span>
                <span>Unanswered questions skip processing calculations neutrally (<span className="text-slate-500">0.00 marks</span>).</span>
              </li>
            </ul>
          </Card>

        </div>

        {/* RIGHT COMPARTMENT: USER IDENTITY CARD */}
        <div className="flex flex-col gap-6">
          <Card className="border-[#0067B8]/10 bg-gradient-to-b from-white to-blue-50/30 p-6 rounded-2xl shadow-md h-fit space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 bg-blue-50 text-[#0067B8] rounded-xl">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-[#111827] tracking-tight">Candidate Identity</h2>
                <p className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wider">Verification Approved</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Candidate Name</label>
                <p className="text-base font-bold text-[#111827] mt-0.5">{candidate.fullName}</p>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Enrollment / Identifier</label>
                <p className="text-base font-bold text-[#0067B8] font-mono mt-0.5 tracking-tight">{candidate.enrollmentNumber}</p>
              </div>

              {candidate.college && (
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">College / Institution</label>
                  <p className="text-xs font-semibold text-[#4B5563] mt-0.5 leading-relaxed">{candidate.college}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

      </div>

      {/* FOOTER ACCEPTANCE BAR */}
      <Card className="border-[#0067B8]/20 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <Checkbox 
          id="agree" 
          label={
            <span className="text-xs sm:text-sm text-[#4B5563] font-semibold select-none cursor-pointer hover:text-[#111827] transition-colors leading-relaxed">
              I acknowledge the compliance frameworks and am prepared to launch the verified exam environment.
            </span>
          }
          checked={agreed} 
          onChange={(e) => setAgreed(e.target.checked)} 
          className="flex-1"
        />
        
        <Button 
          variant="primary" 
          disabled={!agreed} 
          onClick={handleStartExam} 
          className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold tracking-wide text-white bg-[#0067B8] hover:bg-[#005A9E] rounded-xl border border-blue-500/10 shadow-lg shadow-blue-900/10 transition-all shrink-0 animate-pulse-subtle"
        >
          Launch Portal Session
        </Button>
      </Card>

    </PageContainer>
  );
};