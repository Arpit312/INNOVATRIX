import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Award, Calendar, Code, ExternalLink, Eye, Github, Heart, Search, ShieldCheck, Star } from "lucide-react";
import { PageFrame, SectionHeader, GlassCard, HoloCard } from "../components/MotionPrimitives";
import { cn } from "../lib/utils";
import { pageMotion, revealMotion, stagger, viewport } from "../lib/motion";

const items = [
  { id: 1, title: "DeFi Payment Gateway", description: "Multi-chain payment router with stablecoin settlement, risk controls, and live transaction intelligence.", tech: ["React", "Solidity", "Node.js", "Web3.js", "MongoDB"], category: "fintech", status: "Live", github: "https://github.com/username/defi-gateway", demo: "https://defi-gateway.demo.com", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&h=620&fit=crop", stats: { stars: 45, views: 1200, likes: 89 }, date: "Mar 2024", featured: true, verified: true },
  { id: 2, title: "AI Essay Grader", description: "NLP evaluation engine that turns rubric logic into fast, explainable student feedback.", tech: ["Python", "PyTorch", "FastAPI", "Next.js", "PostgreSQL"], category: "ai", status: "Live", github: "https://github.com/username/ai-grader", demo: "https://ai-grader.edu", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&h=620&fit=crop", stats: { stars: 78, views: 2100, likes: 156 }, date: "Feb 2024", featured: true, verified: true },
  { id: 3, title: "Global CDN Router", description: "Latency-aware routing layer for global edge delivery with realtime observability.", tech: ["Go", "Rust", "Docker", "Kubernetes", "Redis"], category: "infrastructure", status: "In review", github: "https://github.com/username/cdn-router", demo: null, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=620&fit=crop", stats: { stars: 34, views: 890, likes: 67 }, date: "Jan 2024", featured: false, verified: false },
  { id: 4, title: "Sentiment Analysis Bot", description: "Realtime social sentiment tracker for market signals, trend shifts, and product feedback.", tech: ["Python", "TensorFlow", "FastAPI", "React", "TimescaleDB"], category: "ai", status: "Live", github: "https://github.com/username/sentiment-bot", demo: "https://sentiment-bot.crypto", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=620&fit=crop", stats: { stars: 92, views: 3200, likes: 203 }, date: "Dec 2023", featured: true, verified: true },
  { id: 5, title: "Smart Contract Audit Tool", description: "Automated Solidity analysis for vulnerability detection, gas flags, and best-practice checks.", tech: ["Solidity", "Python", "Web3.py", "Vue.js", "SQLite"], category: "fintech", status: "Live", github: "https://github.com/username/contract-audit", demo: "https://audit-tool.blockchain", image: "https://images.unsplash.com/photo-1639762681057-4085b5ad8e21?w=900&h=620&fit=crop", stats: { stars: 156, views: 4800, likes: 312 }, date: "Nov 2023", featured: true, verified: true },
  { id: 6, title: "Realtime Collaboration Platform", description: "Collaborative coding workspace with live editing, review queues, and deployment handoff.", tech: ["React", "Node.js", "Socket.io", "MongoDB", "Docker"], category: "productivity", status: "Live", github: "https://github.com/username/collab-platform", demo: "https://collab.dev", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=620&fit=crop", stats: { stars: 67, views: 1600, likes: 134 }, date: "Oct 2023", featured: false, verified: true },
];

const categories = [{ id: "all", label: "All" }, { id: "fintech", label: "FinTech" }, { id: "ai", label: "AI & NLP" }, { id: "infrastructure", label: "Infrastructure" }, { id: "productivity", label: "Productivity" }];

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const totals = useMemo(() => items.reduce((acc, item) => ({ stars: acc.stars + item.stats.stars, views: acc.views + item.stats.views, likes: acc.likes + item.stats.likes }), { stars: 0, views: 0, likes: 0 }), []);

  const filteredItems = useMemo(() => {
    const needle = searchTerm.toLowerCase();
    return items.filter((item) => {
      const matchFilter = filter === "all" || item.category === filter;
      const matchSearch = item.title.toLowerCase().includes(needle) || item.description.toLowerCase().includes(needle) || item.tech.some((t) => t.toLowerCase().includes(needle));
      return matchFilter && matchSearch;
    });
  }, [filter, searchTerm]);

  const featuredItems = items.filter((item) => item.featured);

  return (
    <PageFrame>
      <motion.div variants={pageMotion} initial="initial" animate="animate" className="space-y-8">
        <SectionHeader eyebrow="Portfolio" title="A verified body of work" description="Browse polished project cards with evidence status, live links, repository access, and proof signals."
          actions={<a href="#project-grid" className="button-primary">Explore Projects <ArrowUpRight size={15} /></a>}
        />

        <div className="grid gap-4 md:grid-cols-4">
          {[{ icon: Code, label: "Projects", value: items.length }, { icon: Star, label: "GitHub Stars", value: totals.stars }, { icon: Eye, label: "Views", value: totals.views.toLocaleString() }, { icon: Heart, label: "Likes", value: totals.likes }].map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              variants={revealMotion}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="premium-card p-5 relative overflow-hidden cursor-default"
            >
              <div className="scan-sweep" />
              <Icon className="text-cyan-400" size={22} />
              <p className="mt-4 text-3xl font-black text-white">{value}</p>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
            </motion.div>
          ))}
        </div>

        <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          <div className="mb-5 flex items-center gap-2">
            <Award className="text-amber-400" size={20} />
            <h2 className="text-xl font-black text-white">Featured Proofs</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {featuredItems.slice(0, 4).map((item) => <FeaturedCard key={item.id} item={item} />)}
          </div>
        </motion.section>

        <GlassCard id="project-grid" className="p-4" hover={false}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input type="text" placeholder="Search projects, skills, or proof domains..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="field pl-11" />
            </div>
            <div className="flex gap-1 overflow-x-auto rounded-2xl border border-white/8 bg-white/4 p-1">
              {categories.map((cat) => (
                <button key={cat.id} type="button" onClick={() => setFilter(cat.id)} className={cn("whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold transition", filter === cat.id ? "bg-cyan-400/15 text-cyan-300" : "text-slate-500 hover:text-white")}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => <ProjectTile key={item.id} item={item} />)}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <GlassCard className="p-12 text-center" hover={false}>
            <Search className="mx-auto text-slate-500" size={36} />
            <h3 className="mt-4 text-xl font-black text-white">No projects found</h3>
            <p className="mt-2 text-sm text-slate-400">Try a different category or search term.</p>
          </GlassCard>
        )}
      </motion.div>
    </PageFrame>
  );
}

function Badge({ children, tone }) {
  const classes = { emerald: "border-emerald-400/20 bg-emerald-400/8 text-emerald-300", cyan: "border-cyan-400/20 bg-cyan-400/8 text-cyan-300", amber: "border-amber-400/20 bg-amber-400/8 text-amber-300" };
  return <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-black backdrop-blur-xl", classes[tone])}>{children}</span>;
}

function TechRow({ tech }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tech.map((t) => <span key={t} className="rounded-lg border border-white/8 bg-white/5 px-2 py-0.5 text-xs font-bold text-slate-400">{t}</span>)}
    </div>
  );
}

function CardMeta({ item, compact = false }) {
  return (
    <div className={cn("flex items-center justify-between border-t border-white/8 text-xs font-bold text-slate-500", compact ? "mt-3 pt-3" : "mt-4 pt-4")}>
      <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" />{item.stats.stars}</span>
      <span className="flex items-center gap-1"><Eye size={12} />{item.stats.views}</span>
      <span className="flex items-center gap-1"><Calendar size={12} />{item.date}</span>
    </div>
  );
}

function CardLinks({ item }) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      <a href={item.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/8">
        <Github size={13} />Code
      </a>
      {item.demo ? (
        <a href={item.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl border border-cyan-400/20 bg-cyan-400/8 px-3 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400/15">
          <ExternalLink size={13} />Demo
        </a>
      ) : (
        <span className="flex items-center justify-center gap-1.5 rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-xs font-bold text-slate-500">
          <ShieldCheck size={13} />Review
        </span>
      )}
    </div>
  );
}

function FeaturedCard({ item }) {
  return (
    <HoloCard className="grid overflow-hidden p-0 md:grid-cols-[0.9fr_1fr] group">
      <div className="relative min-h-64 overflow-hidden">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-108" style={{ transform: "scale(1)" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/30" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge tone="emerald">{item.verified ? "Verified" : "Pending"}</Badge>
          <Badge tone={item.status === "Live" ? "cyan" : "amber"}>{item.status}</Badge>
        </div>
      </div>
      <div className="p-5">
        <p className="eyebrow mb-2">{item.category}</p>
        <h3 className="text-xl font-black text-white">{item.title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-400">{item.description}</p>
        <TechRow tech={item.tech.slice(0, 4)} />
        <CardMeta item={item} />
        <CardLinks item={item} />
      </div>
    </HoloCard>
  );
}

function ProjectTile({ item }) {
  return (
    <motion.article
      layout
      variants={revealMotion}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 12 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="premium-card overflow-hidden cursor-pointer group relative"
    >
      <div className="relative aspect-video overflow-hidden">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute left-3 top-3 flex gap-2">
          {item.verified && <Badge tone="emerald">Verified</Badge>}
          <Badge tone={item.status === "Live" ? "cyan" : "amber"}>{item.status}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black text-white">{item.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-400">{item.description}</p>
        <TechRow tech={item.tech.slice(0, 3)} />
        <CardMeta item={item} compact />
        <CardLinks item={item} />
      </div>
    </motion.article>
  );
}
