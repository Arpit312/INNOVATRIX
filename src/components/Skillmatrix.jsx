import { motion } from "framer-motion";
import { CheckCircle2, Users, Link, Award, Plus } from "lucide-react";
import { SKILLS } from "../data/Dummydata";
import { revealMotion, stagger, viewport } from "../lib/motion";
import { cn } from "../lib/utils";

const SOURCE_META = {
  assessment: { label: "Assessment", icon: Award, color: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20" },
  peer: { label: "Peer Reviewed", icon: Users, color: "text-purple-300 bg-purple-400/10 border-purple-400/20" },
  project: { label: "Project Linked", icon: Link, color: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20" },
};

function SkillRow({ skill }) {
  const meta = SOURCE_META[skill.sourceType];
  const Icon = meta.icon;
  return (
    <motion.div variants={revealMotion} className="grid gap-3 rounded-2xl border border-white/8 bg-white/4 p-4 md:grid-cols-[200px_1fr_auto] md:items-center">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
          <span className="font-black text-white text-sm">{skill.name}</span>
        </div>
        <span className={cn("inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border", meta.color)}>
          <Icon size={10} />{meta.label}
        </span>
      </div>
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span>Proficiency</span>
          <span className="font-black text-white">{skill.level}%</span>
        </div>
        <div className="neon-progress">
          <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={viewport} transition={{ duration: 0.8, ease: "easeOut" }} className="neon-progress-fill" />
        </div>
      </div>
      <div className="text-right md:w-24">
        <p className="text-sm font-black text-white">{skill.endorsements}</p>
        <p className="text-xs text-slate-500">endorsements</p>
      </div>
    </motion.div>
  );
}

export default function SkillMatrix({ onVerify }) {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport} className="premium-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/8">
        <div>
          <p className="eyebrow mb-1">Capability Map</p>
          <h2 className="text-base font-black text-white">Skill Matrix</h2>
          <p className="text-xs text-slate-500 mt-0.5">All skills independently verified</p>
        </div>
        <button onClick={onVerify} className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/20 bg-cyan-400/8 px-3 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400/15">
          <Plus size={13} />Add Skill
        </button>
      </div>
      <div className="grid gap-3">
        {SKILLS.map((skill) => <SkillRow key={skill.id} skill={skill} />)}
      </div>
    </motion.div>
  );
}
