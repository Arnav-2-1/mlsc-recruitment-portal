import React from 'react';
import { useExam } from '../../../context/ExamContext';
import { Card } from '../../common/Card';

export const QuestionPalette = () => {
  const { questions, currentQuestionIndex, setCurrentQuestionIndex, responses, reviewStatus } = useExam();
  const getStatusClass = (idx, qId) => {
    if (idx === currentQuestionIndex) return 'bg-blue-600 border-blue-400 text-white font-bold ring-2 ring-blue-500/40';
    if (reviewStatus[qId]) return 'bg-amber-600 border-amber-500 text-white';
    if (responses[qId] !== undefined) return 'bg-blue-900/80 border-blue-700 text-blue-200';
    return 'bg-slate-800/80 border-slate-700 text-slate-400';
  };
  return (
    <Card className="p-4 border-slate-800 bg-slate-900/60">
      <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Question Palette</h4>
      <div className="grid grid-cols-5 gap-2 max-h-[195px] overflow-y-auto">
        {questions.map((q, idx) => (
          <button key={q.id} onClick={() => setCurrentQuestionIndex(idx)} className={`h-9 w-full rounded-md border text-xs flex items-center justify-center font-mono focus:outline-none ${getStatusClass(idx, q.id)}`}>
            {idx + 1}
          </button>
        ))}
      </div>
    </Card>
  );
};