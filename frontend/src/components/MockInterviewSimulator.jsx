import React, { useState } from 'react';
import * as Icons from './Icons';

const mockEvaluationReport = {
  score: 8,
  strengths: [
    "Clearly articulated the core concepts of OOP (Encapsulation, Inheritance, Polymorphism, Abstraction).",
    "Gave concrete real-world project examples (e.g. creating distinct class frameworks for databases in SkillTrack).",
    "Demonstrated a strong technical grasp of Python's execution model and method resolution."
  ],
  improvements: [
    "Could provide more detail on encapsulation: explain private/protected attributes (__ double underscore prefix in Python) and getter/setter practices.",
    "Include reference to composition vs. inheritance, which is a highly valued system-design principle."
  ]
};

export default function MockInterviewSimulator({ applicationId, interviewType, questions = [], onBack }) {
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const currentQuestion = questions[qIndex] || "How do you handle technical debt?";

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      alert("Please type in an answer to evaluate.");
      return;
    }

    setIsEvaluating(true);
    setEvaluation(null);

    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluation(mockEvaluationReport);
      // Persist score in localStorage
      if (applicationId) {
        localStorage.setItem(`copilot_interview_score_${applicationId}_${interviewType}`, mockEvaluationReport.score);
      }
    }, 2000);
  };

  const handleNextQuestion = () => {
    setAnswer("");
    setEvaluation(null);
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      alert("Excellent job! You have completed all mock interview questions for this track.");
      onBack();
    }
  };

  return (
    <div className="glass-card rounded-2xl border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn">
      {/* Simulator Bar */}
      <div className="bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-200 dark:border-slate-900/80 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{interviewType} MOCK SIMULATOR</span>
        </div>
        <button 
          onClick={onBack}
          className="text-xs text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-slate-200 font-semibold flex items-center"
        >
          ← Terminate Session
        </button>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase">Question {qIndex + 1} of {questions.length}</span>
          <div className="w-32 bg-slate-100 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-200 dark:border-slate-850">
            <div 
              className="bg-indigo-650 dark:bg-primary-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-xl border border-slate-200 dark:border-slate-900">
          <p className="text-xs font-bold text-indigo-600 dark:text-primary-400 uppercase tracking-wider">INTERVIEWER QUESTION:</p>
          <p className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mt-1 leading-relaxed">
            "{currentQuestion}"
          </p>
        </div>

        {/* Response Area */}
        {!evaluation && !isEvaluating && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-500 mb-2">Type your response below:</label>
              <textarea
                rows="6"
                placeholder="Provide a comprehensive response. Draw on your personal project accomplishments or work experiences..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-655 focus:outline-none focus:border-indigo-500 dark:focus:border-primary-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-primary-500 leading-relaxed font-sans"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={handleSubmitAnswer}
                className="bg-indigo-650 hover:bg-indigo-755 dark:bg-primary-600 dark:hover:bg-primary-700 text-xs font-bold text-white px-5 py-2.5 rounded-lg border border-indigo-500 dark:border-primary-500 shadow-lg shadow-indigo-500/10 dark:shadow-primary-500/10 flex items-center space-x-1.5 transition-colors"
              >
                <span>Submit Answer for AI Evaluation</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Evaluating State */}
        {isEvaluating && (
          <div className="py-10 flex flex-col items-center justify-center text-center">
            <div className="flex space-x-1 mb-4">
              <div className="w-3 h-3 bg-indigo-600 dark:bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-indigo-600 dark:bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-3 h-3 bg-indigo-600 dark:bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
            <h3 className="font-heading font-semibold text-sm text-slate-700 dark:text-slate-300">Analyzing answer response patterns...</h3>
            <p className="text-xs text-slate-500 mt-1">Gemini AI is parsing vocabulary, semantic matches, and structure coherence.</p>
          </div>
        )}

        {/* Evaluation feedback report */}
        {evaluation && (
          <div className="space-y-6 bg-slate-50 dark:bg-slate-900/20 p-6 rounded-xl border border-slate-200 dark:border-slate-900 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-900 gap-4">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-500/20">
                  <Icons.Award className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-heading font-bold text-base text-slate-800 dark:text-slate-200">AI Evaluation Feedback</h4>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">Keyword accuracy matching algorithms</p>
                </div>
              </div>
              <div className="flex items-baseline space-x-1 bg-white dark:bg-slate-950 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-850">
                <span className="text-[10px] text-slate-500 font-bold">SCORE:</span>
                <span className="text-lg font-heading font-extrabold text-emerald-600 dark:text-emerald-400">{evaluation.score}</span>
                <span className="text-[10px] text-slate-500 font-bold">/10</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3 flex items-center">
                  <Icons.CheckCircle className="w-4 h-4 mr-1.5 text-emerald-600 dark:text-emerald-400" /> Strengths
                </h5>
                <ul className="space-y-2">
                  {evaluation.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-emerald-50 dark:bg-emerald-500/5 p-3 rounded-lg border border-emerald-100 dark:border-emerald-500/10">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3 flex items-center">
                  <Icons.AlertCircle className="w-4 h-4 mr-1.5 text-amber-600 dark:text-amber-400" /> Recommendations
                </h5>
                <ul className="space-y-2">
                  {evaluation.improvements.map((s, i) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-amber-50 dark:bg-amber-500/5 p-3 rounded-lg border border-amber-100 dark:border-amber-500/10">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-900">
              <button 
                onClick={handleNextQuestion}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 dark:border-slate-800 dark:text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors"
              >
                {qIndex < questions.length - 1 ? "Proceed to Next Question" : "Complete Interview Track"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
