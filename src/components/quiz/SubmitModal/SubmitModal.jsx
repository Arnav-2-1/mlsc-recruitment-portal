import React from 'react';
import { useExam } from '../../../context/ExamContext';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export const SubmitModal = ({ isOpen, onClose }) => {
  const { questions, responses, completeExam } = useExam();
  
  if (!isOpen) return null;

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(responses).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none animate-fadeIn">
      <Card className="max-w-md w-full border-slate-800 bg-slate-950 p-6 shadow-2xl">
        {/* Header Icon & Title */}
        <div className="flex items-center gap-3 text-blue-400 mb-5">
          <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <HelpCircle className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 tracking-wide">Submit Examination</h3>
            <p className="text-xs text-slate-400">Please review your submission summary below.</p>
          </div>
        </div>
        
        {/* Live Summary Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Answered</p>
              <p className="text-sm font-bold text-slate-200 font-mono">{answeredCount} / {totalQuestions}</p>
            </div>
          </div>
          
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center gap-2.5">
            <AlertCircle className={`w-4 h-4 flex-shrink-0 ${unansweredCount > 0 ? 'text-amber-400' : 'text-slate-500'}`} />
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Unanswered</p>
              <p className={`text-sm font-bold font-mono ${unansweredCount > 0 ? 'text-amber-400' : 'text-slate-400'}`}>{unansweredCount}</p>
            </div>
          </div>
        </div>

        {/* Warning Policy Context */}
        <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/40 border border-slate-900 p-3 rounded-lg mb-6">
          ⚠️ <span className="text-slate-300 font-medium">Important Note:</span> Once submitted, you will not be able to re-enter this assessment or modify your answers. Your progress will be saved instantly.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1 py-2.5 text-xs">
            Cancel & Review
          </Button>
          <Button variant="success" onClick={completeExam} className="flex-1 py-2.5 text-xs font-bold shadow-lg shadow-emerald-900/20">
            Confirm Submission
          </Button>
        </div>
      </Card>
    </div>
  );
};