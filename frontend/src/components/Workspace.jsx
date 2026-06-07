import React from 'react';
import * as Icons from './Icons';
import OverviewTab from './OverviewTab';
import ResumeTab from './ResumeTab';
import JobDescriptionTab from './JobDescriptionTab';
import LearningHubTab from './LearningHubTab';
import InterviewPrepTab from './InterviewPrepTab';
import AICoachTab from './AICoachTab';
import NotesTab from './NotesTab';

export default function Workspace({ 
  application, 
  currentTab, 
  onChangeTab, 
  onUpdateStatus, 
  onSaveNotes, 
  activeInterview, 
  onStartInterview 
}) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Saved": return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
      case "Applied": return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
      case "Assessment": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "Interview": case "Interviewing": return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
      case "Selected": case "Offered": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Rejected": return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      default: return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row h-full">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
        <div className="p-6 border-b border-slate-200 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/10">
          <h2 className="font-heading font-extrabold text-lg text-slate-800 dark:text-white truncate">{application.company}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">{application.role}</p>
          <div className="mt-3 flex items-center space-x-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(application.status)}`}>
              {application.status}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{application.match_score}% Match</span>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {[
            { id: "overview", label: "Overview", icon: Icons.Award },
            { id: "resume", label: "Resume", icon: Icons.FileText },
            { id: "jd", label: "Job Description", icon: Icons.Briefcase },
            { id: "learning", label: "Learning Hub", icon: Icons.BookOpen },
            { id: "interview", label: "Interview Prep", icon: Icons.Users },
            { id: "coach", label: "AI Coach", icon: Icons.Sparkles },
            { id: "notes", label: "Notes", icon: Icons.Edit3 }
          ].map(tab => {
            const TabIcon = tab.icon;
            const isSelected = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isSelected 
                    ? "bg-indigo-50 dark:bg-primary-600/15 text-indigo-600 dark:text-primary-400 border border-indigo-100 dark:border-primary-500/10 shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/50 border border-transparent"
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isSelected ? "text-indigo-600 dark:text-primary-400" : "text-slate-400 dark:text-slate-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Tab Content */}
      <section className="flex-grow bg-slate-100/10 dark:bg-dark-950/40 p-6 sm:p-8 overflow-y-auto max-w-7xl">
        {currentTab === "overview" && (
          <OverviewTab 
            application={application} 
            onUpdateStatus={onUpdateStatus}
            getStatusStyle={getStatusStyle}
          />
        )}
        
        {currentTab === "resume" && (
          <ResumeTab application={application} />
        )}

        {currentTab === "jd" && (
          <JobDescriptionTab application={application} />
        )}

        {currentTab === "learning" && (
          <LearningHubTab application={application} />
        )}

        {currentTab === "interview" && (
          <InterviewPrepTab 
            application={application} 
            activeInterview={activeInterview}
            onStartInterview={onStartInterview}
          />
        )}

        {currentTab === "coach" && (
          <AICoachTab application={application} />
        )}

        {currentTab === "notes" && (
          <NotesTab 
            application={application} 
            onSaveNotes={onSaveNotes}
          />
        )}
      </section>
    </div>
  );
}
