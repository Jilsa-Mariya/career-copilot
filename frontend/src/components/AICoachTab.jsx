import React, { useState, useEffect, useRef } from 'react';
import * as Icons from './Icons';

export default function AICoachTab({ application }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hello! I am your AI Career Coach. I have loaded all context regarding your parsed resume and your target role as a **${application.role}** at **${application.company}**.\n\nAsk me anything! I can help you prepare a custom cover letter outline, draft responses to difficult resume gaps, or plan a networking message strategy for recruiters.` }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Basic markdown helper parser to style bold, code quotes, and bullets in chat bubbles
  const parseMarkdown = (text) => {
    if (!text) return "";
    let escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    // Convert bold **text**
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
    // Convert italic or code quotes
    escaped = escaped.replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded font-mono text-[11px] text-indigo-650 dark:text-primary-350">$1</code>');
    
    return escaped.split('\n').map((line) => {
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return `<li class="ml-4 list-disc my-1 pl-1">${line.substring(2)}</li>`;
      }
      return `<p class="my-1.5 leading-relaxed">${line}</p>`;
    }).join('');
  };

  const handleSendPrompt = (promptText) => {
    if (isTyping) return;
    
    const userMsg = { role: "user", content: promptText };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let coachReply = "";
      const query = promptText.toLowerCase();
      
      if (query.includes("cover") || query.includes("letter")) {
        coachReply = `Here is a custom **Cover Letter Hook** tailored for **${application.company}**:\n\n*"Dear Hiring Manager,\n\nI was thrilled to see the opening for a ${application.role} at ${application.company}. Having followed ${application.company}'s recent work on scaling platforms, and with hands-on experience in Python and Flask (used to build predictive tools like ThermaSense), I am eager to apply my skills to your backend engineering initiatives. My background allows me to build stable APIs while rapidly picking up team technologies like Java and Docker..."*`;
      } else if (query.includes("resume") || query.includes("improve") || query.includes("strength") || query.includes("gap")) {
        coachReply = `Looking at your ATS analysis, your core strength is **Python** and **SQL**. However, you should focus on **Java** and **Docker** to meet the job description's preferred stacks.\n\nI recommend revising your resume project bullets to quantify your results. Instead of *"Trained LSTM models for server temperature prediction"*, try: \n\n*"Developed AI-based LSTM models that improved temperature prediction accuracy by 14%, directly reducing simulated server cooling overhead."*`;
      } else {
        coachReply = `That is an excellent question regarding your application for the **${application.role}** at **${application.company}**.\n\nTo make your profile stand out, I suggest drafting a short connection note to their senior engineers on LinkedIn. You can mention your passion for backend scalability and reference the projects (like ThermaSense or SkillTrack) that you've developed.\n\nWould you like me to draft a LinkedIn networking message for you, or focus on some potential technical questions?`;
      }

      setMessages(prev => [...prev, { role: "assistant", content: coachReply }]);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const txt = inputValue;
    setInputValue("");
    handleSendPrompt(txt);
  };

  const suggestionChips = [
    { label: "Draft cover letter outline", query: "Draft a cover letter outline for this role" },
    { label: "Rephrase my resume gaps", query: "Help me improve and rephrase my resume gaps" },
    { label: "LinkedIn connection note", query: "Draft a LinkedIn connection note for engineers at the company" },
  ];

  return (
    <div className="glass-card rounded-2xl border-slate-200 dark:border-slate-800 flex flex-col h-[560px] overflow-hidden animate-fadeIn transition-colors duration-300">
      {/* Chat header */}
      <div className="bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-200 dark:border-slate-900/60 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-650 to-violet-500 dark:from-primary-600 dark:to-indigo-500 flex items-center justify-center shadow">
            <Icons.Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-200">Coach Gemini</h3>
            <p className="text-[10px] text-slate-400 dark:text-slate-550 font-semibold uppercase">Active Copilot Session</p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Context Loaded</span>
        </div>
      </div>

      {/* Message view */}
      <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-slate-900/10">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
          >
            <div 
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user" 
                  ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-500/10 font-semibold" 
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none font-medium whitespace-pre-line"
              }`}
            >
              {msg.role === "user" ? (
                msg.content
              ) : (
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-4 rounded-2xl rounded-tl-none flex space-x-1 items-center">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/20 flex items-center space-x-2 overflow-x-auto scrollbar-none whitespace-nowrap">
        {suggestionChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendPrompt(chip.query)}
            disabled={isTyping}
            className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[11px] text-slate-600 dark:text-slate-400 font-semibold hover:border-indigo-400 dark:hover:border-primary-500 hover:text-indigo-650 dark:hover:text-primary-350 transition-colors disabled:opacity-50"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Form input */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 flex space-x-2">
        <input
          type="text"
          placeholder="Ask Coach Gemini about cover letters, resume edits, or interview tricks..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isTyping}
          className="flex-grow bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 dark:focus:border-primary-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-primary-500 disabled:opacity-60"
        />
        <button 
          type="submit"
          disabled={isTyping}
          className="p-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-primary-600 dark:hover:bg-primary-700 rounded-xl text-white border border-indigo-500 dark:border-primary-500 shadow-md shadow-indigo-500/10 dark:shadow-primary-500/10 transition-all flex items-center justify-center flex-shrink-0 disabled:opacity-50"
        >
          <Icons.Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
