import React, { useState } from 'react';
import { useExam } from '../../../context/ExamContext';
import { Button } from '../../common/Button';
import { ArrowLeft, ArrowRight, Bookmark, XCircle, CheckCircle } from 'lucide-react';
import { SubmitModal } from '../SubmitModal'; // Import our brand new component

export const NavigationBar = () => {
  const { questions, currentQuestionIndex, setCurrentQuestionIndex, responses, setResponses, reviewStatus, setReviewStatus } = useExam();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full bg-slate-900/80 border-t border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
        <Button variant="secondary" onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(p => p - 1)} disabled={currentQuestionIndex === 0} className="disabled:opacity-40">
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>
        <Button variant="secondary" onClick={() => currentQuestionIndex < questions.length - 1 && setCurrentQuestionIndex(p => p + 1)} disabled={currentQuestionIndex === questions.length - 1} className="disabled:opacity-40">
          Next <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Button variant="secondary" onClick={() => setResponses(p => { const u = { ...p }; delete u[currentQuestion.id]; return u; })} className="text-slate-400">
          <XCircle className="w-4 h-4" /> Clear
        </Button>
        <Button variant="secondary" onClick={() => setReviewStatus(p => ({ ...p, [currentQuestion.id]: !p[currentQuestion.id] }))} className={reviewStatus[currentQuestion?.id] ? '!bg-amber-600/20 !border-amber-500 !text-amber-400' : ''}>
          <Bookmark className="w-4 h-4" /> Review
        </Button>
        
        {/* Triggers custom modal state instead of native prompt */}
        <Button variant="success" onClick={() => setShowSubmitModal(true)} className="ml-2">
          <CheckCircle className="w-4 h-4" /> Submit
        </Button>
      </div>

      {/* Render custom modal context layout portal seamlessly */}
      <SubmitModal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)} />
    </div>
  );
};