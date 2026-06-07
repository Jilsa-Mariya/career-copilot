import React, { useState } from 'react';
import * as Icons from './Icons';

export default function JobDescriptionTab({ application }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(application.jd_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-800 dark:text-white">Target Job Description</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Original job role overview and requirements used for profile mapping.</p>
        </div>
        <button 
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-850 dark:bg-slate-900/80 dark:hover:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all self-start sm:self-auto"
        >
          {copied ? (
            <>
              <Icons.Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-1.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-1.5 text-slate-500">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>Copy Text</span>
            </>
          )}
        </button>
      </div>

      <div className="glass-card rounded-2xl border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-950/40 p-4 border-b border-slate-200 dark:border-slate-900/60 flex items-center justify-between">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Document Viewer</span>
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500"></span>
        </div>
        <div className="p-6 text-sm leading-relaxed text-slate-655 dark:text-slate-300 max-h-[480px] overflow-y-auto whitespace-pre-line bg-slate-50/20 dark:bg-slate-900/20 font-sans">
          {application.jd_text}
        </div>
      </div>
    </div>
  );
}
