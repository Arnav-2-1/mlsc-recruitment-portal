import React from 'react';
import { useExam } from '../../../context/ExamContext';
import { Card } from '../../common/Card';
import { motion } from 'framer-motion';

export const QuestionPalette = () => {
  const { questions, currentQuestionIndex, setCurrentQuestionIndex, responses, reviewStatus } = useExam();
  
  const getStatusClass = (idx, qId) => {
    if (idx === currentQuestionIndex) return 'bg-[#0067B8] border-[#0067B8] text-white font-bold ring-4 ring-[#0067B8]/20';
    if (reviewStatus[qId]) return 'bg-[#F59E0B] border-[#F59E0B] text-white font-semibold';
    if (responses[qId] !== undefined) return 'bg-[#10B981] border-[#10B981] text-white font-semibold';
    return 'bg-white border-[#E5E7EB] text-[#4B5563] hover:border-slate-300';
  };

  return (
    <Card className="p-4 border-[#E5E7EB] bg-white flex-1 overflow-hidden flex flex-col">
      <h4 className="text-xs font-bold text-[#6B7280] tracking-wider uppercase mb-3 select-none">Question Palette</h4>
      <div className="grid grid-cols-5 gap-2 overflow-y-auto flex-1 pr-1">
        {questions.map((q, idx) => (
          <motion.button 
            key={q.id} 
            onClick={() => setCurrentQuestionIndex(idx)} 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`h-9 w-full rounded-lg border text-xs flex items-center justify-center font-mono font-semibold focus:outline-none transition-all duration-150 ${getStatusClass(idx, q.id)}`}
          >
            {idx + 1}
          </motion.button>
        ))}
      </div>
    </Card>
  );
};