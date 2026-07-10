import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../context/ExamContext';
import { PageContainer } from '../components/layout/PageContainer';
import { ScoreCircle } from '../components/result/ScoreCircle';
import { PerformanceCard } from '../components/result/PerformanceCard';
import { Button } from '../components/common/Button';

export const Result = () => {
  const { candidate, examCompleted, questions, responses, timeLeft, resetExamData } = useExam();
  const navigate = useNavigate();

  useEffect(() => {
    if (!candidate) navigate('/');
    else if (!examCompleted) navigate('/quiz');
  }, [candidate, examCompleted, navigate]);

  const metrics = useMemo(() => {
    if (!questions) return { correct: 0, wrong: 0, unanswered: 0, percentage: 0, timeTaken: '0s' };
    let correct = 0; let wrong = 0;
    questions.forEach(q => {
      const r = responses[q.id];
      if (r === undefined) return;
      if (r === q.correctAnswer) correct++; else wrong++;
    });
    const unanswered = questions.length - (correct + wrong);
    const percentage = Math.round((correct / questions.length) * 100);
    const used = (30 * 60) - timeLeft;
    return { correct, wrong, unanswered, percentage, timeTaken: `${Math.floor(used/60)}m ${used%60}s` };
  }, [questions, responses, timeLeft]);

  if (!candidate || !examCompleted) return null;

  return (
    <PageContainer className="max-w-2xl py-10 justify-center">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-100">Examination Completed</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-6 bg-slate-900/40 rounded-xl border border-slate-800 mb-6">
        <div className="flex justify-center"><ScoreCircle percentage={metrics.percentage} /></div>
        <div className="md:col-span-2"><PerformanceCard stats={metrics} /></div>
      </div>
      <Button variant="primary" onClick={() => { resetExamData(); navigate('/'); }} className="w-full">Return to Home</Button>
    </PageContainer>
  );
};