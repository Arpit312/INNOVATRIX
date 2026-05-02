import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, ArrowRight, Award, Briefcase, Camera, CheckCircle2,
  Clock, Code2, Github, LayoutGrid, List, Mail, MapPin,
  PanelRightClose, PanelRightOpen, ShieldCheck, Sparkles,
  Star, TrendingUp, Upload, X, Zap, Users,
} from "lucide-react";
import { PageFrame, SectionHeader, GlassCard, TiltCard, CyberBadge, AuraAvatar, AnimeRevealSection } from "../components/MotionPrimitives";
import { USER as fallbackUser } from "../data/Dummydata";
import { itemMotion, pageMotion, revealMotion, stagger, viewport } from "../lib/motion";
import { cn } from "../lib/utils";

const PROJECTS = [
  { id: 1, title: "DeFi Payment Gateway", category: "Fintech", desc: "Multi-chain stablecoin payment router with fraud checks and settlement analytics.", tech: ["React", "Solidity", "Node.js"], verified: true, peers: 4, date: "Mar 2024", score: 96, color: "from-cyan-500 to-blue-600" },
  { id: 2, title: "AI Essay Grader", category: "EdTech", desc: "NLP feedback engine for structured writing assessment and rubric mapping.", tech: ["Python", "PyTorch", "FastAPI"], verified: true, peers: 12, date: "Feb 2024", score: 92, color: "from-purple-500 to-pink-600" },
  { id: 3, title: "Global CDN Router", category: "Infrastructure", desc: "Edge routing service with latency-aware cache selection and observability.", tech: ["Go", "Rust", "Docker"], verified: false, peers: 0, date: "Jan 2024", score: 74, color: "from-slate-500 to-slate-700" },
  { id: 4, title: "Sentiment Analysis Bot", category: "AI / NLP", desc: "Realtime sentiment monitor for social signals, market events, and product feedback.", tech: ["Python", "TensorFlow", "React"], verified: true, peers: 3, date: "Dec 2023", score: 89, color: "from-violet-500 to-fuchsia-600" },
];

const SKILLS = [
  { name: "React / Next.js", level: 92, source: "Project linked", verified: true },
  { name: "Node.js & Express", level: 88, source: "Peer reviewed", verified: true },
  { name: "Python / AI", level: 75, source: "Assessment", verified: true },
  { name: "Go (Golang)", level: 60, source: "Needs review", verified: false },
  { name: "AWS Infrastructure", level: 82, source: "Project linked", verified: true },
];

const ACTIVITY = [
  { text: "Ananya verified your DeFi Gateway commit", time: "2h ago", icon: CheckCircle2, color: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20" },
  { text: "Earned Top 10% React Developer badge", time: "1d ago", icon: Award, color: "text-amber-300 bg-amber-400/10 border-amber-400/20" },
  { text: "You reviewed a pull request for Karan", time: "2d ago", icon: Code2, color: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20" },
];

const FILTERS = ["All", "Fintech", "EdTech", "Infrastructure", "AI / NLP"];

export default function Dashboard({ onVerify }) {
  const [filter, setFilter] = useState("All");
  const [gridView, setGridView] = useState(true);
  const [rightRailCollapsed, setRightRailCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(fallbackUser);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      if (stored) setUser({ ...fallbackUser, ...JSON.parse(stored) });
    } catch (e) { console.error(e); }
  }, []);

  const filteredProjects = useMemo(() => {
    return filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <PageFrame className="pb-12">
      <motion.div variants={pageMotion} initial="initial" animate="animate" className="space-y-8">
        <HeroPanel user={user} onVerify={onVerify} onProfileOpen={() => setProfileOpen(true)} />
        <div className={cn("grid gap-6 transition-all duration-300 lg:items-start", rightRailCollapsed ? "lg:grid-cols-[minmax(0,1fr)_80px]" : "lg:grid-cols-[minmax(0,1fr)_340px]")}>
          <div className="min-w-0 space-y-8">
            <KpiStrip />
            <ProjectBoard filter={filter} filters={FILTERS} gridView={gridView} projects={filteredProjects} onFilter={setFilter} onGridView={setGridView} />
            <SkillMatrix onVerify={onVerify} />
          </div>
          <RightRail collapsed={rightRailCollapsed} onCollapse={() => setRightRailCollapsed((v) => !v)} onVerify={onVerify} user={user} />
        </div>
      </motion.div>
      <ProfileDrawer user={user} isOpen={profileOpen} onClose={() => setProfileOpen(false)} onUserUpdate={setUser} onVerify={onVerify} />
    </PageFrame>
  );
}

function HeroPanel({ user, onVerify, onProfileOpen }) {
  return (
    <TiltCard className="p-6 sm:p-8 relative overflow-hidden" intensity={5}>
      {/* Scan sweep */}
      <div className="scan-sweep" />
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(0,245,255,0.06)" }} />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(124,58,237,0.06)" }} />

      <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <AuraAvatar
              src={user?.avatar}
              alt={user?.name}
              size="h-24 w-24"
              onClick={onProfileOpen}
            />
          <div className="min-w-0">
            <CyberBadge className="mb-3">
              <ShieldCheck size={12} />
              Verified Builder Profile
            </CyberBadge>
            <h1 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl anime-hero-in">{user?.name || "ProofStack User"}</h1>
            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-400">Senior full-stack engineer with verified project evidence, peer-backed skill signals, and a reputation profile designed for fast review.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[{ icon: Github, label: "1.2k commits" }, { icon: CheckCircle2, label: "45 peer reviews" }, { icon: MapPin, label: user?.location || "India" }].map(({ icon: Icon, label }) => (
                <motion.span
                  key={label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 cursor-default"
                >
                  <Icon size={13} className="text-cyan-400" />{label}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-5 relative overflow-hidden anime-card anime-pulse-border"
          style={{ background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.18)" }}>
          <div className="scan-sweep" />
          <p className="eyebrow mb-1">Trust Score</p>
          <div className="mt-3 flex items-end gap-2">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl font-black anime-gradient-text"
            >
              {user?.trustScore || 91}
            </motion.span>
            <span className="pb-2 text-sm font-bold text-slate-500">/100</span>
          </div>
          <div className="mt-4 neon-progress">
            <motion.div initial={{ width: 0 }} animate={{ width: `${user?.trustScore || 91}%` }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }} className="neon-progress-fill" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[{ v: "12", l: "Projects" }, { v: "48", l: "Validators" }, { v: "6", l: "Skills" }].map(({ v, l }) => (
              <motion.div key={l} whileHover={{ scale: 1.05 }} className="rounded-xl border border-white/8 bg-white/4 py-2 cursor-default">
                <p className="text-lg font-black text-white">{v}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{l}</p>
              </motion.div>
            ))}
          </div>
          <button type="button" onClick={onVerify} className="button-primary mt-4 w-full">
            <Sparkles size={15} /> Verify a Skill
          </button>
        </div>
      </div>
    </TiltCard>
  );
}

function KpiStrip() {
  const stats = [
    { label: "Verified Projects", value: "12", icon: Briefcase, color: "text-cyan-400", glow: "rgba(0,245,255,0.12)", border: "rgba(0,245,255,0.18)" },
    { label: "Skill Coverage", value: "86%", icon: Activity, color: "text-emerald-400", glow: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.18)" },
    { label: "Review Velocity", value: "+18%", icon: TrendingUp, color: "text-purple-400", glow: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.18)" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map(({ label, value, icon: Icon, color, glow, border }, i) => (
        <motion.div
          key={label}
          variants={revealMotion}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="premium-card p-5 relative overflow-hidden cursor-default"
          style={{ borderColor: border, boxShadow: `0 0 30px ${glow}` }}
        >
          <div className="scan-sweep" />
          <Icon className={color} size={24} />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="mt-5 text-3xl font-black text-white"
          >
            {value}
          </motion.p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectBoard({ filter, filters, gridView, projects, onFilter, onGridView }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
      <SectionHeader eyebrow="Project Portfolio" title="Proof-backed builds" description={`${PROJECTS.length} projects mapped to live evidence, collaborators, and skill claims.`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap rounded-2xl border border-white/10 bg-white/5 p-1">
              {filters.map((item) => (
                <button key={item} type="button" onClick={() => onFilter(item)} className={cn("rounded-xl px-3 py-2 text-xs font-bold transition", filter === item ? "bg-cyan-400/15 text-cyan-300" : "text-slate-500 hover:text-white")}>
                  {item}
                </button>
              ))}
            </div>
            <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-1 sm:flex">
              <button type="button" onClick={() => onGridView(true)} className={cn("grid h-9 w-9 place-items-center rounded-xl transition", gridView ? "bg-white/12 text-white" : "text-slate-500 hover:text-white")} aria-label="Grid view"><LayoutGrid size={16} /></button>
              <button type="button" onClick={() => onGridView(false)} className={cn("grid h-9 w-9 place-items-center rounded-xl transition", !gridView ? "bg-white/12 text-white" : "text-slate-500 hover:text-white")} aria-label="List view"><List size={16} /></button>
            </div>
          </div>
        }
      />
      <div className={cn(gridView ? "grid gap-4 md:grid-cols-2" : "grid gap-3")}>
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} gridView={gridView} />
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function ProjectCard({ project, gridView }) {
  return (
    <motion.article
      layout
      variants={revealMotion}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 12 }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className={cn("premium-card p-5 cursor-pointer relative overflow-hidden group", !gridView && "grid gap-4 sm:grid-cols-[4rem_1fr_auto] sm:items-center")}
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
        style={{ background: "radial-gradient(ellipse at top right, rgba(0,245,255,0.06), transparent 60%)" }} />
      <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="scan-sweep" />
      </div>

      <div className={cn("rounded-2xl bg-gradient-to-br shadow-lg relative overflow-hidden", gridView ? "mb-4 h-20" : "h-14 w-14 shrink-0", project.color)}>
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          style={{ skewX: "-20deg" }}
        />
      </div>
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-cyan-400/22 bg-cyan-400/8 px-2.5 py-0.5 text-xs font-bold text-cyan-300">{project.category}</span>
          {project.verified ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/22 bg-emerald-400/8 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
              <CheckCircle2 size={11} />Verified
            </span>
          ) : (
            <span className="rounded-full border border-amber-400/22 bg-amber-400/8 px-2.5 py-0.5 text-xs font-bold text-amber-300">Pending</span>
          )}
        </div>
        <h3 className="text-lg font-black text-white">{project.title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-slate-400">{project.desc}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="rounded-lg border border-white/8 bg-white/5 px-2 py-0.5 text-xs font-bold text-slate-400 hover:border-cyan-400/20 hover:text-slate-300 transition">{t}</span>
          ))}
        </div>
      </div>
      <div className={cn("flex items-center justify-between border-t border-white/8 pt-3 text-xs font-bold text-slate-500 mt-3", !gridView && "sm:mt-0 sm:block sm:border-t-0 sm:pt-0 sm:text-right")}>
        <span className="inline-flex items-center gap-1"><Clock size={12} />{project.date}</span>
        <span className={cn("inline-flex items-center gap-1", !gridView && "mt-1.5")}>
          <ShieldCheck size={12} className="text-cyan-400" />{project.peers} peers
        </span>
      </div>
    </motion.article>
  );
}

function SkillMatrix({ onVerify }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
      <SectionHeader
        eyebrow="Skill Matrix"
        title="Validated capability map"
        description="Skills organized by evidence source, endorsement strength, and verification status."
        actions={<button type="button" onClick={onVerify} className="button-secondary"><Upload size={15} />Add Evidence</button>}
      />
      <GlassCard className="p-5 sm:p-6" hover={false}>
        <div className="grid gap-3">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={revealMotion}
              whileHover={{ x: 4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="grid gap-3 rounded-2xl border border-white/8 bg-white/4 p-4 md:grid-cols-[200px_1fr_auto] md:items-center relative overflow-hidden group cursor-default"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[inherit]"
                style={{ background: skill.verified ? "radial-gradient(ellipse at left, rgba(0,245,255,0.05), transparent 60%)" : "radial-gradient(ellipse at left, rgba(251,191,36,0.04), transparent 60%)" }} />

              <div>
                <div className="flex items-center gap-2">
                  <p className="font-black text-white">{skill.name}</p>
                  {skill.verified
                    ? <CheckCircle2 size={14} className="text-emerald-400" />
                    : <span className="text-xs text-amber-400">⚠</span>
                  }
                </div>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{skill.source}</p>
              </div>

              <div className="neon-progress">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={viewport}
                  transition={{ duration: 1, ease: "easeOut", delay: i * 0.08 }}
                  className="neon-progress-fill"
                  style={skill.verified ? {} : { background: "#64748b", boxShadow: "none" }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewport}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={cn("text-right text-sm font-black md:w-12", skill.verified ? "text-white" : "text-slate-500")}
              >
                {skill.level}%
              </motion.p>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.section>
  );
}

function RightRail({ collapsed, onCollapse, onVerify, user }) {
  if (collapsed) {
    return (
      <aside className="sticky top-24 hidden lg:block">
        <GlassCard className="flex flex-col items-center gap-3 p-3" hover={false}>
          <button type="button" onClick={onCollapse} className="grid h-10 w-10 place-items-center rounded-xl text-slate-300 transition hover:text-cyan-300" aria-label="Expand panel"><PanelRightOpen size={18} /></button>
          {[Sparkles, Activity, Star, Award].map((Icon, i) => (
            <button key={i} type="button" onClick={i === 0 ? onVerify : undefined} className="grid h-10 w-10 place-items-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-300"><Icon size={16} /></button>
          ))}
        </GlassCard>
      </aside>
    );
  }

  return (
    <aside className="sticky top-24 space-y-4">
      <GlassCard className="p-5" hover={false}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="eyebrow mb-1">Signal Center</p>
            <h2 className="text-lg font-black text-white">Right Panel</h2>
          </div>
          <button type="button" onClick={onCollapse} className="grid h-9 w-9 place-items-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:text-white" aria-label="Collapse panel"><PanelRightClose size={16} /></button>
        </div>
        <button type="button" onClick={onVerify} className="button-primary w-full text-sm">
          <Zap size={14} /> Boost Trust Score
        </button>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[{ l: "Rank", v: "Top 3%" }, { l: "Velocity", v: "+18%" }].map(({ l, v }) => (
            <div key={l} className="rounded-xl border border-white/8 bg-white/4 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{l}</p>
              <p className="mt-1.5 text-base font-black text-white">{v}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-5" hover={false}>
        <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-slate-400">Recent Activity</h3>
        <div className="space-y-3">
          {ACTIVITY.map(({ text, time, icon: Icon, color }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 3 }}
              className="flex gap-3 cursor-default"
            >
              <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-xl border", color)}>
                <Icon size={14} />
              </span>
              <div>
                <p className="text-xs font-semibold leading-5 text-slate-200">{text}</p>
                <p className="mt-0.5 text-xs text-slate-500">{time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-5" hover={false}>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-400">
          <Star className="fill-amber-400 text-amber-400" size={15} />Leaderboard
        </h3>
        <div className="space-y-2">
          {[
            { name: "Ananya G.", score: 97, avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=ananya" },
            { name: "Karan V.", score: 95, avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=karan" },
            { name: user?.name || "You", score: user?.trustScore || 91, avatar: user?.avatar, you: true },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              whileHover={{ x: 3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className={cn("flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/4 p-2.5 cursor-default", item.you && "border-cyan-400/22 bg-cyan-400/6")}
              style={item.you ? { boxShadow: "0 0 15px rgba(0,245,255,0.08)" } : {}}
            >
              <span className={cn("w-5 text-center text-xs font-black", i === 0 ? "text-amber-400" : "text-slate-500")}>
                #{i + 1}
              </span>
              <img src={item.avatar} alt={item.name} className="h-8 w-8 rounded-lg bg-slate-800" />
              <p className="min-w-0 flex-1 truncate text-xs font-bold text-slate-200">{item.name}</p>
              <span className={cn("rounded-lg px-2 py-0.5 text-xs font-black", item.you ? "bg-cyan-400/15 text-cyan-300" : "bg-white/8 text-white")}>
                {item.score}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </aside>
  );
}

function ProfileDrawer({ user, isOpen, onClose, onUserUpdate, onVerify }) {
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...user, avatar: reader.result };
      localStorage.setItem("currentUser", JSON.stringify(updated));
      onUserUpdate(updated);
    };
    reader.readAsDataURL(file);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 280, damping: 32 }} className="fixed right-0 top-0 z-[70] h-full w-full max-w-md overflow-y-auto border-l border-cyan-400/15 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)" }} />
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow mb-1">Public Proof Card</p>
                <h2 className="text-2xl font-black text-white">Profile Signal</h2>
              </div>
              <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:text-white" aria-label="Close"><X size={18} /></button>
            </div>
            <div className="mt-6 rounded-2xl border border-cyan-400/15 bg-cyan-400/4 p-5">
              <label className="group flex cursor-pointer items-center gap-4">
                <img src={user?.avatar} alt={user?.name} className="h-20 w-20 rounded-2xl object-cover transition group-hover:scale-105" style={{ border: "2px solid rgba(0,245,255,0.3)" }} />
                <span>
                  <span className="block text-xl font-black text-white">{user?.name}</span>
                  <span className="mt-1 block text-sm text-slate-500">{user?.email || "arya@example.com"}</span>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-3 py-1 text-xs font-bold text-cyan-300"><ShieldCheck size={12} />Trust {user?.trustScore || 91}/100</span>
                </span>
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="sr-only" />
              </label>
            </div>
            <div className="mt-4 grid gap-2">
              {[
                { icon: Briefcase, label: "Role", value: user?.title || "Full-Stack Engineer" },
                { icon: MapPin, label: "Location", value: user?.location || "India" },
                { icon: Github, label: "Commits", value: "1.2k verified commits" },
                { icon: Mail, label: "Email", value: user?.email || "arya@example.com" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-3.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/15 bg-cyan-400/8 text-cyan-300"><Icon size={16} /></span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
                    <span className="mt-0.5 block text-sm font-bold text-slate-200">{value}</span>
                  </span>
                </div>
              ))}
            </div>
            <button type="button" onClick={onVerify} className="button-primary mt-5 w-full">
              <ArrowRight size={15} /> Verify More Skills
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
