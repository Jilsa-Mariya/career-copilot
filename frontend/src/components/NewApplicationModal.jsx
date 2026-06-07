import React, { useState } from 'react';
import * as Icons from './Icons';

export default function NewApplicationModal({ onClose, onSubmit }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !role || !resumeFile || !jdText) {
      alert("Please fill in all the required fields and upload a PDF resume.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep("Extracting and parsing text from resume...");
    setAnalysisProgress(15);

    setTimeout(() => {
      setAnalysisStep("Analyzing ATS keyword matches...");
      setAnalysisProgress(45);
    }, 1000);

    setTimeout(() => {
      setAnalysisStep("Generating personalized missing skills roadmap...");
      setAnalysisProgress(75);
    }, 2000);

    setTimeout(() => {
      setAnalysisStep("Compiling structured interview preparation questions...");
      setAnalysisProgress(95);
    }, 3000);

    setTimeout(() => {
      onSubmit({
        company,
        role,
        resume_filename: resumeFile.name,
        jd_text: jdText,
      });
      setIsAnalyzing(false);
      onClose();
    }, 3800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
      {/* Backdrop blur */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="glass-card rounded-2xl border-slate-200 dark:border-slate-800 max-w-2xl w-full p-6 sm:p-8 z-10 relative overflow-hidden shadow-2xl bg-white dark:bg-slate-900 transition-colors duration-300">
        {isAnalyzing ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-900 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 dark:border-primary-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Icons.Sparkles className="w-8 h-8 text-indigo-600 dark:text-primary-400 animate-pulse-subtle" />
              </div>
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-850 dark:text-white">Analyzing Profile</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-sm h-12 transition-all duration-300">
              {analysisStep}
            </p>
            <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-2.5 mt-6 max-w-md overflow-hidden border border-slate-200 dark:border-slate-800">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-violet-650 dark:from-primary-500 dark:to-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
            <span className="text-xs text-slate-500 mt-2 font-medium">{analysisProgress}% Complete</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-4">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-slate-850 dark:text-white">Create Job Application Workspace</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Upload resume and job description to compare match profiles.</p>
              </div>
              <button 
                type="button" 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-905 transition-colors font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OpenAI, Stripe"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-105 focus:outline-none focus:border-indigo-500 dark:focus:border-primary-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Job Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full Stack Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-105 focus:outline-none focus:border-indigo-500 dark:focus:border-primary-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* File Upload drag and drop */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">Upload Resume (PDF only) *</label>
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                  dragActive 
                    ? "border-indigo-500 bg-indigo-500/5 dark:border-primary-500 dark:bg-primary-500/5" 
                    : resumeFile 
                      ? "border-emerald-500/50 bg-emerald-500/5" 
                      : "border-slate-200 hover:border-slate-350 dark:border-slate-800 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-900/30"
                }`}
              >
                <input
                  type="file"
                  id="resume-file-input"
                  accept=".pdf"
                  required
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="resume-file-input" className="cursor-pointer flex flex-col items-center">
                  {resumeFile ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                        <Icons.CheckCircle className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                      </div>
                      <span className="text-sm font-semibold text-slate-850 dark:text-slate-200">{resumeFile.name}</span>
                      <span className="text-xs text-slate-500 mt-1">
                        File selected ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB). Click to change.
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-3">
                        <Icons.UploadCloud className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Drag & drop your PDF resume here</span>
                      <span className="text-xs text-slate-500 dark:text-slate-500 mt-1">or click to browse from device files</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Job description textbox */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">Job Description *</label>
              <textarea
                required
                rows="5"
                placeholder="Paste the full job description text here to run keyword comparison analysis..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                className="w-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:focus:border-primary-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-primary-500 placeholder-slate-400 dark:placeholder-slate-655 font-sans"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-900 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-850 dark:border-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200/50 dark:hover:bg-slate-850 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="gradient-border-btn px-5 py-2.5 text-xs font-semibold text-white flex items-center space-x-1.5 shadow-md shadow-indigo-500/10"
              >
                <Icons.Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span>Analyze Profile & Create Workspace</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
