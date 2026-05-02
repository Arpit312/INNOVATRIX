import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import VerifySkillModal from "./components/VerifySkillModal";
import VantaBackground from "./components/VantaBackground";
import { pageMotion } from "./lib/motion";

const Intro = lazy(() => import("./pages/Intro"));
const LoginPage = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Network = lazy(() => import("./pages/Network"));
const SessionPage = lazy(() => import("./pages/SessionPage"));
const About = lazy(() => import("./pages/About"));

export default function App() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    return Boolean(sessionStorage.getItem("introSeen"));
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem("currentUser"));
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
  };
  const handleIntroEnter = () => {
    sessionStorage.setItem("introSeen", "1");
    setHasSeenIntro(true);
  };

  const protectedElement = (element) => (isLoggedIn ? element : <Navigate to="/login" replace />);

  // Show intro page on first visit to "/"
  if (!hasSeenIntro && location.pathname === "/") {
    return (
      <div className="app-shell min-h-screen text-slate-100">
        {/* Vanta runs inside Intro itself (GLOBE), so no VantaBackground here */}
        <div className="app-grid-overlay" />
        <div className="noise-layer" />
        <div className="scanlines" />
        <Suspense fallback={<PageLoader />}>
          <Intro onEnter={handleIntroEnter} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="app-shell min-h-screen text-slate-100">
      <VantaBackground isLoggedIn={isLoggedIn} />
      <div className="app-grid-overlay" />
      <div className="noise-layer" />
      <div className="scanlines" />

      {isLoggedIn && (
        <Navbar
          onVerify={() => setIsModalOpen(true)}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode((value) => !value)}
        />
      )}

      <main className={isLoggedIn ? "relative z-10 pt-16" : "relative z-10"}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                isLoggedIn
                  ? page(<Dashboard onVerify={() => setIsModalOpen(true)} />)
                  : page(<LoginPage onLoginSuccess={handleLoginSuccess} />)
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  page(<LoginPage onLoginSuccess={handleLoginSuccess} />)
                )
              }
            />
            <Route path="/portfolio" element={protectedElement(page(<Portfolio />))} />
            <Route path="/network" element={protectedElement(page(<Network />))} />
            <Route path="/sessions" element={protectedElement(page(<SessionPage />))} />
            <Route path="/about" element={protectedElement(page(<About />))} />
            <Route path="*" element={<RouteTransition><NotFound /></RouteTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isModalOpen && <VerifySkillModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

function page(element) {
  return (
    <RouteTransition>
      <Suspense fallback={<PageLoader />}>{element}</Suspense>
    </RouteTransition>
  );
}

function RouteTransition({ children }) {
  return (
    <motion.div
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-6">
      <div className="flex flex-col items-center gap-5">
        <div className="relative grid h-18 w-18 place-items-center rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(0,245,255,0.12), rgba(124,58,237,0.12))",
            border: "1px solid rgba(0,245,255,0.22)",
            boxShadow: "0 0 30px rgba(0,245,255,0.15)",
            width: 72,
            height: 72,
          }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="h-9 w-9 rounded-full border-2 border-transparent"
            style={{ borderTopColor: "#00f5ff", borderRightColor: "rgba(0,245,255,0.25)" }}
          />
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-cyan-400/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-slate-300">Loading ProofStackAI</p>
          <p className="text-xs text-slate-600 mt-1">Initializing workspace...</p>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-6 text-center">
      <div className="premium-card p-14">
        <p className="eyebrow mb-3">404</p>
        <h1 className="text-5xl font-black text-white mb-4" style={{ textShadow: "0 0 30px rgba(0,245,255,0.3)" }}>
          Page Not Found
        </h1>
        <p className="text-sm leading-7 text-slate-400 mb-8">
          The route you opened does not exist in ProofStackAI.
        </p>
        <Link to="/" className="button-primary">Return to Dashboard</Link>
      </div>
    </div>
  );
}
