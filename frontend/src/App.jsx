import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Workspace from './components/Workspace';
import NewApplicationModal from './components/NewApplicationModal';
import * as Icons from './components/Icons';

const initialApplications = [
  {
    id: 1,
    company: "TCS",
    role: "Software Developer Intern",
    resume_filename: "Jilsa_Mariya_Resume_May26.pdf",
    resume_text: "...",
    jd_text: "We are looking for a Software Developer Intern who is passionate about building scalable software solutions and learning modern development practices. The candidate will work with experienced developers on real-world projects involving backend systems, databases, APIs, and cloud technologies.\n\nResponsibilities\n* Develop and maintain backend applications using Python and Java.\n* Design and consume RESTful APIs.\n* Work with SQL databases and write optimized queries.\n* Collaborate with cross-functional teams to deliver software solutions.\n* Participate in code reviews and debugging activities.\n* Write clean, maintainable, and documented code.\n* Assist in testing and deployment activities.\n\nRequired Skills\n* Python\n* SQL\n* Git/GitHub\n* REST APIs\n* Object-Oriented Programming\n* Problem Solving\n* Team Collaboration",
    match_score: 61,
    strengths: ["Python", "SQL", "Git/GitHub", "REST APIs", "Problem Solving", "Team Collaboration", "Flask", "Postman"],
    partial_matches: ["Object-Oriented Programming", "Code Reviews", "Debugging", "Writing clean/maintainable code", "Testing activities"],
    missing_skills: ["Java", "Docker", "Linux Basics", "Cloud Fundamentals (AWS/Azure/GCP)"],
    resume_improvements: [
      "Quantify project achievements and impact using metrics (e.g., performance improvements, efficiency gains, user reach).",
      "Elaborate on the 'Junior Software Engineering Intern' role, detailing any specific technologies, tasks, or learning experiences.",
      "Explicitly mention and provide examples of Object-Oriented Programming (OOP) principles applied in Python projects.",
      "Highlight specific experiences with code reviews, debugging techniques, writing clean/maintainable/documented code, and any involvement in testing or deployment.",
      "Include an 'Objective' or 'Summary' statement at the beginning of the resume to provide a concise overview."
    ],
    learning_path: {
      roadmap: [
        {
          skill: "Linux Basics",
          topics: ["CLI fundamentals (cd, ls, mv, cp, rm)", "File system navigation & permissions", "Process management (ps, top, kill)", "Shell scripting basics"],
          resources: ["The Linux Command Line (Book)", "Linux Journey (Online Tutorial)", "freeCodeCamp Linux Crash Course (YouTube)"],
          project: "Create a bash script that automates backing up specific directories and monitoring disk usage on a schedule."
        },
        {
          skill: "Java",
          topics: ["Core Java Syntax", "OOP principles (Inheritance, Polymorphism)", "Collections Framework", "Exception Handling", "JUnit Testing"],
          resources: ["Head First Java (Book)", "Oracle Java Tutorials", "Java Programming Masterclass (Udemy)"],
          project: "Develop a console-based Simple Banking System applying OOP principles and Java Collections."
        },
        {
          skill: "Docker",
          topics: ["Containers vs. VMs", "Dockerfile syntax", "Building and running containers", "Docker Compose for multi-containers"],
          resources: ["Docker Official Docs", "Docker Deep Dive (Bret Fisher)", "freeCodeCamp Docker Course (YouTube)"],
          project: "Containerize a Flask application and connect it to a MySQL container using Docker Compose."
        }
      ]
    },
    interview_prep: {
      technical_topics: ["Python Core & OOP", "SQL joins & query optimization", "REST API principles", "Flask framework", "Git version control"],
      technical_questions: [
        "Explain the key principles of Object-Oriented Programming (OOP) and how you've applied them in your Python projects.",
        "Can you describe the differences between list, tuple, set, and dictionary in Python?",
        "What is the difference between SQL and NoSQL databases? When would you choose MySQL over MongoDB?",
        "Describe the different types of SQL JOINs. Provide a scenario where you would use a LEFT JOIN."
      ],
      hr_topics: ["Motivation for Backend Engineering", "Teamwork & Collaboration", "Problem-Solving under pressure", "Time management"],
      hr_questions: [
        "What motivated you to pursue a career in software development, particularly in backend engineering?",
        "Describe a time when you had to work effectively as part of a team to achieve a common goal.",
        "Tell me about a significant technical challenge you encountered. How did you approach it?"
      ],
      project_questions: [
        "Could you walk me through the 'ThermaSense' project? How did you train the LSTM models?",
        "In 'Moodmentor', you integrated facial expression analysis. What was the most complex part of that implementation?"
      ]
    },
    status: "Rejected",
    notes: "Deadline at June 16. Follow up with HR about potential future developer roles."
  },
  {
    id: 2,
    company: "Stripe",
    role: "Frontend Engineer (React)",
    resume_filename: "Jilsa_Mariya_Resume_May26.pdf",
    resume_text: "...",
    jd_text: "Stripe is looking for a Frontend Engineer to build beautiful, highly-responsive interfaces for our merchant dashboard. You will work extensively with React, Tailwind CSS, TypeScript, and state management tools.\n\nQualifications:\n- Strong expertise in React and modern hooks\n- Proficient in CSS, Tailwind, or responsive styling\n- Understanding of build tools like Vite, Webpack\n- Familiarity with design systems and micro-frontends",
    match_score: 84,
    strengths: ["React.js", "Tailwind CSS", "JavaScript (ES6+)", "Git/GitHub", "HTML5 & CSS3", "Figma integration"],
    partial_matches: ["TypeScript", "Vite", "Responsive Design patterns"],
    missing_skills: ["Webpack", "State Management (Redux/Zustand)", "Cypress Testing", "GraphQL"],
    resume_improvements: [
      "Highlight projects using React state management tools more explicitly.",
      "Add mention of TypeScript if applicable, or state interest in transitioning projects to TypeScript.",
      "Elaborate on frontend components and component lifecycle optimizations."
    ],
    learning_path: {
      roadmap: [
        {
          skill: "Zustand & Redux",
          topics: ["Global state stores", "Actions and dispatchers", "Middleware & async actions", "DevTools debugging"],
          resources: ["Zustand Github & docs", "Redux Toolkit docs", "Academind state management course"],
          project: "Build a multi-step checkout workflow with Zustand global store, preserving input state across refreshes."
        },
        {
          skill: "TypeScript",
          topics: ["Basic Types & Interfaces", "Generics in TypeScript", "React component props typing", "Strict mode debugging"],
          resources: ["TypeScript Deep Dive (Book)", "NoBS TS (YouTube Series by Jack Herrington)"],
          project: "Migrate an existing JS/React project to TypeScript, resolving all strictly-typed component errors."
        }
      ]
    },
    interview_prep: {
      technical_topics: ["React Fiber & reconciliation", "State updates batching", "Tailwind utility layout performance", "Web Performance optimization"],
      technical_questions: [
        "What is the Virtual DOM and how does React reconcile changes?",
        "How does React's useMemo and useCallback hook prevent unnecessary re-renders?",
        "Explain the difference between flexbox and grid layouts in Tailwind, and when to use which."
      ],
      hr_topics: ["Company mission alignment", "UX/Design collaboration", "Continuous feedback"],
      hr_questions: [
        "Why do you want to work at Stripe? What product details interest you the most?",
        "How do you resolve a design disagreement with a UI/UX designer?"
      ],
      project_questions: [
        "Walk me through how you designed the responsive layout for 'Moodmentor'. Did you use Tailwind or custom CSS?"
      ]
    },
    status: "Interviewing",
    notes: "Round 2 technical coding interview scheduled for next Thursday. Review CSS grid and compound component patterns."
  },
  {
    id: 3,
    company: "Google",
    role: "Associate Software Engineer",
    resume_filename: "Jilsa_Mariya_Resume_May26.pdf",
    resume_text: "...",
    jd_text: "Google is hiring Associate Software Engineers to solve challenging problems in scalable distributed systems. Ideal candidates have strong computer science fundamentals in data structures, algorithms, system design, and clean code principles.\n\nMinimum qualifications:\n- Bachelor's in CS or equivalent\n- Proficiency in Java, C++, or Python\n- Solid foundation in DSA",
    match_score: 74,
    strengths: ["Python", "SQL", "Problem Solving", "C programming", "Algorithm Design", "Team Collaboration"],
    partial_matches: ["Data Structures", "Big-O Notation Analysis", "Clean Code practices"],
    missing_skills: ["System Design", "Distributed Systems", "C++ templates", "Advanced Algorithms (Graph, DP)"],
    resume_improvements: [
      "Incorporate more data-structure specific terms in project descriptions.",
      "Add hackathon achievements at the very top of experience sections.",
      "Mention specific algorithm paradigms used in predictive systems like 'ThermaSense'."
    ],
    learning_path: {
      roadmap: [
        {
          skill: "System Design",
          topics: ["Scalability fundamentals (Horizontal vs. Vertical)", "Load Balancers", "Caching mechanisms (Redis)", "Database replication & sharding"],
          resources: ["System Design Primer (GitHub)", "ByteByteGo (Alex Xu)", "Grokking the System Design Interview"],
          project: "Design a high-level architecture diagram for a URL shortener, detailing database scaling and caching strategies."
        },
        {
          skill: "Advanced Algorithms",
          topics: ["Graph traversals (BFS/DFS)", "Dijkstra's shortest path", "Dynamic Programming (Knapsack, LCS)", "Trie and Trees structure"],
          resources: ["CLRS Introduction to Algorithms (Book)", "LeetCode patterns guides", "NeetCode.io courses"],
          project: "Implement a customizable search auto-complete system using a Trie data structure, optimized for fast prefix lookup."
        }
      ]
    },
    interview_prep: {
      technical_topics: ["Data Structures (Trees, Graphs, HashTables)", "Complexity Analysis (Time & Space)", "Algorithm paradigms (Greedy, Divide & Conquer)"],
      technical_questions: [
        "Describe how a HashMap handles collisions. What is the time complexity in worst-case vs average-case?",
        "How would you find the shortest path in an unweighted grid? Explain the algorithm.",
        "What is the difference between dynamic programming and memoization?"
      ],
      hr_topics: ["Googliness & Leadership", "Ambiguity tolerance", "Inclusive workspace contribution"],
      hr_questions: [
        "Give an example of a time when you took initiative on a project. What was the impact?",
        "How do you deal with ambiguous requirements when a project is assigned to you?"
      ],
      project_questions: [
        "How does 'ThermaSense' handle anomalous temperature inputs? What algorithm was used to clean/filter training data?"
      ]
    },
    status: "Applied",
    notes: "Completed the Online Assessment. Awaiting feedback from the recruiter."
  }
];

export default function App() {
  const [apps, setApps] = useState(() => {
    const saved = localStorage.getItem("copilot_apps");
    return saved ? JSON.parse(saved) : initialApplications;
  });
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [currentTab, setCurrentTab] = useState("overview");
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [activeInterview, setActiveInterview] = useState(null);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("copilot_theme");
    return saved ? saved : "light";
  });

  useEffect(() => {
    localStorage.setItem("copilot_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("copilot_apps", JSON.stringify(apps));
  }, [apps]);

  const selectedApp = apps.find(a => a.id === selectedAppId);

  const handleAddApplication = (newApp) => {
    const id = apps.length > 0 ? Math.max(...apps.map(a => a.id)) + 1 : 1;
    const completeApp = {
      id,
      company: newApp.company,
      role: newApp.role,
      resume_filename: newApp.resume_filename || "Uploaded_Resume.pdf",
      resume_text: "Uploaded resume content parsed successfully.",
      jd_text: newApp.jd_text,
      match_score: newApp.match_score || Math.floor(Math.random() * 30) + 60,
      strengths: newApp.strengths || ["Python", "JavaScript", "SQL", "Team Collaboration"],
      partial_matches: newApp.partial_matches || ["OOP", "Web API design"],
      missing_skills: newApp.missing_skills || ["Docker", "AWS Cloud", "Linux Administration"],
      resume_improvements: newApp.resume_improvements || [
        "Use active verbs to start bullets.",
        "Quantify results in the experience section.",
        "Format layout to match typical ATS standards."
      ],
      learning_path: newApp.learning_path || {
        roadmap: [
          {
            skill: "Docker",
            topics: ["Containers basics", "Dockerfiles", "Docker compose"],
            resources: ["Official Docs", "Docker Course on freeCodeCamp"],
            project: "Containerize your latest web application with a production database."
          },
          {
            skill: "AWS Cloud",
            topics: ["EC2 instances", "S3 buckets", "VPC setup"],
            resources: ["AWS Skill Builder", "Cloud Practitioner Guide"],
            project: "Deploy static frontend assets to S3 and point to a Custom Domain."
          }
        ]
      },
      interview_prep: newApp.interview_prep || {
        technical_topics: ["Software Architecture", "Relational Databases", "REST APIs", "Modern JS & Python Frameworks"],
        technical_questions: [
          "What is a stateless API, and why is scalability associated with it?",
          "Describe the differences between SQL normalization levels (1NF, 2NF, 3NF)."
        ],
        hr_topics: ["Collaboration", "Conflict Resolution", "Growth Mindset"],
        hr_questions: [
          "How do you handle feedback that you strongly disagree with?",
          "What is your dream engineering culture?"
        ],
        project_questions: [
          "Walk through a technical trade-off you had to make in one of your personal projects."
        ]
      },
      status: "Saved",
      notes: ""
    };
    
    setApps([...apps, completeApp]);
    setSelectedAppId(id);
    setCurrentTab("overview");
  };

  const handleUpdateStatus = (appId, newStatus) => {
    setApps(apps.map(a => a.id === appId ? { ...a, status: newStatus } : a));
  };

  const handleSaveNotes = (appId, newNotes) => {
    setApps(apps.map(a => a.id === appId ? { ...a, notes: newNotes } : a));
  };

  const handleDeleteApp = (appId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this job workspace?")) {
      setApps(apps.filter(a => a.id !== appId));
      if (selectedAppId === appId) {
        setSelectedAppId(null);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 bg-grid-pattern transition-colors duration-300">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setSelectedAppId(null)}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 dark:from-primary-600 dark:to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Icons.Sparkles className="w-5 h-5 text-white animate-pulse-subtle" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl tracking-tight text-slate-800 dark:text-white">CAREER</span>
              <span className="font-heading font-extrabold text-xl tracking-tight text-indigo-600 dark:text-primary-400 ml-1">COPILOT</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            {selectedAppId === null && (
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Average Match</p>
                  <p className="text-sm font-heading font-bold text-slate-800 dark:text-slate-200">
                    {apps.length > 0 
                      ? `${Math.round(apps.reduce((sum, item) => sum + item.match_score, 0) / apps.length)}%` 
                      : 'N/A'}
                  </p>
                </div>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Total Workspaces</p>
                  <p className="text-sm font-heading font-bold text-slate-800 dark:text-slate-200">{apps.length}</p>
                </div>
              </div>
            )}

            {selectedAppId !== null && (
              <div className="flex items-center space-x-2 text-xs sm:text-sm">
                <button 
                  onClick={() => setSelectedAppId(null)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900 dark:text-slate-300 transition-colors"
                >
                  <Icons.ChevronLeft className="w-4 h-4" />
                  <span>Back to Dashboard</span>
                </button>
              </div>
            )}

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-850 dark:text-slate-300 transition-colors flex items-center justify-center"
              aria-label="Toggle Theme"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Icons.Moon className="w-4.5 h-4.5" />
              ) : (
                <Icons.Sun className="w-4.5 h-4.5 animate-spin-slow" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace content */}
      <main className="flex-grow flex flex-col">
        {selectedAppId === null ? (
          <Dashboard 
            apps={apps}
            onSelectApp={setSelectedAppId}
            onOpenNewAppModal={() => setShowNewAppModal(true)}
            onDeleteApp={handleDeleteApp}
          />
        ) : (
          <Workspace 
            application={selectedApp}
            currentTab={currentTab}
            onChangeTab={(tab) => {
              setCurrentTab(tab);
              setActiveInterview(null);
            }}
            onUpdateStatus={handleUpdateStatus}
            onSaveNotes={handleSaveNotes}
            activeInterview={activeInterview}
            onStartInterview={setActiveInterview}
          />
        )}
      </main>

      {showNewAppModal && (
        <NewApplicationModal 
          onClose={() => setShowNewAppModal(false)}
          onSubmit={handleAddApplication}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-100/50 dark:border-slate-900 dark:bg-slate-950 py-6 text-center text-xs text-slate-500 dark:text-slate-600 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Career Copilot. Empowering candidates with Gemini Intelligence.</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
