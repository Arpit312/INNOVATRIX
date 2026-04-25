import { useState } from "react";
import TrustHeader from "../components/TrustHeader";
import ProjectCard from "../components/ProjectCard";
import SkillMatrix from "../components/SkillMatrix";
import ActivityFeed from "../components/ActivityFeed";
import { PROJECTS } from "../data/dummyData";
import { LayoutGrid, List } from "lucide-react";

const FILTERS = ["All", "Fintech", "EdTech", "Infrastructure", "AI / NLP"];

export default function Dashboard({ onVerify }) {
  const [filter, setFilter] = useState("All");
  const [gridView, setGridView] = useState(true);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left — main column */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Trust Header */}
          <TrustHeader onVerify={onVerify} />

          {/* Projects Section */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Project Portfolio</h2>
                <p className="text-xs text-slate-400 mt-0.5">{PROJECTS.length} verified projects</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Filters */}
                <div className="flex flex-wrap gap-1.5">
                  {FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                        filter === f
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                {/* View toggle */}
                <div className="flex bg-slate-100 rounded-lg p-0.5 gap-0.5 ml-1">
                  <button
                    onClick={() => setGridView(true)}
                    className={`p-1.5 rounded-md transition-all ${gridView ? "bg-white shadow-sm text-indigo-600" : "text-slate-400"}`}
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    onClick={() => setGridView(false)}
                    className={`p-1.5 rounded-md transition-all ${!gridView ? "bg-white shadow-sm text-indigo-600" : "text-slate-400"}`}
                  >
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-400">
                <p className="font-semibold">No projects in this category yet.</p>
              </div>
            ) : (
              <div
                className={
                  gridView
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                    : "flex flex-col gap-3"
                }
              >
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </section>

          {/* Skill Matrix */}
          <SkillMatrix onVerify={onVerify} />
        </div>

        {/* Right sidebar */}
        <aside className="xl:w-72 flex-shrink-0 space-y-6">
          {/* Quick actions */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200">
            <h3 className="font-bold text-sm mb-1">Boost Your Trust Score</h3>
            <p className="text-indigo-200 text-xs mb-4 leading-relaxed">
              Complete peer reviews and link more projects to reach 95+.
            </p>
            <button
              onClick={onVerify}
              className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white text-xs font-bold py-2.5 rounded-xl transition-all"
            >
              Start Verification →
            </button>
          </div>

          {/* Activity Feed */}
          <ActivityFeed />

          {/* Leaderboard mini */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="px-5 pt-5 pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Trust Leaderboard</h2>
              <p className="text-xs text-slate-400 mt-0.5">Top verified engineers this month</p>
            </div>
            <div className="px-5 py-3 space-y-3">
              {[
                { name: "Ananya G.", score: 97, avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=ananya" },
                { name: "Karan V.", score: 95, avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=karan" },
                { name: "Arya Mehta", score: 91, avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=arya", isYou: true },
                { name: "Meera D.", score: 88, avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=meera" },
              ].map((u, i) => (
                <div
                  key={u.name}
                  className={`flex items-center gap-3 py-2 px-3 rounded-xl ${u.isYou ? "bg-indigo-50 border border-indigo-200" : ""}`}
                >
                  <span className={`text-xs font-bold w-5 ${i === 0 ? "text-amber-500" : "text-slate-400"}`}>
                    #{i + 1}
                  </span>
                  <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full bg-slate-100" />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold ${u.isYou ? "text-indigo-700" : "text-slate-800"} truncate`}>
                      {u.name} {u.isYou && <span className="text-indigo-400">(You)</span>}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-700">{u.score}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}