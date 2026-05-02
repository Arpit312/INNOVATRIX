export const easeOut = [0.22, 1, 0.36, 1];
export const easeInOut = [0.4, 0, 0.2, 1];
export const easeSpring = { type: "spring", stiffness: 300, damping: 28 };

// ── Standard page transition ──────────────────────────────────────────────────
export const pageMotion = {
  initial: { opacity: 0, y: 28, scale: 0.985 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.99,
    transition: {
      duration: 0.22,
      ease: easeOut,
    },
  },
};

// ── Cinematic page transition (zoom + blur fade) ──────────────────────────────
// Use on hero sections for a dramatic anime-style entrance
export const cinematicMotion = {
  initial: { opacity: 0, scale: 0.92, filter: "blur(12px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: easeOut,
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    filter: "blur(6px)",
    transition: { duration: 0.28, ease: easeOut },
  },
};

// ── Dramatic hero text entrance ───────────────────────────────────────────────
// Slides up with a slight blur clear — anime title card feel
export const heroTextMotion = {
  initial: { opacity: 0, y: 40, scale: 0.96, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: easeOut },
  },
};

// ── Stagger container for hero text lines ─────────────────────────────────────
export const heroStagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const itemMotion = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

export const slideLeft = {
  initial: { opacity: 0, x: -36 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const slideRight = {
  initial: { opacity: 0, x: 36 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const revealMotion = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.52, ease: easeOut } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeOut } },
};

export const slideUpFade = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

// ── Anime reveal: blur-clear entrance for section content ─────────────────────
export const animeReveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

export const viewport = { once: true, amount: 0.15 };
export const viewportEager = { once: true, amount: 0.05 };
