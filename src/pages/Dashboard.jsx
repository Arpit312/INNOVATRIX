import React, { useState } from "react";
import { 
  LayoutGrid, 
  List, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Github, 
  Code2, 
  Clock, 
  Star,
  Activity,
  ArrowRight
} from "lucide-react";

// --- DUMMY DATA ---
const PROJECTS = [
  { 
    id: 1, 
    title: "DeFi Payment Gateway", 
    category: "Fintech", 
    desc: "A decentralized payment router handling multi-chain stablecoin settlements.",
    tech: ["React", "Solidity", "Node.js"], 
    verified: true, 
    peers: 4,
    date: "Mar 2024",
    color: "from-blue-500 to-indigo-600"
  },
  { 
    id: 2, 
    title: "AI Essay Grader", 
    category: "EdTech", 
    desc: "NLP pipeline that evaluates and provides feedback on student essays.",
    tech: ["Python", "PyTorch", "Next.js"], 
    verified: true, 
    peers: 12,
    date: "Feb 2024",
    color: "from-emerald-400 to-teal-500"
  },
  { 
    id: 3, 
    title: "Global CDN Router", 
    category: "Infrastructure", 
    desc: "Edge routing logic for a distributed content delivery network.",
    tech: ["Go", "Rust", "Docker"], 
    verified: false, 
    peers: 0,
    date: "Jan 2024",
    color: "from-slate-600 to-slate-800"
  },
  { 
    id: 4, 
    title: "Sentiment Analysis Bot", 
    category: "AI / NLP", 
    desc: "Real-time Twitter sentiment tracker for crypto assets.",
    tech: ["Python", "FastAPI", "React"], 
    verified: true, 
    peers: 3,
    date: "Dec 2023",
    color: "from-violet-500 to-purple-600"
  }
];

const SKILLS = [
  { name: "React / Next.js", level: 92, verified: true },
  { name: "Node.js & Express", level: 88, verified: true },
  { name: "Python / AI", level: 75, verified: true },
  { name: "Go (Golang)", level: 60, verified: false },
  { name: "AWS Infrastructure", level: 82, verified: true },
];

const ACTIVITIES = [
  { id: 1, text: "Ananya G. verified your commit in DeFi Gateway", time: "2h ago", icon: <CheckCircle2 size={14}/>, color: "text-emerald-500 bg-emerald-100" },
  { id: 2, text: "Earned 'Top 10% React Dev' badge", time: "1d ago", icon: <Award size={14}/>, color: "text-amber-500 bg-amber-100" },
  { id: 3, text: "You reviewed a PR for Karan V.", time: "2d ago", icon: <Code2 size={14}/>, color: "text-indigo-500 bg-indigo-100" },
];

const FILTERS = ["All", "Fintech", "EdTech", "Infrastructure", "AI / NLP"];

// --- SUB-COMPONENTS ---

function TrustHeader({ onVerify }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60"></div>
      
      <img 
        src="https://api.dicebear.com/7.x/lorelei/svg?seed=arya" 
        alt="Profile" 
        className="w-20 h-20 rounded-2xl bg-slate-100 border-4 border-white shadow-md z-10"
      />
      
      <div className="flex-1 z-10">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-slate-900">Arya Mehta</h1>
          <ShieldCheck className="text-indigo-600" size={24} />
        </div>
        <p className="text-sm text-slate-500 mb-4">Senior Full-Stack Engineer • India</p>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Github size={16} /> 1.2k Commits
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <CheckCircle2 size={16} className="text-emerald-500" /> 45 Peer Reviews
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-indigo-50 border border-indigo-100 rounded-2xl p-5 min-w-[140px] z-10">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Trust Score</span>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-slate-900">91</span>
          <span className="text-sm font-medium text-slate-500">/100</span>
        </div>
        <button 
          onClick={onVerify}
          className="mt-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 w-full py-2 rounded-xl transition-colors shadow-sm"
        >
          Verify More
        </button>
      </div>
    </div>
  );
}

function ProjectCard({ project, gridView }) {
  if (!gridView) {
    return (
      <div className="group bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-all hover:shadow-md cursor-pointer">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex-shrink-0 shadow-sm`}></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-slate-900 truncate">{project.title}</h3>
            {project.verified && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] px-1.5 py-0.5 rounded-md font-bold flex items-center gap-1">
                <CheckCircle2 size={10} /> Verified
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 truncate">{project.desc}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:w-48">
          {project.tech.slice(0, 3).map(t => (
            <span key={t} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{t}</span>
          ))}
        </div>
        <div className="text-right text-xs text-slate-400 font-medium sm:w-20">
          {project.date}
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl overflow-hidden transition-all hover:shadow-md flex flex-col cursor-pointer">
      <div className={`h-24 bg-gradient-to-br ${project.color} relative p-4 flex items-end`}>
         {project.verified && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-emerald-700 shadow-sm text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> Verified
            </div>
         )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{project.title}</h3>
        </div>
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-1">{project.desc}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {project.tech.map(t => (
            <span key={t} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
              {t}
            </span>
          ))}
        </div>
        
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock size={14} /> {project.date}
          </div>
          {project.peers > 0 && (
             <div className="flex items-center gap-1">
               <ShieldCheck size={14} className="text-indigo-400" />
               <span className="text-slate-600">{project.peers} peers</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillMatrix() {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Verified Skill Matrix</h2>
          <p className="text-xs text-slate-500 mt-1">Skills validated through peer reviews & commits</p>
        </div>
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
          <Activity size={20} />
        </div>
      </div>
      
      <div className="space-y-5">
        {SKILLS.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-800">{skill.name}</span>
                {skill.verified && <CheckCircle2 size={14} className="text-emerald-500" />}
              </div>
              <span className="text-xs font-bold text-slate-500">{skill.level}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/50">
              <div 
                className={`h-full rounded-full ${skill.verified ? 'bg-gradient-to-r from-indigo-500 to-indigo-600' : 'bg-slate-300'}`}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ActivityFeed() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
      <h2 className="text-base font-bold text-slate-900 mb-5">Recent Activity</h2>
      <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
        {ACTIVITIES.map((act) => (
          <div key={act.id} className="relative pl-6">
            <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${act.color}`}>
              {act.icon}
            </div>
            <p className="text-sm text-slate-800 font-medium leading-tight">{act.text}</p>
            <p className="text-xs text-slate-400 mt-1">{act.time}</p>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors flex items-center justify-center gap-1">
        View all activity <ArrowRight size={14} />
      </button>
    </div>
  );
}

// --- MAIN DASHBOARD COMPONENT ---

export default function Dashboard({ onVerify }) {
  const [filter, setFilter] = useState("All");
  const [gridView, setGridView] = useState(true);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  // Mock verify handler for demo purposes
  const handleVerify = onVerify;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Left Column — Main Content */}
          <div className="flex-1 min-w-0 space-y-8">
            <TrustHeader onVerify={handleVerify} />

            {/* Projects Section */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Project Portfolio</h2>
                  <p className="text-sm text-slate-500 mt-1">{PROJECTS.length} verified projects mapped to your identity.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {/* Filters */}
                  <div className="flex flex-wrap bg-slate-200/50 p-1 rounded-xl gap-1">
                    {FILTERS.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                          filter === f
                            ? "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200/50"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  
                  {/* View Toggle */}
                  <div className="hidden sm:flex bg-slate-200/50 rounded-xl p-1 gap-1">
                    <button
                      onClick={() => setGridView(true)}
                      className={`p-2 rounded-lg transition-all ${gridView ? "bg-white shadow-sm text-indigo-600 ring-1 ring-slate-200/50" : "text-slate-500 hover:text-slate-800"}`}
                      aria-label="Grid view"
                    >
                      <LayoutGrid size={16} />
                    </button>
                    <button
                      onClick={() => setGridView(false)}
                      className={`p-2 rounded-lg transition-all ${!gridView ? "bg-white shadow-sm text-indigo-600 ring-1 ring-slate-200/50" : "text-slate-500 hover:text-slate-800"}`}
                      aria-label="List view"
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 flex flex-col items-center text-center text-slate-500">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-slate-300" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">No projects found</h3>
                  <p className="text-sm">You haven't uploaded any projects in the {filter} category yet.</p>
                </div>
              ) : (
                <div
                  className={
                    gridView
                      ? "grid grid-cols-1 md:grid-cols-2 gap-5"
                      : "flex flex-col gap-3"
                  }
                >
                  {filtered.map((project) => (
                    <ProjectCard key={project.id} project={project} gridView={gridView} />
                  ))}
                </div>
              )}
            </section>

            <SkillMatrix />
          </div>

          {/* Right Column — Sidebar */}
          <aside className="xl:w-[320px] flex-shrink-0 space-y-6">
            
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 rounded-3xl p-7 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-lg">Boost Score</h3>
              </div>
              
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Unlock top-tier freelance opportunities by linking more repositories to reach a score of 95+.
              </p>
              
              <button
                onClick={handleVerify}
                className="w-full bg-white text-indigo-700 hover:bg-slate-50 text-sm font-bold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Verify Credentials <ArrowRight size={16} />
              </button>
            </div>

            <ActivityFeed />

            {/* Leaderboard */}
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Star size={18} className="text-amber-500 fill-amber-500" />
                  Trust Leaderboard
                </h2>
                <p className="text-xs text-slate-500 mt-1">Top verified engineers this month</p>
              </div>
              <div className="p-4 space-y-1">
                {[
                  { name: "Ananya G.", score: 97, avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=ananya" },
                  { name: "Karan V.", score: 95, avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=karan" },
                  { name: "Arya Mehta", score: 91, avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=arya", isYou: true },
                  { name: "Meera D.", score: 88, avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=meera" },
                ].map((u, i) => (
                  <div
                    key={u.name}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-2xl transition-colors hover:bg-slate-50 ${u.isYou ? "bg-indigo-50/80 ring-1 ring-indigo-100 hover:bg-indigo-50" : ""}`}
                  >
                    <span className={`text-sm font-bold w-5 text-center ${i === 0 ? "text-amber-500" : i === 1 ? "text-slate-400" : i === 2 ? "text-amber-700" : "text-slate-300"}`}>
                      #{i + 1}
                    </span>
                    <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${u.isYou ? "text-indigo-700" : "text-slate-800"} truncate`}>
                        {u.name} {u.isYou && <span className="text-indigo-400 font-medium ml-1">(You)</span>}
                      </p>
                    </div>
                    <div className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded-md">
                      {u.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}