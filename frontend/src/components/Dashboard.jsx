import React, { useState } from 'react';
import * as Icons from './Icons';

export default function Dashboard({ apps, onSelectApp, onOpenNewAppModal, onDeleteApp }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Saved": return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
      case "Applied": return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
      case "Assessment": return "bg-amber-500/10 text-amber-605 dark:text-amber-400 border-amber-500/20";
      case "Interview": case "Interviewing": return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
      case "Selected": case "Offered": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Rejected": return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      default: return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
    }
  };

  const totalCount = apps.length;
  const averageMatch = totalCount > 0 
    ? Math.round(apps.reduce((sum, current) => sum + current.match_score, 0) / totalCount)
    : 0;
  const activeInterviews = apps.filter(a => a.status === "Interview" || a.status === "Interviewing").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full animate-fadeIn">
      {/* Hero Section */}
      <div className="mb-10 text-center md:text-left md:flex md:items-center md:justify-between border-b border-slate-200 dark:border-slate-900 pb-8">
        <div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Welcome to your <span className="gradient-text font-extrabold">Career Workspace</span>
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Track job applications, review AI match scores, practice hyper-personalized mock interviews, and master missing skills in one premium hub.
          </p>
        </div>
        <div className="mt-5 md:mt-0">
          <button 
            onClick={onOpenNewAppModal}
            className="gradient-border-btn px-5 py-3 text-sm font-semibold text-white flex items-center justify-center space-x-2 w-full md:w-auto shadow-lg shadow-indigo-500/10"
          >
            <Icons.Plus className="w-5 h-5 text-white" />
            <span>New Application Workspace</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6 flex items-center space-x-4 border-slate-200/60 dark:border-slate-800">
          <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <Icons.Briefcase className="w-6 h-6 text-indigo-600 dark:text-primary-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Job Workspaces</p>
            <p className="text-2xl font-heading font-bold text-slate-900 dark:text-white mt-1">{totalCount}</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 flex items-center space-x-4 border-slate-200/60 dark:border-slate-800">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <Icons.Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Average ATS Match</p>
            <div className="flex items-baseline space-x-1 mt-1">
              <p className="text-2xl font-heading font-bold text-slate-900 dark:text-white">{averageMatch}%</p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center font-medium">
                <Icons.TrendingUp className="w-3.5 h-3.5 mr-0.5" /> Optimal
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 flex items-center space-x-4 border-slate-200/60 dark:border-slate-800">
          <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
            <Icons.Users className="w-6 h-6 text-violet-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Active Interview Prep</p>
            <p className="text-2xl font-heading font-bold text-slate-900 dark:text-white mt-1">{activeInterviews} Roles</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="glass-card rounded-xl p-4 border-slate-200/60 dark:border-slate-900 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Icons.Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search by company or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 dark:focus:border-primary-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-primary-500 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto overflow-x-auto pb-1 md:pb-0 max-w-full">
          <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium">Filter Status:</span>
          {["All", "Saved", "Applied", "Assessment", "Interview", "Selected", "Rejected"].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                statusFilter === status 
                  ? "bg-indigo-600 dark:bg-primary-600 border-indigo-500 dark:border-primary-500 text-white shadow-md shadow-indigo-500/10 dark:shadow-primary-500/10" 
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Workspace cards grid */}
      {filteredApps.length === 0 ? (
        <div className="glass-card rounded-2xl py-16 px-4 text-center border-slate-200 dark:border-slate-900 border-dashed border-2 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4">
            <Icons.Briefcase className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-slate-850 dark:text-slate-200">No application workspaces found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md">
            {searchQuery || statusFilter !== "All"
              ? "Try adjusting your search queries or clearing active status filters to find matching items."
              : "Start by creating a job workspace to analyze your resume and get custom interview questions."}
          </p>
          {(searchQuery || statusFilter !== "All") && (
            <button 
              onClick={() => { setSearchQuery(""); setStatusFilter("All"); }}
              className="mt-4 px-4 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-850 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map(app => (
            <div 
              key={app.id}
              onClick={() => onSelectApp(app.id)}
              className="glass-card rounded-2xl p-6 border-slate-200/80 dark:border-slate-850 cursor-pointer flex flex-col h-full glass-card-hover relative group overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/5 dark:bg-primary-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/10 dark:group-hover:bg-primary-600/10 transition-colors"></div>

              <div className="flex items-start justify-between mb-4 relative z-10">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getStatusStyle(app.status)}`}>
                  {app.status}
                </span>
                <button 
                  onClick={(e) => onDeleteApp(app.id, e)}
                  className="text-slate-400 dark:text-slate-600 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors"
                  title="Delete workspace"
                >
                  <Icons.Trash className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-heading font-bold text-lg text-slate-850 dark:text-white group-hover:text-indigo-650 dark:group-hover:text-primary-300 transition-colors line-clamp-1 mt-2">
                {app.company}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5 line-clamp-1">
                {app.role}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-900/60 pt-4 mt-auto">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">ATS Match Score</p>
                  <p className="text-2xl font-heading font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
                    {app.match_score}%
                  </p>
                </div>
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="24" cy="24" r="20"
                      stroke="currentColor" 
                      className="text-slate-100 dark:text-slate-800/50"
                      strokeWidth="4" 
                      fill="transparent" 
                    />
                    <circle 
                      cx="24" cy="24" r="20"
                      stroke={app.match_score >= 80 ? "#10b981" : app.match_score >= 70 ? "#f59e0b" : "#6366f1"} 
                      strokeWidth="4" 
                      fill="transparent"
                      strokeDasharray={125.6}
                      strokeDashoffset={125.6 - (125.6 * app.match_score) / 100}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="absolute text-[9px] font-heading font-bold text-slate-400 dark:text-slate-500">
                    Match
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center space-x-1.5 text-xs text-indigo-600 dark:text-primary-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Enter Workspace</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
