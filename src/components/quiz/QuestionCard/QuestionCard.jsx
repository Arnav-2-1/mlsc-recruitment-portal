import React from 'react';
import { useExam } from '../../../context/ExamContext';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';

export const QuestionCard = () => {
  const { questions, currentQuestionIndex, responses, setResponses } = useExam();
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  return (
    <Card className="border-slate-800 bg-slate-900/40 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Question {currentQuestionIndex + 1} of {questions.length}</span>
          <Badge variant="info">{currentQuestion.section}</Badge>
        </div>
        
        <p className="text-base font-semibold text-slate-200 leading-relaxed mb-6 select-none">{currentQuestion.text}</p>
        
        {/* ✨ NEW FEATURE: CONDITIONAL IMAGE COMPONENT */}
        {currentQuestion.imageUrl && (
          <div className="w-full bg-slate-950/50 border border-slate-800/60 rounded-xl p-4 mb-6 flex justify-center items-center overflow-hidden">
            <img 
              src={currentQuestion.imageUrl} 
              alt="Question illustration reference" 
              /* Anti-Cheat: Stops users from dragging or right-clicking the diagram */
              className="max-h-[240px] w-auto object-contain rounded-lg shadow-md select-none pointer-events-none"
              loading="lazy"
            />
          </div>
        )}

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = responses[currentQuestion.id] === idx;
            const letter = String.fromCharCode(65 + idx);
            return (
              <div key={idx} onClick={() => setResponses(prev => ({ ...prev, [currentQuestion.id]: idx }))} className={`group flex items-center gap-4 p-3.5 rounded-lg border text-sm font-medium cursor-pointer transition-all duration-150 select-none ${isSelected ? 'bg-blue-600/10 border-blue-500 text-slate-100' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>{letter}</div>
                <span className="flex-1">{option}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};;