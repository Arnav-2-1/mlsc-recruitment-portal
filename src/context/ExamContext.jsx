import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockQuestions } from '../utils/questions';

const ExamContext = createContext(null);

export const ExamProvider = ({ children }) => {
  const [candidate, setCandidate] = useState(() => {
    const saved = localStorage.getItem('mlsc_candidate');
    return saved ? JSON.parse(saved) : null;
  });
  const [examStarted, setExamStarted] = useState(() => localStorage.getItem('mlsc_exam_started') === 'true');
  const [examCompleted, setExamCompleted] = useState(() => localStorage.getItem('mlsc_exam_completed') === 'true');
  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem('mlsc_responses');
    return saved ? JSON.parse(saved) : {};
  });
  const [reviewStatus, setReviewStatus] = useState(() => {
    const saved = localStorage.getItem('mlsc_review');
    return saved ? JSON.parse(saved) : {};
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('mlsc_time_left');
    return saved ? parseInt(saved, 10) : 30 * 60;
  });
  const [securityWarnings, setSecurityWarnings] = useState(() => {
    const saved = localStorage.getItem('mlsc_warnings');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [securityViolationType, setSecurityViolationType] = useState('');

  useEffect(() => {
    if (candidate) localStorage.setItem('mlsc_candidate', JSON.stringify(candidate));
    else localStorage.removeItem('mlsc_candidate');
  }, [candidate]);

  useEffect(() => { localStorage.setItem('mlsc_exam_started', examStarted); }, [examStarted]);
  useEffect(() => { localStorage.setItem('mlsc_exam_completed', examCompleted); }, [examCompleted]);
  useEffect(() => { localStorage.setItem('mlsc_responses', JSON.stringify(responses)); }, [responses]);
  useEffect(() => { localStorage.setItem('mlsc_review', JSON.stringify(reviewStatus)); }, [reviewStatus]);
  useEffect(() => { localStorage.setItem('mlsc_time_left', timeLeft); }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem('mlsc_warnings', securityWarnings);
    if (securityWarnings >= 3 && examStarted && !examCompleted) {
      completeExam();
    }
  }, [securityWarnings, examStarted, examCompleted]);

  useEffect(() => {
    let timer;
    if (examStarted && !examCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            completeExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examCompleted, timeLeft]);

  const triggerWarning = (type) => {
    if (!examStarted || examCompleted) return;
    setSecurityViolationType(type);
    setSecurityWarnings((prev) => prev + 1);
    setShowSecurityModal(true);
  };

  const completeExam = () => {
    setExamCompleted(true);
    localStorage.setItem('mlsc_exam_completed', 'true');
  };

  const resetExamData = () => {
    localStorage.clear();
    setCandidate(null);
    setExamStarted(false);
    setExamCompleted(false);
    setResponses({});
    setReviewStatus({});
    setCurrentQuestionIndex(0);
    setTimeLeft(30 * 60);
    setSecurityWarnings(0);
    setShowSecurityModal(false);
  };

  return (
    <ExamContext.Provider value={{
      candidate, setCandidate, examStarted, setExamStarted, examCompleted, setExamCompleted,
      responses, setResponses, reviewStatus, setReviewStatus, currentQuestionIndex, setCurrentQuestionIndex,
      timeLeft, setTimeLeft, securityWarnings, triggerWarning, showSecurityModal, setShowSecurityModal,
      securityViolationType, completeExam, resetExamData, questions: mockQuestions
    }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => useContext(ExamContext);