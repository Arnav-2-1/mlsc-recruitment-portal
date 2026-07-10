import React from 'react';
import { useExam } from '../../../context/ExamContext';
import { Card } from '../../common/Card';

export const StatsCard = () => {
  const { questions, responses } = useExam();
  const answered = Object.keys(responses).length;
  return (
    <Card className="p-4 border-slate-800 bg-slate-900/60">
      <div className="text-center font-semibold text-slate-300">
        <span className="text-2xl font-black text-slate-100 font-mono">{answered}</span> / {questions.length} Answered
      </div>
    </Card>
  );
};