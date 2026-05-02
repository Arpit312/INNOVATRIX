import { ExternalLink, Github, Users, CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";
import { revealMotion } from "../lib/motion";
import { cn } from "../lib/utils";

const CATEGORY_COLORS = {
  Fintech: "text-cyan-300 bg-cyan-400/8 border-cyan-400/22",
  EdTech: "text-blue-300 bg-blue-400/8 border-blue-400/22",
  Infrastructure: "text-purple-300 bg-purple-400/8 border-purple-400/22",
  "AI / NLP": "text-amber-300 bg-amber-400/8 border-amber-400/22",
};

const CATEGORY_GLOW = {
  Fintech: "rgba(0,245,255,0.12)",
  EdTech: "rgba(59,130,246,0.12)",
  Infrastructure: "rgba(124,58,237,0.12)",
  "AI / NLP": "rgba(251,191,36,0.12)",
};

export default function ProjectCard({ project }) {
  const { title, description, tags, githubUrl, liveUrl, validators, validationCount, category } = project;
  const glow = CATEGORY_GLOW[category] || "rgba(0,245,255,0.08)";

  return (
    <motion.div
      variants={revealMotion}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="premium-card p-5 flex flex-col gap-4 cursor-pointer relative overflow-hidden group"
      style={{ boxShadow: `0 0 30px ${glow}` }}
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
        style={{ background: `radial-gradient(ellipse at top right, ${glow}, transparent 60%)` }} />

      {/* Scan sweep on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="scan-sweep" />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className={cn("text-xs font-bold px-2.5 py-0.5 rounded-full border", CATEGORY_COLORS[category] || "text-slate-300 bg-white/5 border-white/10")}>
              {category}
            </span>
          </div>
          <h3 className="font-black text-white text-base leading-snug">{title}</h3>
        </div>
        <span className="inline-flex items-center gap-1 border border-emerald-400/22 bg-emerald-400/8 text-emerald-300 text-xs font-bold px-2 py-1 rounded-xl shrink-0"
          style={{ boxShadow: "0 0 10px rgba(52,211,153,0.15)" }}>
          <CheckCircle2 size={11} />Verified
        </span>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{description}</p>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="text-xs border border-white/8 bg-white/5 text-slate-400 px-2.5 py-1 rounded-lg font-medium hover:border-cyan-400/20 hover:text-slate-300 transition">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {validators.slice(0, 4).map((v, i) => (
            <motion.img
              key={i}
              src={v.avatar}
              alt={v.name}
              title={v.name}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              className="w-7 h-7 rounded-full bg-slate-800 transition"
              style={{ border: "2px solid #020617", zIndex: validators.length - i }}
            />
          ))}
          {validators.length > 4 && (
            <div className="w-7 h-7 rounded-full border-2 border-slate-950 bg-slate-700 flex items-center justify-center text-[10px] font-black text-slate-300">
              +{validators.length - 4}
            </div>
          )}
        </div>
        <span className="flex items-center gap-1 text-slate-500 text-xs">
          <Users size={11} />
          <span className="font-black text-slate-300">{validationCount}</span> validations
        </span>
      </div>

      <div className="flex gap-2 pt-1 border-t border-white/8 mt-auto">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-300 border border-white/8 bg-white/4 hover:bg-white/8 hover:border-white/15 rounded-xl px-3 py-2 transition"
          >
            <Star size={13} />GitHub
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-cyan-300 border border-cyan-400/22 bg-cyan-400/8 hover:bg-cyan-400/16 rounded-xl px-3 py-2 transition"
            style={{ boxShadow: "0 0 12px rgba(0,245,255,0.1)" }}
          >
            <ExternalLink size={13} />Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
