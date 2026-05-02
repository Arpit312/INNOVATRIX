import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../lib/utils";
import { itemMotion, revealMotion, viewport, heroTextMotion, heroStagger, animeReveal } from "../lib/motion";

export function PageFrame({ children, className = "" }) {
  return (
    <motion.div
      variants={itemMotion}
      className={cn("mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8", className)}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      variants={revealMotion}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function GlassCard({ children, className = "", as = "div", hover = true, id, ...props }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      id={id}
      variants={itemMotion}
      whileHover={hover ? { y: -5, scale: 1.015 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className={cn("premium-card", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function NeonCard({ children, className = "", hover = true, ...props }) {
  return (
    <motion.div
      variants={itemMotion}
      whileHover={hover ? { y: -6, scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className={cn("neon-card", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({ children, className = "", intensity = 10 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 260,
    damping: 32,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 260,
    damping: 32,
  });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      variants={itemMotion}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className={cn("premium-card will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

export function HoloCard({ children, className = "", intensity = 8 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 240,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 240,
    damping: 30,
  });
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      variants={itemMotion}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={cn("premium-card will-change-transform overflow-hidden group", className)}
    >
      {/* Holographic shine overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(0,245,255,0.12) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export function SectionHeader({ eyebrow, title, description, actions, className = "" }) {
  return (
    <motion.div
      variants={itemMotion}
      className={cn("mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}
    >
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </motion.div>
  );
}

export function CyberBadge({ children, className = "" }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border border-cyan-400/28 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300",
      "shadow-[0_0_14px_rgba(0,245,255,0.18)]",
      className
    )}>
      {children}
    </span>
  );
}

export function NeonDivider({ className = "" }) {
  return (
    <div className={cn("h-px w-full", className)}
      style={{
        background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.45), rgba(124,58,237,0.3), transparent)"
      }}
    />
  );
}

export function GlowOrb({ color = "cyan", size = 300, className = "" }) {
  const colors = {
    cyan: "rgba(0,245,255,0.08)",
    purple: "rgba(124,58,237,0.08)",
    pink: "rgba(255,0,128,0.07)",
  };
  return (
    <div
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      style={{
        width: size,
        height: size,
        background: colors[color] || colors.cyan,
      }}
    />
  );
}

export function FeatureCard3D({ children, className = "", icon: Icon, title, description, color = "cyan" }) {
  const colorMap = {
    cyan: { border: "rgba(0,245,255,0.2)", glow: "rgba(0,245,255,0.15)", text: "text-cyan-400", bg: "bg-cyan-400/10" },
    purple: { border: "rgba(124,58,237,0.2)", glow: "rgba(124,58,237,0.15)", text: "text-purple-400", bg: "bg-purple-400/10" },
    pink: { border: "rgba(255,0,128,0.2)", glow: "rgba(255,0,128,0.12)", text: "text-pink-400", bg: "bg-pink-400/10" },
  };
  const c = colorMap[color] || colorMap.cyan;

  return (
    <motion.div
      variants={revealMotion}
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className={cn("premium-card p-6 group cursor-pointer neon-border-animated", className)}
      style={{ borderColor: c.border }}
    >
      <div className={cn("mb-5 w-12 h-12 rounded-2xl flex items-center justify-center", c.bg)}
        style={{ boxShadow: `0 0 20px ${c.glow}` }}>
        {Icon && <Icon size={22} className={c.text} />}
      </div>
      <h3 className="text-lg font-black text-white mb-2">{title}</h3>
      <p className="text-sm leading-7 text-slate-400">{description}</p>
      {children}
    </motion.div>
  );
}

// ── NEW: AnimeCard ─────────────────────────────────────────────────────────────
// Premium card with living color-cycling border + light sweep
export function AnimeCard({ children, className = "", hover = true, ...props }) {
  return (
    <motion.div
      variants={itemMotion}
      whileHover={hover ? { y: -6, scale: 1.015 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className={cn("premium-card anime-card anime-light-sweep relative overflow-hidden", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── NEW: AuraAvatar ────────────────────────────────────────────────────────────
// Avatar with color-cycling aura glow + pulse ring
export function AuraAvatar({ src, alt, size = "h-24 w-24", className = "", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("relative shrink-0 group", className)}
      aria-label={alt}
    >
      <div className="relative">
        <img
          src={src}
          alt={alt}
          className={cn("rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105", size)}
          style={{ border: "2px solid rgba(0,245,255,0.4)" }}
        />
        {/* Color-cycling aura */}
        <div
          className="absolute inset-0 rounded-2xl anime-aura pointer-events-none"
          style={{ borderRadius: "inherit" }}
        />
        {/* Expanding pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-cyan-400/35 pointer-events-none"
          animate={{ scale: [1, 1.18], opacity: [0.6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-2xl border border-purple-400/25 pointer-events-none"
          animate={{ scale: [1, 1.32], opacity: [0.4, 0] }}
          transition={{ duration: 2.2, delay: 0.7, repeat: Infinity, ease: "easeOut" }}
        />
      </div>
    </button>
  );
}

// ── NEW: AnimeHeroText ─────────────────────────────────────────────────────────
// Dramatic blur-clear entrance for hero headings — anime title card feel
export function AnimeHeroText({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      variants={heroTextMotion}
      initial="initial"
      animate="animate"
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── NEW: AnimeRevealSection ────────────────────────────────────────────────────
// Section that reveals with blur-clear on scroll
export function AnimeRevealSection({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      variants={animeReveal}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── NEW: GlowBurst ────────────────────────────────────────────────────────────
// One-shot radial flash — attach to a button's onClick container
export function GlowBurst({ active }) {
  if (!active) return null;
  return <div className="anime-glow-burst" aria-hidden="true" />;
}
