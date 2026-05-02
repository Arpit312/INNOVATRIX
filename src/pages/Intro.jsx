import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Shield, Brain, Sparkles } from "lucide-react";

const TYPING_TEXTS = [
  "Welcome to ProofStackAI",
  "Build. Verify. Prove.",
  "Your Skills. Trusted.",
];

// Stable particle data — computed once, never changes between renders
const PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const rng = (seed) => {
    let x = Math.sin(seed + i * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };
  return {
    id: i,
    x: rng(1) * 100,
    y: rng(2) * 100,
    size: rng(3) * 4 + 1.5,
    duration: rng(4) * 6 + 5,
    delay: rng(5) * 4,
    dx: (rng(6) - 0.5) * 40,   // stable x drift
    dx2: (rng(7) - 0.5) * 60,  // stable x drift 2
    color: ["rgba(0,245,255,0.7)", "rgba(124,58,237,0.7)", "rgba(255,0,128,0.6)", "rgba(0,200,255,0.6)"][Math.floor(rng(8) * 4)],
  };
});

const FEATURES = [
  { icon: Shield, label: "Verified Proof", color: "text-cyan-400", glow: "rgba(0,245,255,0.3)" },
  { icon: Brain, label: "AI Mentor", color: "text-purple-400", glow: "rgba(124,58,237,0.3)" },
  { icon: Sparkles, label: "Trust Score", color: "text-pink-400", glow: "rgba(255,0,128,0.3)" },
];

export default function Intro({ onEnter }) {
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const effectRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [entering, setEntering] = useState(false);

  // Vanta GLOBE background
  useEffect(() => {
    if (!vantaRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mounted = true;
    Promise.all([
      import("vanta/dist/vanta.globe.min"),
      import("three"),
    ]).then(([module, THREE]) => {
      if (!mounted || !vantaRef.current) return;
      const Effect = module.default || module;
      effectRef.current = Effect({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1.2,
        color: 0x00f5ff,
        color2: 0x7c3aed,
        backgroundColor: 0x020617,
        size: 1.2,
        speed: 0.6,
      });
    }).catch(() => {});

    return () => {
      mounted = false;
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  // Typing animation
  useEffect(() => {
    const current = TYPING_TEXTS[textIndex];
    const speed = isDeleting ? 38 : 72;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = charIndex + 1;
        setTypedText(current.slice(0, next));
        if (next >= current.length) {
          // Pause at full text, then start deleting
          setTimeout(() => setIsDeleting(true), 1800);
        } else {
          setCharIndex(next);
        }
      } else {
        const next = charIndex - 1;
        if (next <= 0) {
          // Done deleting — move to next phrase
          setTypedText("");
          setIsDeleting(false);
          setTextIndex((i) => (i + 1) % TYPING_TEXTS.length);
          setCharIndex(0);
        } else {
          setTypedText(current.slice(0, next));
          setCharIndex(next);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  const handleEnter = () => {
    setEntering(true);
    setTimeout(() => {
      onEnter?.();
      navigate("/login");
    }, 900);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] flex flex-col items-center justify-center">
      {/* Vanta Globe Background */}
      <div ref={vantaRef} className="absolute inset-0 -z-10" />

      {/* Overlay gradients */}
      <div className="absolute inset-0 -z-5 intro-overlay pointer-events-none" />

      {/* Scanlines */}
      <div className="scanlines pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
            animate={{
              y: [0, -80, -160],
              x: [0, p.dx, p.dx2],
              opacity: [0, 0.9, 0],
              scale: [0.5, 1.2, 0.3],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Energy rings around center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[600px] h-[600px]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-cyan-400/20"
              animate={{ scale: [0.6, 2.5], opacity: [0.6, 0] }}
              transition={{
                duration: 3.5,
                delay: i * 1.15,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
      >
        {/* Logo badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-400/30 bg-cyan-400/8 backdrop-blur-xl"
            style={{ boxShadow: "0 0 30px rgba(0,245,255,0.2), 0 0 60px rgba(0,245,255,0.08)" }}>
            <div className="relative">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00c8ff, #7c3aed)" }}>
                <Zap size={15} className="text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 pulse-glow" />
            </div>
            <span className="text-sm font-black tracking-widest text-white uppercase">
              Proof<span className="neon-text-cyan">Stack</span>
              <span className="text-purple-400">AI</span>
            </span>
          </div>
        </motion.div>

        {/* Typing headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <h1 className="intro-hero-text text-4xl sm:text-6xl lg:text-7xl text-white min-h-[1.2em]">
            <span className="gradient-text">{typedText}</span>
            <span className="typing-cursor" />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10"
        >
          Transform your real work into a{" "}
          <span className="text-cyan-300 font-semibold">trusted AI-native skill profile</span>.
          Peer-verified. Proof-first. Production-ready.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {FEATURES.map(({ icon: Icon, label, color, glow }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
              style={{ boxShadow: `0 0 20px ${glow}` }}
            >
              <Icon size={14} className={color} />
              <span className="text-sm font-bold text-slate-200">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <button
            type="button"
            onClick={handleEnter}
            disabled={entering}
            className="button-cta aura-pulse group"
          >
            {entering ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Sparkles size={18} />
              </motion.span>
            ) : (
              <>
                <Zap size={18} />
                Enter Platform
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Button glow rings */}
          <div className="absolute inset-0 -z-10 rounded-full">
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-400/30"
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-purple-400/20"
              animate={{ scale: [1, 2], opacity: [0.4, 0] }}
              transition={{ duration: 2, delay: 0.7, repeat: Infinity, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-slate-600"
        >
          Scroll to explore ↓
        </motion.p>
      </motion.div>

      {/* Cinematic enter transition */}
      <AnimatePresence>
        {entering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-[#020617]"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,245,255,0.15) 0%, #020617 60%)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
