import { ExternalLink, Github, Users, CheckCircle } from "lucide-react";

const CATEGORY_COLORS = {
  Fintech: "bg-emerald-50 text-emerald-700 border-emerald-200",
  EdTech: "bg-sky-50 text-sky-700 border-sky-200",
  Infrastructure: "bg-violet-50 text-violet-700 border-violet-200",
  "AI / NLP": "bg-amber-50 text-amber-700 border-amber-200",
};

export default function ProjectCard({ project }) {
  const { title, description, tags, githubUrl, liveUrl, validators, validationCount, category } = project;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${
                CATEGORY_COLORS[category] || "bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              {category}
            </span>
          </div>
          <h3 className="font-bold text-slate-900 text-base leading-snug">{title}</h3>
        </div>
        <div className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-lg border border-green-200 flex-shrink-0">
          <CheckCircle size={11} />
          Verified
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* Peer Validators */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {validators.slice(0, 4).map((v, i) => (
            <img
              key={i}
              src={v.avatar}
              alt={v.name}
              title={v.name}
              className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 shadow-sm"
              style={{ zIndex: validators.length - i }}
            />
          ))}
          {validators.length > 4 && (
            <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
              +{validators.length - 4}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <Users size={12} />
          <span>
            <span className="font-semibold text-slate-700">{validationCount}</span> validations
          </span>
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-2 pt-1 border-t border-slate-100 mt-auto">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 transition-colors"
          >
            <Github size={13} />
            GitHub
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg px-3 py-2 transition-colors"
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}