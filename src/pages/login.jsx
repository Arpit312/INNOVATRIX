import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  Mail,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
  Code2,
  TrendingUp,
  Globe,
  UserPlus,
} from "lucide-react";
import heroStack from "../assets/hero.png";
import { USER } from "../data/Dummydata";
import { itemMotion, pageMotion, revealMotion, stagger, viewport } from "../lib/motion";
import { cn } from "../lib/utils";
import { apiLogin, apiSignup } from "../lib/api";
import { GlassCard, TiltCard, CyberBadge, NeonDivider } from "../components/MotionPrimitives";

// Demo fallback users (used when backend is unreachable)
const MOCK_USERS = [
  { ...USER, email: "arya@example.com", password: "password123" },
  { ...USER, name: "Demo Builder", email: "demo@proofstack.ai", password: "proofstack", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=proofstack" },
];

const proofStats = [
  { label: "Trust Score", value: "91", icon: ShieldCheck, color: "text-cyan-400", glow: "rgba(0,245,255,0.2)" },
  { label: "Peer Reviews", value: "45", icon: Users, color: "text-purple-400", glow: "rgba(124,58,237,0.2)" },
  { label: "Verified Builds", value: "24", icon: CheckCircle2, color: "text-emerald-400", glow: "rgba(52,211,153,0.2)" },
];

const workflow = [
  {
    title: "Connect Evidence",
    text: "Link projects, repos, certificates, and proof artifacts into one unified profile.",
    icon: Code2,
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(0,245,255,0.15)",
  },
  {
    title: "Request Validation",
    text: "Invite peers to review proof and attach skill-specific signals to your work.",
    icon: Users,
    color: "from-purple-500 to-pink-600",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    title: "Share Trust",
    text: "Present a premium profile that hiring teams can scan and verify in seconds.",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(52,211,153,0.15)",
  },
];

const features = [
  "AI-assisted proof summaries",
  "Peer validation workflows",
  "Trust score analytics",
  "Career-ready portfolio view",
];

const ORBS = [
  { size: 400, x: "5%", y: "15%", color: "rgba(0,245,255,0.055)", delay: 0, duration: 8 },
  { size: 300, x: "70%", y: "55%", color: "rgba(124,58,237,0.07)", delay: 1.5, duration: 10 },
  { size: 200, x: "45%", y: "75%", color: "rgba(255,0,128,0.05)", delay: 3, duration: 7 },
  { size: 250, x: "85%", y: "10%", color: "rgba(0,200,255,0.05)", delay: 2, duration: 9 },
];

export default function LoginPage({ onLoginSuccess }) {
  const [tab, setTab] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "demo@proofstack.ai", password: "proofstack" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((c) => ({ ...c, [name]: value }));
    setError("");
  };

  const scrollToLogin = () => {
    document.getElementById("login-panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      setError("Enter an email and password to continue.");
      return;
    }
    if (tab === "signup" && !form.name.trim()) {
      setError("Enter your name to create an account.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      let userToStore;

      if (tab === "login") {
        // Try real backend first
        try {
          userToStore = await apiLogin(form.email.trim(), form.password);
        } catch (apiErr) {
          // Fallback to mock users when backend is offline
          const matched = MOCK_USERS.find(
            (u) => u.email === form.email.trim() && u.password === form.password
          );
          if (matched) {
            userToStore = matched;
          } else if (apiErr.message.includes("Invalid")) {
            throw apiErr; // Real auth failure — surface it
          } else {
            // Backend offline — accept any credentials in demo mode
            userToStore = {
              ...USER,
              name: form.email.split("@")[0] || "ProofStack User",
              email: form.email.trim(),
            };
          }
        }
      } else {
        // Signup
        try {
          const result = await apiSignup(form.name.trim(), form.email.trim(), form.password);
          userToStore = result.user ?? { ...USER, name: form.name.trim(), email: form.email.trim() };
        } catch (apiErr) {
          if (apiErr.message.includes("already exists")) throw apiErr;
          // Backend offline — create local demo account
          userToStore = { ...USER, name: form.name.trim(), email: form.email.trim() };
        }
      }

      localStorage.setItem("currentUser", JSON.stringify(userToStore));
      onLoginSuccess?.();
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div variants={pageMotion} initial="initial" animate="animate" exit="exit" className="min-h-screen overflow-hidden">
      {/* Ambient orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed rounded-full blur-3xl"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, background: orb.color }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: orb.duration, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }}
        />
      ))}

      <LandingNav onLoginClick={scrollToLogin} />

      {/* Hero Section */}
      <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={revealMotion}>
            <CyberBadge>
              <Sparkles size={13} />
              AI-native proof of work for modern talent
            </CyberBadge>
          </motion.div>

          <motion.div variants={revealMotion} className="space-y-5">
            <h1 className="max-w-4xl text-balance text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.05]">
              Turn real work into a{" "}
              <span className="anime-gradient-text">trusted AI skill profile.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-400">
              ProofStackAI transforms projects, peer reviews, and verification evidence into a polished trust layer for developers, learners, and teams.
            </p>
          </motion.div>

          <motion.div variants={revealMotion} className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={scrollToLogin} className="button-primary text-base px-7 py-3.5">
              Open Workspace
              <ArrowRight size={18} />
            </button>
            <a href="#proof-flow" className="button-secondary text-base px-7 py-3.5">
              <PlayCircle size={18} />
              See Proof Flow
            </a>
          </motion.div>

          <motion.div variants={revealMotion} className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {proofStats.map(({ label, value, icon: Icon, color, glow }) => (
              <motion.div
                key={label}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="rounded-2xl border border-white/10 bg-white/4 p-4 backdrop-blur-xl cursor-default"
                style={{ boxShadow: `0 4px 24px rgba(0,0,0,0.25), 0 0 20px ${glow}` }}
              >
                <Icon className={cn("mb-3", color)} size={22} />
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Auth Card */}
        <motion.div variants={itemMotion}>
          <TiltCard className="p-5 sm:p-6" intensity={8}>
            <div className="grid gap-5 lg:grid-cols-[0.82fr_1fr]">
              {/* Feature Panel */}
              <div className="flex min-h-72 flex-col justify-between rounded-2xl border border-white/8 bg-slate-950/60 p-5 relative overflow-hidden">
                <div className="scan-sweep" />
                <div>
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl"
                    style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.18), rgba(124,58,237,0.18))", border: "1px solid rgba(0,245,255,0.25)" }}>
                    <img src={heroStack} alt="ProofStackAI" className="h-10 w-10 object-contain" />
                  </div>
                  <p className="eyebrow mb-2">Live Trust Graph</p>
                  <h2 className="text-xl font-black text-white leading-tight">Evidence, review, and reputation in sync.</h2>
                </div>
                <div className="mt-5 space-y-2.5">
                  {features.map((f, i) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-300"
                    >
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      {f}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Auth Form */}
              <AuthForm
                tab={tab}
                setTab={setTab}
                form={form}
                error={error}
                isSubmitting={isSubmitting}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* Proof Flow Section */}
      <motion.section
        id="proof-flow"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8"
      >
        <NeonDivider className="mb-16" />

        <motion.div variants={revealMotion} className="mb-14 text-center">
          <p className="eyebrow mb-3">Story-Driven Verification</p>
          <h2 className="text-balance text-3xl font-black text-white sm:text-5xl">
            A smoother path from skill claim to{" "}
            <span className="gradient-text-purple">credible proof.</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-8 text-slate-400">
            Every section uses lightweight slide and fade motion, GPU-friendly transforms, and restrained interaction so the product feels premium without getting noisy.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {workflow.map((item, i) => (
            <motion.div
              key={item.title}
              variants={revealMotion}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              <GlassCard className="p-7 h-full group anime-card" hover={false}>
                <div className={cn("mb-5 grid place-items-center rounded-2xl bg-gradient-to-br text-white", item.color)}
                  style={{ boxShadow: `0 4px 24px rgba(0,0,0,0.35), 0 0 30px ${item.glow}`, width: 52, height: 52 }}>
                  <item.icon size={24} />
                </div>
                <div className="mb-3 text-xs font-black text-slate-500 uppercase tracking-widest">Step {i + 1}</div>
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div variants={revealMotion} className="mt-14 text-center">
          <button type="button" onClick={scrollToLogin} className="button-primary text-base px-9 py-4">
            <Zap size={18} />
            Start Building Your Profile
          </button>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}

function LandingNav({ onLoginClick }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-slate-950/75 backdrop-blur-2xl">
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.6), rgba(124,58,237,0.5), transparent)" }}
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative grid h-9 w-9 place-items-center rounded-xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #00c8ff, #7c3aed)", boxShadow: "0 0 20px rgba(0,200,255,0.4)" }}>
            <Fingerprint size={16} className="text-white" />
          </div>
          <span className="text-base font-black tracking-tight text-white">
            Proof<span className="neon-text-cyan">Stack</span>
            <span className="text-purple-400">AI</span>
          </span>
        </div>
        <div className="hidden items-center gap-6 text-sm font-semibold text-slate-400 sm:flex">
          <a href="#proof-flow" className="transition hover:text-cyan-300">Proof Flow</a>
          <a href="#login-panel" className="transition hover:text-cyan-300">Login</a>
        </div>
        <button type="button" onClick={onLoginClick} className="button-secondary px-5 py-2 text-sm">
          Sign In
        </button>
      </div>
    </header>
  );
}

function AuthForm({ tab, setTab, form, error, isSubmitting, onChange, onSubmit }) {
  return (
    <form
      id="login-panel"
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl sm:p-6 relative overflow-hidden"
      style={{ boxShadow: "inset 0 0 40px rgba(0,245,255,0.04)" }}
    >
      <div className="scan-sweep" />

      {/* Tab switcher */}
      <div className="mb-5 flex gap-1 rounded-xl border border-white/8 bg-white/4 p-1">
        {[["login", "Sign In"], ["signup", "Create Account"]].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "relative flex-1 rounded-lg py-2 text-xs font-black transition",
              tab === id ? "text-white" : "text-slate-500 hover:text-white"
            )}
          >
            {label}
            {tab === id && (
              <motion.span
                layoutId="auth-tab"
                className="absolute inset-0 -z-10 rounded-lg"
                style={{ background: "rgba(0,245,255,0.12)", border: "1px solid rgba(0,245,255,0.2)" }}
                transition={{ type: "spring", stiffness: 400, damping: 36 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="mb-5">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/22 bg-emerald-400/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">
          <Star size={12} />
          {tab === "login" ? "Workspace Access" : "Join ProofStackAI"}
        </div>
        <h2 className="text-2xl font-black text-white">
          {tab === "login" ? "Sign In Securely" : "Create Your Profile"}
        </h2>
        <p className="mt-1.5 text-sm leading-6 text-slate-400">
          {tab === "login"
            ? "Demo: demo@proofstack.ai / proofstack"
            : "Start building your verified skill profile."}
        </p>
      </div>

      <div className="grid gap-3">
        <AnimatePresence>
          {tab === "signup" && (
            <motion.label
              key="name-field"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="block overflow-hidden"
            >
              <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                <UserPlus size={13} />Name
              </span>
              <input
                className="field"
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your full name"
                autoComplete="name"
              />
            </motion.label>
          )}
        </AnimatePresence>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            <Mail size={13} />Email
          </span>
          <input
            className="field"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="demo@proofstack.ai"
            autoComplete="email"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            <KeyRound size={13} />Password
          </span>
          <input
            className="field"
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder={tab === "login" ? "proofstack" : "Create a password"}
            autoComplete={tab === "login" ? "current-password" : "new-password"}
          />
        </label>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-2xl border border-rose-400/22 bg-rose-400/8 px-4 py-3 text-sm font-semibold text-rose-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isSubmitting}
        className="button-primary mt-5 w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Sparkles size={16} />
            </motion.span>
            {tab === "login" ? "Opening workspace..." : "Creating account..."}
          </>
        ) : (
          <>
            {tab === "login" ? "Enter Dashboard" : "Create Account"}
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
        <Globe size={13} />
        {tab === "login" ? "Demo: demo@proofstack.ai / proofstack" : "Free forever · No credit card needed"}
      </div>
    </form>
  );
}
