import React, { useState } from 'react';
import * as Icons from './Icons';

export default function NotesTab({ application, onSaveNotes }) {
  const [notes, setNotes] = useState(application.notes || "");
  const [showNotify, setShowNotify] = useState(false);
  const [activeMode, setActiveMode] = useState("write"); // "write" or "preview"

  const handleSave = () => {
    onSaveNotes(application.id, notes);
    setShowNotify(true);
    setTimeout(() => setShowNotify(false), 3000);
  };

  const renderMarkdown = (text) => {
    if (!text.trim()) {
      return '<p class="text-slate-400 dark:text-slate-500 italic text-center py-8">No notes written yet. Start typing in the "Write" tab!</p>';
    }
    
    let escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    // Convert headers
    escaped = escaped.replace(/^### (.*$)/gim, '<h3 class="font-heading font-bold text-base mt-4 mb-2 text-slate-850 dark:text-white">$1</h3>');
    escaped = escaped.replace(/^## (.*$)/gim, '<h2 class="font-heading font-bold text-lg mt-5 mb-2.5 text-slate-850 dark:text-white">$1</h2>');
    escaped = escaped.replace(/^# (.*$)/gim, '<h1 class="font-heading font-extrabold text-xl mt-6 mb-3 text-slate-850 dark:text-white">$1</h1>');
    
    // Bold
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
    
    // Italic
    escaped = escaped.replace(/\*(.*?)\*/g, '<em class="italic text-slate-800 dark:text-slate-200">$1</em>');
    
    // Code block inline
    escaped = escaped.replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded font-mono text-xs text-rose-655 dark:text-primary-350">$1</code>');
    
    // Links
    escaped = escaped.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-650 dark:text-primary-400 hover:text-indigo-755 dark:hover:text-primary-300 underline font-medium transition-colors">$1</a>');

    const lines = escaped.split('\n');
    let inList = false;
    const processedLines = [];
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!inList) {
          processedLines.push('<ul class="list-disc pl-5 my-2 space-y-1.5">');
          inList = true;
        }
        processedLines.push(`<li class="text-xs sm:text-sm text-slate-655 dark:text-slate-300 leading-normal">${trimmed.substring(2)}</li>`);
      } else {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        if (trimmed) {
          if (!trimmed.startsWith('<h') && !trimmed.startsWith('<ul') && !trimmed.startsWith('<li') && !trimmed.startsWith('</ul')) {
            processedLines.push(`<p class="my-2.5 text-xs sm:text-sm text-slate-655 dark:text-slate-350 leading-relaxed">${trimmed}</p>`);
          } else {
            processedLines.push(trimmed);
          }
        } else {
          processedLines.push('<div class="h-2"></div>');
        }
      }
    });
    
    if (inList) {
      processedLines.push('</ul>');
    }
    
    return processedLines.join('\n');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-800 dark:text-white">Application Workspace Notes</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Capture custom details, key timelines, and follow-up strategies for this role.</p>
        </div>
        <div className="flex items-center space-x-3 self-end sm:self-auto">
          {showNotify && (
            <span className="text-xs text-emerald-600 dark:text-emerald-450 font-bold animate-pulse-subtle">
              ✓ Notes saved successfully
            </span>
          )}
          <button 
            onClick={handleSave}
            className="bg-indigo-650 hover:bg-indigo-755 dark:bg-primary-600 dark:hover:bg-primary-700 text-xs font-bold text-white px-5 py-2.5 rounded-lg border border-indigo-500 dark:border-primary-500 shadow-lg shadow-indigo-500/10 dark:shadow-primary-500/10 transition-colors"
          >
            Save Notes
          </button>
        </div>
      </div>

      {/* Editor & Preview Card */}
      <div className="glass-card rounded-2xl border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[450px]">
        {/* Toolbar Header */}
        <div className="bg-slate-50 dark:bg-slate-950/50 px-4 py-2 border-b border-slate-200 dark:border-slate-900/60 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center space-x-1 flex-shrink-0">
            {activeMode === "write" ? (
              ["Bold", "Italic", "Header", "List", "Code", "Link"].map(tool => (
                <button 
                  key={tool}
                  type="button"
                  onClick={() => {
                    if (tool === "Bold") setNotes(n => n + " **bold_text**");
                    if (tool === "Italic") setNotes(n => n + " *italic_text*");
                    if (tool === "Header") setNotes(n => n + "\n### Section Header\n");
                    if (tool === "List") setNotes(n => n + "\n- Item detail\n");
                    if (tool === "Code") setNotes(n => n + " `code_block`");
                    if (tool === "Link") setNotes(n => n + " [link_title](https://example.com)");
                  }}
                  className="px-2.5 py-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-900 rounded-md transition-colors"
                >
                  {tool}
                </button>
              ))
            ) : (
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-1.5">Markdown Render Output</span>
            )}
          </div>

          {/* Toggle write / preview modes */}
          <div className="flex items-center space-x-1 p-0.5 bg-slate-200/60 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-850 flex-shrink-0">
            <button
              onClick={() => setActiveMode("write")}
              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                activeMode === "write"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-primary-350 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Write
            </button>
            <button
              onClick={() => setActiveMode("preview")}
              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                activeMode === "preview"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-primary-350 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Workspace text area or Preview block */}
        {activeMode === "write" ? (
          <textarea
            className="flex-grow p-6 bg-white dark:bg-slate-900/10 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-700 font-mono text-sm leading-relaxed border-0 focus:outline-none resize-none font-sans"
            placeholder="Start drafting notes... write details like deadline dates, recruiter names, follow-ups, key items to highlight, or custom checklist points."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        ) : (
          <div 
            className="flex-grow p-6 overflow-y-auto bg-white/40 dark:bg-slate-900/5 font-sans"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(notes) }}
          />
        )}
      </div>
    </div>
  );
}
