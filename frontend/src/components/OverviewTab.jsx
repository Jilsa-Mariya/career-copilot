import React, { useState } from 'react';
import * as Icons from './Icons';

export default function OverviewTab({ application, onUpdateStatus, getStatusStyle }) {
  const [status, setStatus] = useState(application.status);
  const [showSavedMsg, setShowSavedMsg] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  
  const handleSave = () => {
    onUpdateStatus(application.id, status);
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 3000);
  };

  const toggleChecked = (index) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getCircularProgressColor = (score) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 70) return "text-amber-600 dark:text-amber-400";
    return "text-indigo-600 dark:text-primary-400";
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-800 dark:text-white">Application Analysis Overview</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Detailed analysis matching your credentials against job description keywords.</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match score gauge */}
        <div className="glass-card rounded-2xl p-6 border-slate-200/60 dark:border-slate-800 flex items-center justify-between col-span-1">
          <div className="space-y-1">
            <p className="text-xs text-slate-450 dark:text-slate-400 font-semibold uppercase tracking-wider">ATS Score Match</p>
            <p className="text-3xl font-heading font-extrabold text-slate-800 dark:text-white mt-1">{application.match_score}%</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-450 mt-1 font-medium">
              {application.match_score >= 80 ? "Excellent ATS match" : application.match_score >= 65 ? "Solid Match (Refine Resume)" : "Action Required"}
            </p>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="32" stroke="currentColor" className="text-slate-100 dark:text-slate-800/40" strokeWidth="6" fill="transparent" />
              <circle 
                cx="40" cy="40" r="32" 
                stroke={application.match_score >= 80 ? "#10b981" : application.match_score >= 70 ? "#f59e0b" : "#6366f1"} 
                strokeWidth="6" 
                fill="transparent"
                strokeDasharray={201}
                strokeDashoffset={201 - (201 * application.match_score) / 100}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className={`absolute font-heading font-bold text-sm ${getCircularProgressColor(application.match_score)}`}>
              {application.match_score}%
            </span>
          </div>
        </div>

        {/* Status manager */}
        <div className="glass-card rounded-2xl p-6 border-slate-200/60 dark:border-slate-800 col-span-1 lg:col-span-2 flex flex-col justify-between">
          <div>
            <p className="text-xs text-slate-450 dark:text-slate-400 font-semibold uppercase tracking-wider mb-2">Pipeline Status</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:focus:border-primary-500 flex-grow cursor-pointer"
              >
                {["Saved", "Applied", "Assessment", "Interviewing", "Offered", "Rejected"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button 
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-xs text-white font-bold px-4 py-2.5 rounded-lg border border-indigo-500 dark:border-primary-500 shadow-lg shadow-indigo-500/10 dark:shadow-primary-500/10 transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
          <div className="mt-2 h-4">
            {showSavedMsg && (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
                ✓ Status updated to '{status}' successfully!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Strengths & Missing skills tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 border-slate-200/60 dark:border-slate-800">
          <h3 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center">
            <Icons.CheckCircle className="w-5 h-5 text-emerald-650 dark:text-emerald-400 mr-2" />
            <span>Verified Strengths ({application.strengths.length})</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {application.strengths.map(skill => (
              <span key={skill} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-450 border border-emerald-200 dark:border-emerald-500/10 flex items-center">
                <Icons.Check className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-450" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border-slate-200/60 dark:border-slate-800">
          <h3 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center">
            <Icons.AlertCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 mr-2" />
            <span>Missing Skills ({application.missing_skills.length})</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {application.missing_skills.map(skill => (
              <span key={skill} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-500/5 text-rose-700 dark:text-rose-450 border border-rose-205 dark:border-rose-500/10 flex items-center">
                ✕ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Improvements Checklist */}
      <div className="glass-card rounded-2xl p-6 border-slate-200/60 dark:border-slate-800">
        <h3 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center">
          <Icons.Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400 mr-2" />
          <span>Recommended Resume Improvements</span>
        </h3>
        
        <div className="space-y-3">
          {application.resume_improvements.map((improvement, index) => (
            <div 
              key={index} 
              onClick={() => toggleChecked(index)}
              className={`flex items-start p-4 rounded-xl border transition-colors cursor-pointer ${
                checkedItems[index]
                  ? "bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-250/30 dark:border-emerald-900/30"
                  : "bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/60 border-slate-200/80 dark:border-slate-900"
              }`}
            >
              <div className={`mt-0.5 mr-3 flex items-center justify-center w-5 h-5 rounded-md border transition-all ${
                checkedItems[index]
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-transparent"
              }`}>
                <Icons.Check className="w-3.5 h-3.5" />
              </div>
              <p className={`text-sm leading-relaxed font-medium transition-all ${
                checkedItems[index]
                  ? "line-through text-slate-400 dark:text-slate-500"
                  : "text-slate-700 dark:text-slate-300"
              }`}>
                {improvement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
