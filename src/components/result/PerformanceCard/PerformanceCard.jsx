import React from 'react';
import { Card } from '../../common/Card';
export const PerformanceCard = ({ stats }) => {
  return (
    <Card className="border-slate-800 bg-slate-900/40 p-5 space-y-2 text-sm">
      <div>Correct Answers: <span className="text-emerald-400 font-bold font-mono">{stats.correct}</span></div>
      <div>Incorrect Answers: <span className="text-rose-400 font-bold font-mono">{stats.wrong}</span></div>
      <div>Skipped Questions: <span className="text-slate-400 font-bold font-mono">{stats.unanswered}</span></div>
      <div>Time Taken: <span className="text-blue-400 font-bold font-mono">{stats.timeTaken}</span></div>
    </Card>
  );
};