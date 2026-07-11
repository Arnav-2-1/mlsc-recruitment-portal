import React from 'react';
import { useExam } from '../../../context/ExamContext';
import { Card } from '../../common/Card';

export const StatsCard = () => {
  const { questions, responses } = useExam();
  const answered = Object.keys(responses).length;
  return (
    <Card className="p-4 border-[#E5E7EB] bg-white">
      <div className="text-center font-semibold text-[#6B7280]">
        <span className="text-2xl font-black text-[#111827] font-mono">{answered}</span> / {questions.length} Answered
      </div>
    </Card>
  );
};