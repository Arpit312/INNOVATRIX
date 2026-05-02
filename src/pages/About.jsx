import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Eye, GitBranch, ShieldCheck, Sparkles,
  Target, Users, Zap, Code2, Star, Globe, Cpu, Layers,
} from "lucide-react";
import { PageFrame, TiltCard, CyberBadge, NeonDivider, FeatureCard3D } from "../components/MotionPrimitives";
import { pageMotion, revealMotion, stagger, viewport } from "../lib/motion";

const principles = [
  { icon: Eye, title: "Vision", text: "Make every builder visible through proof of work, not polished claims alone.", color: "from-cyan-500 to-blue-600", glow: "rgba(0,245,255,0.15)" },
  { icon: Target, title: "Mission", text: "Connect projects, peer validation, and skill evidence into one credible identity.", color: "from-purple-500 to-pink-600", glow: "rgba(124,58,237,0.15)" },
  { icon: ShieldCheck, title: "Trust Layer", text: "Give teams a clear way to scan verified work, review history, and capability strength.", color: "from-emerald-500 to-teal-600", glow: "rgba(52,211,153,0.15)" },
];

const flow = [
  { label: "Build", icon: Code2, color: "text-cyan-400", border: "rgba(0,245,255,0.2)", glow: "rgba(0,245,255,0.12)" },
  { label: "Verify", icon: ShieldCheck, color: "text-purple-400", border: "rgba(124,58,237,0.2)", glow: "rgba(124,58,237,0.12)" },
  { label: "Connect", icon: Users, color: "text-pink-400", border: "rgba(255,0,128,0.2)", glow: "rgba(255,0,128,0.1)" },
  { label: "Grow", icon: Star, color: "text-amber-400", border: "rgba(251,191,36,0.2)", glow: "rgba(251,191,36,0.1)" },
];

const stats = [
  { value: "12K+", label: "Verified Builders", icon: Users, color: "text-cyan-400" },
  { value: "98%", label: "Accuracy Rate", icon: Cpu, color: "text-purple-400" },
  { value: "4.9★", label: "Trust Rating", icon: Star, color: "text-amber-400" },
  { value: "50+", label: "Partner Teams", icon: Globe, color: "text-emerald-400" },
];

const ORBS = [
  { size: 500, x: "-10%", y: "0%", color: "rgba(0,245,255,0.05)" },
  { size: 400, x: "70%", y: "30%", color: "rgba(124,58,237,0.06)" },
  { size: 300, x: "20%", y: "70%", color: "rgba(255,0,128,0.04)" },
];

function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-3xl font-black gradient-text"
    >
      {value}
    </motion.span>
  );
}

export default function About() {
  const navigate = useNavigate();
  return (
    <PageFrame>
      {/* Ambient orbs — absolute so they stay within this page only */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        {ORBS.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, background: orb.color }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div variants={pageMotion} initial="initial" animate="animate" className="space-y-10">

        {/* ── Hero TiltCard ── */}
        <TiltCard className="p-8 md:p-12 relative overflow-hidden" intensity={4}>
          <div className="scan-sweep" />
          {/* Corner glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: "rgba(0,245,255,0.07)" }} />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: "rgba(124,58,237,0.07)" }} />

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <CyberBadge className="mb-5">
                <Sparkles size={13} />
                About ProofStackAI
              </CyberBadge>
              <h1 className="text-balance text-4xl font-black tracking-tight text-white sm:text-6xl leading-tight">
                Proof-first profiles for{" "}
                <span className="gradient-text">serious builders.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400">
                ProofStackAI helps learners, developers, reviewers, and teams turn real work into a living skill identity with verified projects, trust scores, and collaboration signals.
              </p>

              {/* Animated flow pills */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="mt-8 flex flex-wrap gap-3"
              >
                {flow.map(({ label, icon: Icon, color, border, glow }, i) => (
                  <motion.span
                    key={label}
                    variants={revealMotion}
                    whileHover={{ y: -4, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-black text-slate-100 cursor-default"
                    style={{ borderColor: border, boxShadow: `0 0 18px ${glow}`, background: `${glow.replace("0.12", "0.06")}` }}
                  >
                    <Icon size={15} className={color} />
                    {label}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Principle cards */}
            <div className="grid gap-4">
              {principles.map(({ icon: Icon, title, text, color, glow }, i) => (
                <motion.div
                  key={title}
                  variants={revealMotion}
                  whileHover={{ x: 6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className="premium-card p-5 relative overflow-hidden group"
                  style={{ boxShadow: `0 0 20px ${glow}` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
                    style={{ background: `radial-gradient(ellipse at left, ${glow}, transparent 60%)` }} />
                  <div className={`mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-white ${color}`}
                    style={{ boxShadow: `0 4px 16px ${glow}` }}>
                    <Icon size={20} />
                  </div>
                  <h2 className="text-lg font-black text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* ── Animated Stats ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-4 grid-cols-2 md:grid-cols-4"
        >
          {stats.map(({ value, label, icon: Icon, color }) => (
            <motion.div
              key={label}
              variants={revealMotion}
              whileHover={{ y: -8, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="premium-card p-6 text-center relative overflow-hidden group cursor-default"
            >
              <div className="scan-sweep" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
                style={{ background: "radial-gradient(ellipse at top, rgba(0,245,255,0.06), transparent 60%)" }} />
              <Icon className={`mx-auto mb-3 ${color}`} size={22} />
              <AnimatedCounter value={value} />
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        <NeonDivider />

        {/* ── Feature Cards 3D ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-5 md:grid-cols-3"
        >
          {[
            { icon: ShieldCheck, title: "Verified Identity", text: "One profile for projects, proof artifacts, endorsements, and trust score.", color: "cyan" },
            { icon: Users, title: "Peer Validation", text: "Skill claims become stronger when collaborators confirm the work.", color: "purple" },
            { icon: GitBranch, title: "Career Signal", text: "Proof cards are designed for fast scanning by teams, mentors, and hiring partners.", color: "pink" },
          ].map(({ icon, title, text, color }) => (
            <FeatureCard3D key={title} icon={icon} title={title} description={text} color={color} />
          ))}
        </motion.section>

        {/* ── Operating Principle ── */}
        <motion.div
          variants={revealMotion}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          className="premium-card p-6 md:p-10 relative overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(52,211,153,0.06)" }}
        >
          <div className="scan-sweep" />
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: "rgba(52,211,153,0.06)" }} />

          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="eyebrow mb-3">Operating Principle</p>
              <h2 className="text-3xl font-black text-white sm:text-4xl">High signal, low friction.</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
                The interface is intentionally quiet: clear hierarchy, restrained animation, GPU-friendly transforms, and readable data surfaces. Every interaction is purposeful. Every proof is real.
              </p>
              <motion.div
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-300 cursor-pointer"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              >
                Read our manifesto <ArrowRight size={15} />
              </motion.div>
            </div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-24 w-24 place-items-center rounded-3xl border border-emerald-400/22 bg-emerald-400/8 text-emerald-300 shrink-0"
              style={{ boxShadow: "0 0 30px rgba(52,211,153,0.2)" }}
            >
              <Zap size={36} />
            </motion.div>
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          variants={revealMotion}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-center py-8"
        >
          <p className="eyebrow mb-4">Ready to prove your skills?</p>
          <h2 className="text-3xl font-black text-white mb-6">
            Join <span className="gradient-text">12,000+ builders</span> on ProofStackAI
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              type="button"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="button-primary px-8 py-4 text-base"
            >
              <Layers size={18} />
              Start Building
            </motion.button>
            <motion.button
              type="button"
              onClick={() => navigate("/network")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="button-secondary px-8 py-4 text-base"
            >
              <Globe size={18} />
              Explore Network
            </motion.button>
          </div>
        </motion.div>

      </motion.div>
    </PageFrame>
  );
}
