import { CheckCircle, Users, Link, Award } from "lucide-react";
import { SKILLS } from "../data/dummyData";

const SOURCE_META = {
  assessment: {
    label: "Passed Assessment",
    icon: Award,
    classes: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  peer: {
    label: "Peer Reviewed",
    icon: Users,
    classes: "bg-violet-50 text-violet-700 border-violet-200",
  },
  project: {
    label: "Project Linked",
    icon: Link,
    classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

function SkillRow({ skill }) {
  const meta = SOURCE_META[skill.sourceType];
  const Icon = meta.icon;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-4 border-b border-slate-100 last:border-0">
      {/* Skill name + source */}
      <div className="sm:w-48 flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle size={14} className="text-indigo-500 flex-shrink-0" />
          <span className="font-semibold text-slate-800 text-sm">{skill.name}</span>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${meta.classes}`}
        >
          <Icon size={10} />
          {meta.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>Proficiency</span>
          <span className="font-bold text-slate-700">{skill.level}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-700"
            style={{ width: `${skill.level}%` }}
          />
        </div>
      </div>

      {/* Endorsements */}
      <div className="sm:w-28 flex-shrink-0 text-right">
        <p className="text-sm font-bold text-slate-800">{skill.endorsements}</p>
        <p className="text-xs text-slate-400">endorsements</p>
      </div>
    </div>
  );
}

export default function SkillMatrix({ onVerify }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">Skill Matrix</h2>
          <p className="text-xs text-slate-400 mt-0.5">All skills are independently verified</p>
        </div>
        <button
          onClick={onVerify}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          + Add Skill
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 px-6 py-3 bg-slate-50/50 border-b border-slate-100">
        {Object.values(SOURCE_META).map((m) => {
          const Icon = m.icon;
          return (
            <span key={m.label} className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${m.classes}`}>
              <Icon size={11} />
              {m.label}
            </span>
          );
        })}
      </div>

      {/* Skill rows */}
      <div className="px-6 pb-2">
        {SKILLS.map((skill) => (
          <SkillRow key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}