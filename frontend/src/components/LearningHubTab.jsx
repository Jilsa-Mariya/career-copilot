import React, { useState } from 'react';
import * as Icons from './Icons';

export default function LearningHubTab({ application }) {
  const roadmap = application.learning_path?.roadmap || [];

  // Local storage state for tracking topic completions and project completions
  const [completedItems, setCompletedItems] = useState(() => {
    const saved = localStorage.getItem(`copilot_learning_completed_${application.id}`);
    return saved ? JSON.parse(saved) : {};
  });

  const handleToggleItem = (key) => {
    const updated = { ...completedItems, [key]: !completedItems[key] };
    setCompletedItems(updated);
    localStorage.setItem(`copilot_learning_completed_${application.id}`, JSON.stringify(updated));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-800 dark:text-white">Missing Skills Learning Hub</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Personalized roadmaps, courses, and practice assignments designed to bridge your ATS skill gaps.</p>
      </div>

      {roadmap.length === 0 ? (
        <div className="glass-card rounded-2xl py-12 px-4 text-center border-slate-200 dark:border-slate-900 border-dashed border-2 flex flex-col items-center">
          <Icons.CheckCircle className="w-12 h-12 text-emerald-500 mb-3 animate-pulse" />
          <h3 className="font-heading font-semibold text-lg text-slate-800 dark:text-slate-200">No missing skills detected!</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            Congratulations, your profile perfectly aligns with all mandatory skills indexed in this job description.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roadmap.map((item, idx) => {
            // Calculate progress for this skill card
            const totalTopics = item.topics.length;
            const completedTopicsCount = item.topics.reduce((count, _, index) => {
              return count + (completedItems[`${item.skill}_topic_${index}`] ? 1 : 0);
            }, 0);
            const isProjectDone = completedItems[`${item.skill}_project`];
            
            // Calculate percentage (project counts as extra or we just calculate on topics)
            const percentage = totalTopics > 0 
              ? Math.round((completedTopicsCount / totalTopics) * 100) 
              : 0;

            return (
              <div key={idx} className="glass-card rounded-2xl border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden transition-all duration-300">
                {/* Skill header */}
                <div className="bg-slate-50 dark:bg-gradient-to-r dark:from-slate-950 dark:to-slate-900/60 p-5 border-b border-slate-200 dark:border-slate-900/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-indigo-650 dark:text-primary-400 font-bold uppercase tracking-wider">Skill Bridge Roadmap</span>
                    <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white mt-0.5">{item.skill}</h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                    percentage === 100 && isProjectDone
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                  }`}>
                    {percentage === 100 && isProjectDone ? "Mastered" : "Active"}
                  </span>
                </div>

                <div className="p-6 space-y-6 flex-grow flex flex-col">
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span>Course Progress</span>
                      <span>{completedTopicsCount}/{totalTopics} Topics ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-slate-850">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-violet-600 dark:from-primary-500 dark:to-indigo-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Topics Checklist */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                      <Icons.Checklist className="w-4 h-4 mr-1.5 text-indigo-600 dark:text-primary-400" />
                      Key Topics to Cover
                    </h4>
                    <div className="space-y-2 bg-slate-50/50 dark:bg-slate-900/20 p-4 rounded-xl border border-slate-200 dark:border-slate-900">
                      {item.topics.map((topic, index) => {
                        const topicKey = `${item.skill}_topic_${index}`;
                        const isChecked = !!completedItems[topicKey];

                        return (
                          <div 
                            key={index} 
                            onClick={() => handleToggleItem(topicKey)}
                            className="flex items-start text-xs text-slate-700 dark:text-slate-350 font-medium cursor-pointer group select-none"
                          >
                            <div className={`mt-0.5 mr-2.5 flex items-center justify-center w-4 h-4 rounded border transition-all ${
                              isChecked
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-transparent group-hover:border-slate-400"
                            }`}>
                              <Icons.Check className="w-3 h-3" />
                            </div>
                            <span className={`transition-all leading-normal ${isChecked ? "line-through text-slate-400 dark:text-slate-500" : ""}`}>
                              {topic}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Resources */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                      <Icons.BookOpen className="w-4 h-4 mr-1.5 text-indigo-650 dark:text-primary-400" />
                      Selected Learning Resources
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.resources.map((res, index) => (
                        <a 
                          key={index} 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); alert(`Simulation: Opening learning resource for ${res}`); }}
                          className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-850 text-xs text-slate-655 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-primary-350 font-medium transition-colors truncate"
                        >
                          <span className="mr-1 text-indigo-500 dark:text-primary-400">•</span>
                          <span className="truncate underline">{res}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Practice Project */}
                  <div 
                    onClick={() => handleToggleItem(`${item.skill}_project`)}
                    className={`mt-auto p-4 rounded-xl border transition-all cursor-pointer select-none ${
                      isProjectDone 
                        ? "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200/50 dark:border-emerald-500/10"
                        : "bg-indigo-50/50 dark:bg-primary-95/10 border-indigo-200/60 dark:border-primary-500/5 hover:border-indigo-300 dark:hover:border-primary-500/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center ${
                        isProjectDone ? "text-emerald-650 dark:text-emerald-400" : "text-indigo-655 dark:text-primary-400"
                      }`}>
                        <Icons.Sparkles className="w-4 h-4 mr-1.5" />
                        Practice Project Assignment
                      </h4>
                      <div className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[9px] font-bold ${
                        isProjectDone ? "bg-emerald-500/10 text-emerald-600" : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      }`}>
                        {isProjectDone ? "Completed" : "Mark Done"}
                      </div>
                    </div>
                    <p className={`text-xs leading-relaxed font-medium transition-all ${
                      isProjectDone ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-655 dark:text-slate-350"
                    }`}>
                      {item.project}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
