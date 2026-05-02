import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  ChevronDown,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Shield,
  Sparkles,
  Sun,
  Users,
  X,
  Zap,
  Settings,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { USER as fallbackUser } from "../data/Dummydata";
import { cn } from "../lib/utils";

const NAV_LINKS = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/portfolio", label: "Portfolio", icon: BookOpen },
  { path: "/network", label: "Network", icon: Users },
  { path: "/sessions", label: "Sessions", icon: Shield },
  { path: "/about", label: "About", icon: Info },
];

const notifications = [
  { msg: "Priya validated your FinFlow proof", time: "2m ago", dot: "bg-cyan-400", glow: "rgba(0,245,255,0.3)" },
  { msg: "New review request from Rajan", time: "1h ago", dot: "bg-purple-400", glow: "rgba(124,58,237,0.3)" },
  { msg: "Python assessment score is live", time: "3h ago", dot: "bg-emerald-400", glow: "rgba(52,211,153,0.3)" },
];

export default function Navbar({ onVerify, onLogout, isDarkMode, toggleDarkMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(fallbackUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      if (stored) setUser({ ...fallbackUser, ...JSON.parse(stored) });
    } catch { /* ignore */ }
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    onLogout?.();
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-cyan-400/18 bg-slate-950/92 backdrop-blur-2xl shadow-[0_4px_40px_rgba(0,245,255,0.07)]"
          : "border-b border-white/6 bg-slate-950/65 backdrop-blur-xl"
      )}
    >
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.6), rgba(124,58,237,0.5), rgba(255,0,128,0.3), transparent)" }}
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3 group"
        >
          <div className="relative grid h-9 w-9 place-items-center rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #00c8ff, #7c3aed)",
              boxShadow: "0 0 20px rgba(0,200,255,0.35)"
            }}>
            <Zap size={16} className="text-white" />
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-black tracking-tight text-white text-base">
            Proof<span className="neon-text-cyan">Stack</span>
            <span className="text-purple-400">AI</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                type="button"
                onClick={() => navigate(path)}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                  active
                    ? "text-cyan-300"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={15} />
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-xl"
                    style={{
                      background: "rgba(0,245,255,0.09)",
                      border: "1px solid rgba(0,245,255,0.22)",
                      boxShadow: "0 0 18px rgba(0,245,255,0.12)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 38 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Verify Button */}
          <motion.button
            type="button"
            onClick={onVerify}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden items-center gap-2 rounded-full border border-cyan-400/28 bg-cyan-400/8 px-4 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400/16 hover:border-cyan-400/45 sm:flex"
            style={{ boxShadow: "0 0 18px rgba(0,245,255,0.12)" }}
          >
            <Sparkles size={13} />
            Verify Skill
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }}
              className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:bg-white/8 hover:text-white"
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-cyan-400 pulse-glow" />
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-12 w-80 premium-card p-0 overflow-hidden"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,245,255,0.06)" }}
                >
                  <div className="border-b border-white/8 px-4 py-3">
                    <p className="text-sm font-black text-white">Notifications</p>
                    <p className="text-xs text-slate-500 mt-0.5">{notifications.length} new alerts</p>
                  </div>
                  {notifications.map((n, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/3 transition cursor-pointer"
                    >
                      <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.dot)}
                        style={{ boxShadow: `0 0 8px ${n.glow}` }} />
                      <div>
                        <p className="text-sm text-slate-200 leading-snug">{n.msg}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
              className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-2.5 py-1.5 transition hover:bg-white/8 hover:border-cyan-400/20"
            >
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-7 w-7 rounded-lg object-cover"
                  style={{ border: "1.5px solid rgba(0,245,255,0.35)" }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400"
                  style={{ border: "1.5px solid #020617" }} />
              </div>
              <span className="hidden text-sm font-semibold text-slate-200 sm:block max-w-[100px] truncate">
                {user?.name?.split(" ")[0]}
              </span>
              <ChevronDown size={13} className="text-slate-500" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-12 w-60 premium-card p-2"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,245,255,0.06)" }}
                >
                  {/* Profile header */}
                  <div className="px-3 py-3 mb-1 flex items-center gap-3">
                    <img src={user?.avatar} alt={user?.name}
                      className="h-10 w-10 rounded-xl object-cover"
                      style={{ border: "1.5px solid rgba(0,245,255,0.3)" }} />
                    <div className="min-w-0">
                      <p className="text-sm font-black text-white truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email || "demo@proofstack.ai"}</p>
                    </div>
                  </div>
                  <div className="h-px mx-2 mb-2" style={{ background: "rgba(0,245,255,0.12)" }} />

                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/6 hover:text-white"
                  >
                    <User size={15} className="text-cyan-400" />
                    View Profile
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/6 hover:text-white"
                  >
                    <Settings size={15} className="text-purple-400" />
                    Settings
                  </button>

                  <div className="h-px mx-2 my-1" style={{ background: "rgba(255,255,255,0.06)" }} />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-400 transition hover:bg-rose-400/10"
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark mode toggle */}
          <motion.button
            type="button"
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:bg-white/8 hover:text-white"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:bg-white/8 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={17} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={17} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/8 bg-slate-950/96 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map(({ path, label, icon: Icon }, i) => {
                const active = location.pathname === path;
                return (
                  <motion.button
                    key={path}
                    type="button"
                    onClick={() => navigate(path)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                      active
                        ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/22"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon size={16} />
                    {label}
                  </motion.button>
                );
              })}
              <motion.button
                type="button"
                onClick={onVerify}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className="mt-2 flex items-center gap-2 rounded-xl border border-cyan-400/28 bg-cyan-400/8 px-4 py-3 text-sm font-bold text-cyan-300"
              >
                <Sparkles size={15} />
                Verify a Skill
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
