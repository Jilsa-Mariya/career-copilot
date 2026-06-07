import React, { useState } from 'react';
import * as Icons from './Icons';

export default function ResumeTab({ application }) {
  const [isParsing, setIsParsing] = useState(false);
  const [parsingFinished, setParsingFinished] = useState(true);

  const triggerReparse = () => {
    setIsParsing(true);
    setParsingFinished(false);
    setTimeout(() => {
      setIsParsing(false);
      setParsingFinished(true);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-800 dark:text-white">Parsed Resume Profile</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Uploaded resume file information and ATS indexing meta logs.</p>
      </div>

      <div className="glass-card rounded-2xl p-8 border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-4">
          <Icons.FileText className="w-8 h-8" />
        </div>
        
        <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-slate-200">
          {application.resume_filename}
        </h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">
          PDF Document • 2.4 MB • Indexed on May 26, 2026
        </p>

        {/* Checklists for Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-lg text-left">
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-900/60">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ATS Extraction Status</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">SUCCESS</span>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-900/60">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Indexed Workplaces</p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-2">3 Positions (2023 - 2027)</p>
          </div>
        </div>

        {/* Quick warning */}
        <div className="mt-8 bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/10 rounded-xl p-4 max-w-lg text-left flex items-start">
          <Icons.AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong className="text-slate-800 dark:text-slate-350 font-semibold">Security Note:</strong> Raw extracted resume text is hidden in compliance with corporate candidate privacy filters. Only parser analysis outputs (skills & strengths) are exposed in the workspace views.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full sm:w-auto">
          <button 
            onClick={triggerReparse}
            disabled={isParsing}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 text-xs font-bold text-slate-600 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-850 transition-all disabled:opacity-50"
          >
            {isParsing ? "Re-parsing Document..." : "Trigger Re-parse"}
          </button>
          <button 
            onClick={() => alert("Simulation: Downloading resume " + application.resume_filename)}
            className="w-full sm:w-auto bg-indigo-650 hover:bg-indigo-755 dark:bg-primary-600 dark:hover:bg-primary-700 border border-indigo-500 dark:border-primary-500 text-xs font-bold text-white px-5 py-2.5 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/10 dark:shadow-primary-500/10 transition-all"
          >
            <Icons.Download className="w-4 h-4 mr-1.5" />
            Download Original File
          </button>
        </div>
      </div>
    </div>
  );
}
