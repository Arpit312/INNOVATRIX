import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Per-route Vanta.js 3D background.
 * Each effect is lazy-loaded so only the active one is in memory.
 * The container sits at z-index -20 so all UI renders above it.
 */

const EFFECTS = {
  // Login / landing (not logged in)
  login: {
    loader: () => import("vanta/dist/vanta.waves.min"),
    options: {
      color: 0x040e2e,
      shininess: 40,
      waveHeight: 20,
      waveSpeed: 0.4,
      zoom: 0.8,
    },
  },
  // Dashboard (home when logged in)
  dashboard: {
    loader: () => import("vanta/dist/vanta.net.min"),
    options: {
      color: 0x00f5ff,
      backgroundColor: 0x020617,
      points: 14,
      maxDistance: 22,
      spacing: 17,
      showDots: true,
    },
  },
  // Portfolio
  portfolio: {
    loader: () => import("vanta/dist/vanta.rings.min"),
    options: {
      color: 0x7c3aed,
      backgroundColor: 0x020617,
    },
  },
  // Network
  network: {
    loader: () => import("vanta/dist/vanta.net.min"),
    options: {
      color: 0x00c8ff,
      backgroundColor: 0x020617,
      points: 10,
      maxDistance: 26,
      spacing: 20,
    },
  },
  // Sessions / AI mentor
  sessions: {
    loader: () => import("vanta/dist/vanta.fog.min"),
    options: {
      highlightColor: 0x00c8ff,
      midtoneColor: 0x1e0a4e,
      lowlightColor: 0x020617,
      baseColor: 0x020617,
      blurFactor: 0.5,
      speed: 0.32,
      zoom: 0.7,
    },
  },
  // About
  about: {
    loader: () => import("vanta/dist/vanta.topology.min"),
    options: {
      color: 0x7c3aed,
      backgroundColor: 0x020617,
    },
  },
};

function resolveEffect(pathname, isLoggedIn) {
  // Not logged in — always show waves (login/landing page)
  if (!isLoggedIn) return EFFECTS.login;

  switch (pathname) {
    case "/portfolio": return EFFECTS.portfolio;
    case "/network":   return EFFECTS.network;
    case "/sessions":  return EFFECTS.sessions;
    case "/about":     return EFFECTS.about;
    default:           return EFFECTS.dashboard; // "/" and anything else
  }
}

export default function VantaBackground({ isLoggedIn }) {
  const containerRef = useRef(null);
  const effectRef   = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!containerRef.current) return undefined;
    // Respect user's reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let mounted = true;
    const config = resolveEffect(pathname, isLoggedIn);

    // Destroy previous effect before creating a new one
    if (effectRef.current) {
      try { effectRef.current.destroy(); } catch (_) {}
      effectRef.current = null;
    }

    Promise.all([config.loader(), import("three")])
      .then(([module, THREE]) => {
        if (!mounted || !containerRef.current) return;
        const Effect = module.default ?? module;
        effectRef.current = Effect({
          el: containerRef.current,
          THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.2,
          backgroundColor: 0x020617,
          ...config.options,
        });
      })
      .catch(() => {/* silently ignore if Vanta fails to load */});

    return () => {
      mounted = false;
      if (effectRef.current) {
        try { effectRef.current.destroy(); } catch (_) {}
        effectRef.current = null;
      }
    };
  }, [pathname, isLoggedIn]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-20 h-screen w-screen"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}
