import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2, MapPin, MessageSquare, MoreHorizontal, Search,
  ShieldCheck, Star, TrendingUp, UserCheck, UserPlus, Users, X, Zap,
  Wifi, Activity,
} from "lucide-react";
import { PageFrame, GlassCard, CyberBadge, TiltCard } from "../components/MotionPrimitives";
import { cn } from "../lib/utils";
import { pageMotion, revealMotion, stagger, viewport } from "../lib/motion";

const initialConnections = [
  { id: 1, name: "Sarah Chen", title: "Senior Product Manager", company: "TechCorp Inc.", location: "San Francisco, CA", status: "connected", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=180&h=180&fit=crop&crop=face", trustScore: 94, mutualConnections: 12, lastActive: "2 hours ago", skills: ["Product Strategy", "Agile", "Research"], badges: ["Top Contributor", "Verified"] },
  { id: 2, name: "Alex Kumar", title: "Full Stack Developer", company: "StartupXYZ", location: "New York, NY", status: "pending", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&h=180&fit=crop&crop=face", trustScore: 87, mutualConnections: 8, lastActive: "1 day ago", skills: ["React", "Node.js", "Python"], badges: ["Rising Star"] },
  { id: 3, name: "Jordan Lee", title: "UX Designer", company: "DesignStudio", location: "Los Angeles, CA", status: "connected", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=180&h=180&fit=crop&crop=face", trustScore: 91, mutualConnections: 15, lastActive: "5 hours ago", skills: ["Design Systems", "Figma", "Research"], badges: ["Design Expert", "Verified"] },
  { id: 4, name: "Emma Wilson", title: "Data Scientist", company: "DataTech Solutions", location: "Seattle, WA", status: "connected", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=180&h=180&fit=crop&crop=face", trustScore: 96, mutualConnections: 22, lastActive: "30 minutes ago", skills: ["Machine Learning", "Python", "Statistics"], badges: ["AI Expert", "Top Rated", "Verified"] },
  { id: 5, name: "Marcus Johnson", title: "DevOps Engineer", company: "CloudSys", location: "Austin, TX", status: "connected", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=180&h=180&fit=crop&crop=face", trustScore: 89, mutualConnections: 6, lastActive: "3 days ago", skills: ["Kubernetes", "AWS", "CI/CD"], badges: ["Infrastructure Expert"] },
  { id: 6, name: "Priya Patel", title: "Frontend Developer", company: "WebFlow Agency", location: "Chicago, IL", status: "pending", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=180&h=180&fit=crop&crop=face", trustScore: 85, mutualConnections: 9, lastActive: "6 hours ago", skills: ["React", "TypeScript", "CSS"], badges: ["Frontend Specialist"] },
];

const tabs = [
  { id: "connections", label: "Connections" },
  { id: "pending", label: "Pending" },
  { id: "discover", label: "Discover" },
];

const STAT_COLORS = [
  { icon: Users, color: "text-cyan-400", border: "rgba(0,245,255,0.18)", glow: "rgba(0,245,255,0.1)" },
  { icon: UserPlus, color: "text-purple-400", border: "rgba(124,58,237,0.18)", glow: "rgba(124,58,237,0.1)" },
  { icon: MessageSquare, color: "text-blue-400", border: "rgba(59,130,246,0.18)", glow: "rgba(59,130,246,0.1)" },
  { icon: Star, color: "text-amber-400", border: "rgba(251,191,36,0.18)", glow: "rgba(251,191,36,0.1)" },
  { icon: TrendingUp, color: "text-emerald-400", border: "rgba(52,211,153,0.18)", glow: "rgba(52,211,153,0.1)" },
];

export default function Network() {
  const [connections, setConnections] = useState(initialConnections);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("connections");
  const [inviteSent, setInviteSent] = useState(false);

  const handleInvite = () => {
    setInviteSent(true);
    setTimeout(() => setInviteSent(false), 2500);
  };

  const activeConnections = connections.filter((p) => p.status === "connected");
  const pendingRequests = connections.filter((p) => p.status === "pending");

  const networkStats = {
    totalConnections: activeConnections.length,
    pendingRequests: pendingRequests.length,
    messages: 8,
    recommendations: 5,
    weeklyGrowth: 3,
    topSkills: ["React", "Python", "AWS", "UI/UX", "DevOps"],
  };

  const statRows = [
    { label: "Connections", value: networkStats.totalConnections },
    { label: "Pending", value: networkStats.pendingRequests },
    { label: "Messages", value: networkStats.messages },
    { label: "Recommendations", value: networkStats.recommendations },
    { label: "Weekly Growth", value: `+${networkStats.weeklyGrowth}` },
  ];

  const visibleConnections = useMemo(() => {
    const q = searchTerm.toLowerCase();
    const tabFiltered =
      activeTab === "pending" ? connections.filter((p) => p.status === "pending")
      : activeTab === "connections" ? connections.filter((p) => p.status === "connected")
      : connections;
    return tabFiltered.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q));
      const matchFilter =
        filter === "all" ||
        (filter === "connected" && p.status === "connected") ||
        (filter === "pending" && p.status === "pending");
      return matchSearch && matchFilter;
    });
  }, [activeTab, connections, filter, searchTerm]);

  const acceptRequest = (id) =>
    setConnections((c) => c.map((p) => (p.id === id ? { ...p, status: "connected" } : p)));
  const declineRequest = (id) =>
    setConnections((c) => c.filter((p) => p.id !== id));

  return (
    <PageFrame>
      <motion.div variants={pageMotion} initial="initial" animate="animate" className="space-y-8">

        {/* ── Hero Banner ── */}
        <TiltCard className="p-6 sm:p-8 relative overflow-hidden" intensity={4}>
          <div className="scan-sweep" />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: "rgba(0,245,255,0.06)" }} />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: "rgba(124,58,237,0.06)" }} />

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CyberBadge className="mb-4">
                <Wifi size={12} />
                Peer Validation Graph
              </CyberBadge>
              <h1 className="text-3xl font-black text-white sm:text-4xl">
                Trusted collaborators,{" "}
                <span className="gradient-text">mapped by proof.</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                Search, filter, and act on connection requests across your peer validation graph. Every connection is a trust signal.
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
              <motion.button
                type="button"
                onClick={handleInvite}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="button-primary"
              >
                <UserPlus size={15} />
                {inviteSent ? "Invite Sent ✓" : "Invite Reviewer"}
              </motion.button>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-glow" />
                {activeConnections.length} active connections
              </div>
            </div>
          </div>
        </TiltCard>

        {/* ── KPI Strip ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-4 md:grid-cols-5"
        >
          {statRows.map(({ label, value }, i) => {
            const { icon: Icon, color, border, glow } = STAT_COLORS[i];
            return (
              <motion.div
                key={label}
                variants={revealMotion}
                whileHover={{ y: -6, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="premium-card p-4 relative overflow-hidden cursor-default"
                style={{ borderColor: border, boxShadow: `0 0 24px ${glow}` }}
              >
                <div className="scan-sweep" />
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
                  style={{ background: `radial-gradient(ellipse at top, ${glow}, transparent 60%)` }} />
                <Icon className={color} size={18} />
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="mt-4 text-2xl font-black text-white"
                >
                  {value}
                </motion.p>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Top Skills Panel ── */}
        <motion.div
          variants={revealMotion}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          whileHover={{ scale: 1.005 }}
          className="premium-card p-5 relative overflow-hidden"
          style={{ boxShadow: "0 0 40px rgba(0,245,255,0.04)" }}
        >
          <div className="scan-sweep" />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow mb-1">Network Intelligence</p>
              <h2 className="text-base font-black text-white">Top Skills in Your Network</h2>
              <p className="mt-1 text-sm text-slate-400">Signals most often validated by your collaborators.</p>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-2"
            >
              {networkStats.topSkills.map((skill, i) => (
                <motion.div
                  key={skill}
                  variants={revealMotion}
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                >
                  <CyberBadge>{skill}</CyberBadge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── Search + Filter ── */}
        <GlassCard className="p-4" hover={false}>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                placeholder="Search collaborators, titles, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="field pl-11"
              />
            </div>
            <div className="flex gap-1 rounded-2xl border border-white/8 bg-white/4 p-1">
              {[
                ["all", "All"],
                ["connected", `Connected (${activeConnections.length})`],
                ["pending", `Pending (${pendingRequests.length})`],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  className={cn(
                    "relative whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold transition",
                    filter === id ? "text-white" : "text-slate-500 hover:text-white"
                  )}
                >
                  {label}
                  {filter === id && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-xl"
                      style={{ background: "rgba(0,245,255,0.12)", border: "1px solid rgba(0,245,255,0.2)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 36 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* ── Tab Bar ── */}
        <div className="flex gap-1 rounded-2xl border border-white/8 bg-white/4 p-1">
          {tabs.map((tab) => {
            const count =
              tab.id === "pending" ? pendingRequests.length
              : tab.id === "connections" ? activeConnections.length
              : connections.length;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex-1 rounded-xl px-4 py-2.5 text-sm font-black transition",
                  activeTab === tab.id ? "text-white" : "text-slate-500 hover:text-white"
                )}
              >
                {tab.label} ({count})
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="network-tab"
                    className="absolute inset-0 -z-10 rounded-xl"
                    style={{
                      background: "rgba(0,245,255,0.1)",
                      border: "1px solid rgba(0,245,255,0.2)",
                      boxShadow: "0 0 20px rgba(0,245,255,0.08)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 36 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Person Cards ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleConnections.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
                onAccept={acceptRequest}
                onDecline={declineRequest}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleConnections.length === 0 && (
          <motion.div
            variants={revealMotion}
            initial="hidden"
            animate="show"
            className="premium-card p-14 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-4 w-fit"
            >
              <Users className="text-slate-600" size={40} />
            </motion.div>
            <h3 className="mt-4 text-xl font-black text-white">No collaborators found</h3>
            <p className="mt-2 text-sm text-slate-400">Adjust your search, filter, or active tab.</p>
          </motion.div>
        )}

      </motion.div>
    </PageFrame>
  );
}

function PersonCard({ person, onAccept, onDecline }) {
  const trustColor =
    person.trustScore >= 90 ? "rgba(0,245,255,0.15)"
    : person.trustScore >= 80 ? "rgba(124,58,237,0.15)"
    : "rgba(251,191,36,0.12)";

  return (
    <motion.article
      layout
      variants={revealMotion}
      exit={{ opacity: 0, scale: 0.95, y: 12 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="premium-card p-5 cursor-pointer relative overflow-hidden group"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
        style={{ background: `radial-gradient(ellipse at top, ${trustColor}, transparent 60%)` }}
      />
      {/* Scan sweep on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="scan-sweep" />
      </div>

      {/* Avatar + Info */}
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <motion.img
            src={person.avatar}
            alt={person.name}
            whileHover={{ scale: 1.08 }}
            className="h-16 w-16 rounded-2xl object-cover"
            style={{ border: "1.5px solid rgba(0,245,255,0.25)", boxShadow: "0 0 18px rgba(0,245,255,0.12)" }}
          />
          {/* Online dot */}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-400"
            style={{ border: "2px solid #020617", boxShadow: "0 0 10px rgba(52,211,153,0.6)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </motion.span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-black text-white">{person.name}</h3>
            {person.badges.includes("Verified") && (
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            )}
          </div>
          <p className="truncate text-sm font-semibold text-slate-300">{person.title}</p>
          <p className="truncate text-xs text-slate-500">{person.company}</p>
          <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={11} />{person.location}
          </p>
        </div>
      </div>

      {/* Trust + Mutual */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="rounded-xl border border-cyan-400/18 bg-cyan-400/6 p-3"
        >
          <p className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Zap size={11} className="text-cyan-400" />Trust
          </p>
          <p className="mt-1.5 text-xl font-black text-white">{person.trustScore}</p>
          <div className="mt-1.5 neon-progress">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${person.trustScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="neon-progress-fill"
            />
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="rounded-xl border border-white/8 bg-white/4 p-3 text-right"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Mutual</p>
          <p className="mt-1.5 text-xl font-black text-white">{person.mutualConnections}</p>
          <p className="mt-1 text-xs text-slate-600">connections</p>
        </motion.div>
      </div>

      {/* Skills */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {person.skills.map((skill) => (
          <motion.span
            key={skill}
            whileHover={{ scale: 1.06, y: -1 }}
            className="rounded-lg border border-white/8 bg-white/4 px-2 py-0.5 text-xs font-bold text-slate-400 hover:border-cyan-400/22 hover:text-slate-300 transition cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>

      {/* Badges */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {person.badges.map((badge) => (
          <span
            key={badge}
            className="rounded-lg border border-amber-400/22 bg-amber-400/8 px-2 py-0.5 text-xs font-bold text-amber-300"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2 border-t border-white/8 pt-4">
        {person.status === "connected" ? (
          <>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="button-primary flex-1 rounded-xl px-3 py-2 text-xs"
            >
              <MessageSquare size={13} />Message
            </motion.button>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:bg-white/8 hover:text-white"
              aria-label="More"
            >
              <MoreHorizontal size={15} />
            </button>
          </>
        ) : (
          <>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onAccept(person.id)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-black text-white transition hover:bg-emerald-400"
              style={{ boxShadow: "0 0 18px rgba(52,211,153,0.35)" }}
            >
              <UserCheck size={13} />Accept
            </motion.button>
            <button
              type="button"
              onClick={() => onDecline(person.id)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-rose-400/22 bg-rose-400/8 text-rose-300 transition hover:bg-rose-400/18"
              aria-label="Decline"
            >
              <X size={15} />
            </button>
          </>
        )}
      </div>

      <p className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-600">
        <Activity size={10} />Active {person.lastActive}
      </p>
    </motion.article>
  );
}
