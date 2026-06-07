import React from 'react';
import * as Icons from './Icons';
import MockInterviewSimulator from './MockInterviewSimulator';

export default function InterviewPrepTab({ application, activeInterview, onStartInterview }) {
  const prep = application.interview_prep;

  // Read saved scores for each category from local storage
  const getSavedScore = (type) => {
    return localStorage.getItem(`copilot_interview_score_${application.id}_${type}`);
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "Hard": return "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-200 dark:border-rose-900/30";
      case "Medium": return "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-450 border border-amber-200 dark:border-amber-900/30";
      case "Easy": return "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 border border-emerald-200 dark:border-emerald-900/30";
      default: return "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800";
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-800 dark:text-white">Interview Preparation Kit</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Practice high-probability questions and start mock session simulations tailored to your experience gaps.</p>
      </div>

      {activeInterview ? (
        <MockInterviewSimulator 
          applicationId={application.id}
          interviewType={activeInterview} 
          questions={
            activeInterview === "Technical" 
              ? prep.technical_questions 
              : activeInterview === "HR" 
                ? prep.hr_questions 
                : prep.project_questions
          }
          onBack={() => onStartInterview(null)}
        />
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Technical Panel */}
            <div className="glass-card rounded-2xl p-6 border-slate-200/60 dark:border-slate-800 flex flex-col h-full hover:border-cyan-400/30 dark:hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-900/60 mb-5">
                <div>
                  <span className="text-[10px] text-cyan-650 dark:text-cyan-400 font-bold uppercase tracking-wider">Engineering Focus</span>
                  <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white mt-0.5 font-heading">Technical Prep</h3>
                </div>
                <span className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-650 dark:text-cyan-400 border border-cyan-500/20">
                  <Icons.FileText className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-5 flex-grow">
                {/* Stats row */}
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getDifficultyBadge("Hard")}`}>Difficulty: Hard</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-900 text-slate-655 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                    {prep.technical_questions.length} Questions
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-900 text-slate-655 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                    Est. 30m
                  </span>
                  {getSavedScore("Technical") && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border border-emerald-500/20">
                      Best: {getSavedScore("Technical")}/10
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">Focus Topics</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {prep.technical_topics.map(t => (
                      <span key={t} className="px-2 py-1 bg-slate-50 dark:bg-slate-900 rounded-md text-[10px] text-slate-600 dark:text-slate-400 font-semibold border border-slate-200 dark:border-slate-850">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">Example Questions</h4>
                  <ul className="space-y-2">
                    {prep.technical_questions.slice(0, 2).map((q, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/30 p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-900/80 line-clamp-2 italic">
                        "{q}"
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => onStartInterview("Technical")}
                className="mt-6 w-full py-2.5 bg-cyan-600 hover:bg-cyan-755 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-xs font-bold text-white rounded-lg flex items-center justify-center space-x-1.5 shadow-lg shadow-cyan-500/10 border border-cyan-500 transition-all"
              >
                <Icons.Play className="w-4 h-4 text-white" />
                <span>Start Technical Mock Session</span>
              </button>
            </div>

            {/* HR Panel */}
            <div className="glass-card rounded-2xl p-6 border-slate-200/60 dark:border-slate-800 flex flex-col h-full hover:border-amber-400/30 dark:hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-900/60 mb-5">
                <div>
                  <span className="text-[10px] text-amber-655 dark:text-amber-400 font-bold uppercase tracking-wider">Culture Fit</span>
                  <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white mt-0.5">HR Interview</h3>
                </div>
                <span className="p-2.5 bg-amber-500/10 rounded-xl text-amber-655 dark:text-amber-400 border border-amber-500/20">
                  <Icons.Users className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-5 flex-grow">
                {/* Stats row */}
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getDifficultyBadge("Easy")}`}>Difficulty: Easy</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-900 text-slate-655 dark:text-slate-400 border border-slate-200 dark:border-slate-880">
                    {prep.hr_questions.length} Questions
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-900 text-slate-655 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                    Est. 15m
                  </span>
                  {getSavedScore("HR") && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-455 border border-emerald-500/20">
                      Best: {getSavedScore("HR")}/10
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">Focus Topics</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {prep.hr_topics.map(t => (
                      <span key={t} className="px-2 py-1 bg-slate-50 dark:bg-slate-900 rounded-md text-[10px] text-slate-600 dark:text-slate-400 font-semibold border border-slate-200 dark:border-slate-850">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">Example Questions</h4>
                  <ul className="space-y-2">
                    {prep.hr_questions.slice(0, 2).map((q, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/30 p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-900/80 line-clamp-2 italic">
                        "{q}"
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => onStartInterview("HR")}
                className="mt-6 w-full py-2.5 bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-xs font-bold text-white rounded-lg flex items-center justify-center space-x-1.5 shadow-lg shadow-amber-500/10 border border-amber-500 transition-all"
              >
                <Icons.Play className="w-4 h-4 text-white" />
                <span>Start HR Mock Session</span>
              </button>
            </div>

            {/* Project Discussion Panel */}
            <div className="glass-card rounded-2xl p-6 border-slate-200/60 dark:border-slate-800 flex flex-col h-full hover:border-indigo-400/30 dark:hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-900/60 mb-5">
                <div>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">Experience Deep-dive</span>
                  <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white mt-0.5">Project Discussion</h3>
                </div>
                <span className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  <Icons.Briefcase className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-5 flex-grow">
                {/* Stats row */}
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getDifficultyBadge("Medium")}`}>Difficulty: Medium</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-900 text-slate-655 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                    {prep.project_questions.length} Questions
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-900 text-slate-655 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                    Est. 20m
                  </span>
                  {getSavedScore("Project") && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border border-emerald-500/20">
                      Best: {getSavedScore("Project")}/10
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">Experience focus</h4>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-semibold bg-slate-50 dark:bg-slate-900/25 p-3 rounded-lg border border-slate-200/60 dark:border-slate-900">
                    Focus will be centered on your personal projects mentioned in the parsed resume (e.g. ThermaSense, SkillTrack, Moodmentor).
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">Example Questions</h4>
                  <ul className="space-y-2">
                    {prep.project_questions.slice(0, 2).map((q, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-355 leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/30 p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-900/80 line-clamp-2 italic">
                        "{q}"
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => onStartInterview("Project")}
                className="mt-6 w-full py-2.5 bg-indigo-650 hover:bg-indigo-755 dark:bg-indigo-600 dark:hover:bg-indigo-750 text-xs font-bold text-white rounded-lg flex items-center justify-center space-x-1.5 shadow-lg shadow-indigo-500/10 border border-indigo-500 transition-all"
              >
                <Icons.Play className="w-4 h-4 text-white" />
                <span>Start Project Mock Session</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
