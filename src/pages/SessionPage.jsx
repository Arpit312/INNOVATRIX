import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, CameraOff, CheckCircle2, Crown, Mic, MicOff, Phone, PhoneOff, Play, Send, ShieldCheck, Sparkles, Video, Zap, Brain, Cpu, Activity } from "lucide-react";
import { PageFrame, GlassCard, CyberBadge } from "../components/MotionPrimitives";
import { cn } from "../lib/utils";
import { itemMotion, pageMotion } from "../lib/motion";

const SKILLS = ["React / Frontend", "Python / AI", "Data Structures", "Node.js"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const GOALS = ["Job Prep", "Internship", "Hackathon", "Self Growth"];
const MAX_FREE = 3;

const AI_REPLIES = [
  (skill, level, goal) => `I see you want to master ${skill} at ${level} level for ${goal}. To build a sharp roadmap, tell me what you have already built or learned so far.`,
  () => "Great start. For React / Frontend, focus on component thinking, hooks, and state flow first. A small dashboard project is the fastest way to turn concepts into proof.",
  () => "Consistency beats intensity. Aim for two focused hours daily: one for concepts, one for building. Your next milestone should be a polished Todo or Kanban app with persistence.",
  () => "Session summary: Week 1 covers fundamentals, Week 2 focuses on hooks and APIs, Week 3 turns the project into portfolio evidence. Your free session limit is complete.",
];

const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function SessionPage() {
  const [skill, setSkill] = useState("React / Frontend");
  const [level, setLevel] = useState("Beginner");
  const [goal, setGoal] = useState("Job Prep");
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [limitHit, setLimitHit] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [call, setCall] = useState(null);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, typing]);

  const addMsg = useCallback((sender, text, type = "chat") => {
    setMessages((prev) => [...prev, { id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`, sender, text, type }]);
  }, []);

  const startSession = () => {
    setStarted(true);
    setTyping(true);
    window.setTimeout(() => { setTyping(false); addMsg("ai", AI_REPLIES[0](skill, level, goal)); }, 800);
  };

  const sendMessage = useCallback(() => {
    if (!input.trim() || limitHit || typing) return;
    addMsg("user", input.trim());
    setInput("");
    setTyping(true);
    const next = userCount + 1;
    setUserCount(next);
    window.setTimeout(() => {
      setTyping(false);
      addMsg("ai", AI_REPLIES[Math.min(next, AI_REPLIES.length - 1)](skill, level, goal));
      if (next >= MAX_FREE) { setLimitHit(true); window.setTimeout(() => setShowPaywall(true), 500); }
    }, 950);
  }, [addMsg, goal, input, level, limitHit, skill, typing, userCount]);

  const handleCallEnd = (type, duration) => { setCall(null); addMsg("system", `${type === "video" ? "Video" : "Voice"} call ended after ${duration}`, "system"); };

  const messagesLeft = Math.max(MAX_FREE - userCount, 0);
  const progress = (messagesLeft / MAX_FREE) * 100;

  return (
    <PageFrame className="pb-6">
      <motion.div
        variants={pageMotion}
        initial="initial"
        animate="animate"
        className="grid min-h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-cyan-400/18 bg-slate-950/88 shadow-2xl backdrop-blur-2xl lg:grid-cols-[300px_1fr] relative"
        style={{ boxShadow: "0 0 100px rgba(0,245,255,0.07), 0 0 50px rgba(124,58,237,0.05)" }}
      >
        {/* Ambient corner glows */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(0,245,255,0.05)" }} />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(124,58,237,0.05)" }} />

        {/* ── Sidebar ── */}
        <aside className="border-b border-white/8 bg-white/3 lg:border-b-0 lg:border-r relative overflow-hidden">
          <div className="scan-sweep" />
          {/* Sidebar ambient */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, rgba(0,245,255,0.04), transparent 60%)" }} />

          <div className="border-b border-white/8 p-5 relative">
            <CyberBadge className="mb-3"><Sparkles size={12} />AI Mentor</CyberBadge>
            <h1 className="text-2xl font-black text-white">Session Studio</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">Create a focused learning plan and turn progress into portfolio proof.</p>

            {/* Animated AI indicator */}
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-cyan-400/15 bg-cyan-400/5 px-3 py-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #00c8ff, #7c3aed)" }}>
                  <Brain size={14} className="text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-lg border border-cyan-400/40"
                  animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
              </div>
              <div>
                <p className="text-xs font-black text-white">ProofStack AI</p>
                <p className="text-xs text-emerald-400 font-semibold">Ready to mentor</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5 relative">
            <ChipGroup label="Skill Focus" options={SKILLS} value={skill} onChange={setSkill} />
            <ChipGroup label="Level" options={LEVELS} value={level} onChange={setLevel} />
            <ChipGroup label="Goal" options={GOALS} value={goal} onChange={setGoal} />

            {!started ? (
              <motion.button
                type="button"
                onClick={startSession}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="button-primary w-full"
              >
                <Play size={15} />Start Free Session
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-cyan-400/22 bg-cyan-400/6 p-4 relative overflow-hidden"
              >
                <div className="scan-sweep" />
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-cyan-300">Session Active</span>
                  <span className="text-xs font-bold text-slate-400">{messagesLeft} left</span>
                </div>
                <div className="neon-progress">
                  <motion.div animate={{ width: `${progress}%` }} className="neon-progress-fill" />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-emerald-400"
                    style={{ boxShadow: "0 0 8px rgba(52,211,153,0.6)" }}
                  />
                  <span className="text-xs text-slate-500">Live session in progress</span>
                </div>
              </motion.div>
            )}

            {/* Session stats */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Free msgs", value: `${messagesLeft}/${MAX_FREE}`, icon: Activity },
                { label: "AI model", value: "GPT-4o", icon: Cpu },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl border border-white/8 bg-white/4 p-3">
                  <Icon size={12} className="text-cyan-400 mb-1" />
                  <p className="text-xs font-black text-white">{value}</p>
                  <p className="text-[10px] text-slate-600 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main Chat Area ── */}
        <main className="relative flex min-h-[680px] flex-col">
          <SessionHeader started={started} limitHit={limitHit} onCall={setCall} />

          {!started ? (
            <div className="grid flex-1 place-items-center px-6 py-16 text-center relative">
              {/* Idle background rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-cyan-400/10"
                    style={{ width: 200 + i * 120, height: 200 + i * 120 }}
                    animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
                  />
                ))}
              </div>

              <motion.div variants={itemMotion} className="max-w-md relative z-10">
                <div className="relative mx-auto mb-6 w-fit">
                  <div
                    className="grid h-20 w-20 place-items-center rounded-3xl border border-cyan-400/22 bg-cyan-400/8 text-cyan-300"
                    style={{ boxShadow: "0 0 40px rgba(0,245,255,0.2)" }}
                  >
                    <Sparkles size={32} />
                  </div>
                  {/* Pulse rings */}
                  {[0, 1].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-3xl border border-cyan-400/25"
                      animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                      transition={{ duration: 2, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  ))}
                </div>
                <h2 className="text-3xl font-black text-white">Mentor is Ready</h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Choose your learning profile on the left and begin a guided proof-building session.
                </p>
                <motion.div
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-widest"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Waiting for session start
                </motion.div>
              </motion.div>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-6">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => <Message key={msg.id} msg={msg} />)}
                  {typing && <TypingBubble />}
                </AnimatePresence>
                <div ref={endRef} />
              </div>

              {/* Input bar */}
              <div className="border-t border-white/8 bg-slate-950/85 p-4 backdrop-blur-xl relative">
                <div className="absolute top-0 inset-x-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)" }} />
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    disabled={limitHit || typing}
                    placeholder={limitHit ? "Session limit reached — upgrade to continue" : "Type your response..."}
                    className="field"
                  />
                  <motion.button
                    type="button"
                    onClick={sendMessage}
                    disabled={!input.trim() || limitHit || typing}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #00c8ff, #7c3aed)", boxShadow: "0 0 20px rgba(0,200,255,0.3)" }}
                    aria-label="Send"
                  >
                    <Send size={17} />
                  </motion.button>
                </div>
                <p className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
                  <ShieldCheck size={12} />Secure 1-on-1 mentorship environment
                </p>
              </div>
            </>
          )}

          <AnimatePresence>
            {showPaywall && <Paywall onClose={() => setShowPaywall(false)} />}
            {call && <CallOverlay callType={call} onEnd={handleCallEnd} />}
          </AnimatePresence>
        </main>
      </motion.div>
    </PageFrame>
  );
}

function ChipGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => onChange(opt)} className={cn("rounded-full border px-3 py-1.5 text-xs font-bold transition", value === opt ? "border-cyan-400/30 bg-cyan-400/12 text-cyan-300" : "border-white/8 bg-white/4 text-slate-400 hover:text-white")}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function SessionHeader({ started, limitHit, onCall }) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-white/8 bg-slate-950/85 px-4 backdrop-blur-xl sm:px-6 relative">
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), rgba(124,58,237,0.3), transparent)" }} />
      <div className="flex items-center gap-3">
        <div className="relative grid h-10 w-10 place-items-center rounded-xl text-white"
          style={{ background: "linear-gradient(135deg, #00c8ff, #7c3aed)", boxShadow: "0 0 20px rgba(0,200,255,0.3)" }}>
          <Sparkles size={17} />
          {started && (
            <>
              <motion.span
                className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ border: "2px solid #020617", boxShadow: "0 0 8px rgba(52,211,153,0.6)" }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl border border-cyan-400/40"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </>
          )}
        </div>
        <div>
          <p className="text-sm font-black text-white">ProofStack Mentor</p>
          <motion.p
            animate={started ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className={cn("text-xs font-semibold", started ? "text-emerald-400" : "text-slate-500")}
          >
            {started ? "● Online" : "Waiting"}
          </motion.p>
        </div>
      </div>
      <div className="flex gap-2">
        {[
          { type: "audio", icon: Phone, label: "Voice call" },
          { type: "video", icon: Video, label: "Video call" },
        ].map(({ type, icon: Icon, label }) => (
          <motion.button
            key={type}
            type="button"
            disabled={!started || limitHit}
            onClick={() => onCall(type)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/8 bg-white/4 text-slate-400 transition hover:bg-white/8 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={label}
          >
            <Icon size={15} />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function Message({ msg }) {
  if (msg.type === "system") {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-center">
        <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs font-bold text-slate-500">{msg.text}</span>
      </motion.div>
    );
  }
  const isAI = msg.sender === "ai";
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className={cn("flex items-end gap-3", isAI ? "" : "flex-row-reverse")}>
      <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", isAI ? "bg-cyan-400/12 text-cyan-300" : "bg-white/8 text-slate-300")}>
        {isAI ? <Sparkles size={16} /> : <CheckCircle2 size={16} />}
      </div>
      <div className={cn("max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-lg", isAI ? "rounded-bl-md border border-white/8 bg-white/5 text-slate-200" : "rounded-br-md text-white")} style={!isAI ? { background: "linear-gradient(135deg, #00c8ff, #7c3aed)" } : {}}>
        {msg.text}
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-end gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-400/12 text-cyan-300"><Sparkles size={16} /></div>
      <div className="rounded-2xl rounded-bl-md border border-white/8 bg-white/5 px-4 py-4">
        <div className="flex h-4 items-center gap-1.5">
          {[0, 1, 2].map((dot) => (
            <motion.span key={dot} animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.12 }} className="h-2 w-2 rounded-full bg-cyan-400" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Paywall({ onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-40 grid place-items-center bg-slate-950/80 p-5 backdrop-blur-xl">
      <GlassCard className="w-full max-w-md p-7 text-center" hover={false}>
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-amber-400/20 bg-amber-400/8 text-amber-300" style={{ boxShadow: "0 0 20px rgba(251,191,36,0.15)" }}>
          <Crown size={24} />
        </div>
        <h2 className="text-2xl font-black text-white">Free Session Complete</h2>
        <p className="mt-3 text-sm leading-7 text-slate-400">Upgrade to continue mentorship, unlock unlimited calls, and generate deeper proof roadmaps.</p>
        <div className="mt-5 rounded-2xl border border-white/8 bg-white/4 p-4 text-left">
          {["Unlimited audio and video calls", "Personal roadmap tracker", "Deep code reviews", "Interview simulation"].map((f) => (
            <p key={f} className="flex items-center gap-2 py-1.5 text-sm font-semibold text-slate-300"><CheckCircle2 size={14} className="text-emerald-400" />{f}</p>
          ))}
        </div>
        <button className="button-primary mt-5 w-full"><Zap size={15} />Upgrade Plan</button>
        <button type="button" onClick={onClose} className="mt-3 text-sm font-bold text-slate-500 transition hover:text-white">Maybe later</button>
      </GlassCard>
    </motion.div>
  );
}

function CallOverlay({ callType, onEnd }) {
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [streamReady, setStreamReady] = useState(false);
  const streamRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((v) => v + 1), 1000);
    if (callType === "video") {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then((stream) => { streamRef.current = stream; setStreamReady(true); if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(() => setStreamReady(false));
    }
    return () => { window.clearInterval(timer); streamRef.current?.getTracks().forEach((t) => t.stop()); streamRef.current = null; };
  }, [callType]);

  const toggleMute = () => { streamRef.current?.getAudioTracks().forEach((t) => { t.enabled = muted; }); setMuted((v) => !v); };
  const toggleCam = () => { streamRef.current?.getVideoTracks().forEach((t) => { t.enabled = camOff; }); setCamOff((v) => !v); };
  const endCall = () => { streamRef.current?.getTracks().forEach((t) => t.stop()); onEnd(callType, fmtTime(seconds)); };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-50 flex flex-col overflow-hidden bg-slate-950"
    >
      {/* Animated background */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,245,255,0.07) 0%, rgba(124,58,237,0.05) 40%, transparent 70%)" }} />
      <div className="scanlines pointer-events-none" />

      {/* Video preview */}
      {callType === "video" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="absolute right-5 top-5 z-10 h-40 w-28 overflow-hidden rounded-2xl border border-white/12 bg-white/5 shadow-2xl"
          style={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}
        >
          {streamReady && !camOff
            ? <video ref={videoRef} autoPlay playsInline muted className="h-full w-full scale-x-[-1] object-cover" />
            : <div className="grid h-full w-full place-items-center text-slate-500"><CameraOff size={24} /></div>
          }
        </motion.div>
      )}

      {/* Center content */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        {/* Avatar with pulse rings */}
        <div className="relative mb-8">
          <motion.div
            className="grid h-32 w-32 place-items-center rounded-3xl border border-cyan-400/22 bg-cyan-400/8 text-cyan-300"
            animate={{ boxShadow: ["0 0 30px rgba(0,245,255,0.2)", "0 0 60px rgba(0,245,255,0.4)", "0 0 30px rgba(0,245,255,0.2)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {callType === "video" ? <Video size={44} /> : <Phone size={44} />}
          </motion.div>
          {/* Expanding rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-3xl border border-cyan-400/20"
              animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
              transition={{ duration: 2.5, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </div>

        <h2 className="text-3xl font-black text-white">ProofStack Mentor</h2>
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500">
          {callType === "video" ? "Video Call" : "Voice Call"}
        </p>

        {/* Timer */}
        <motion.p
          className="mt-6 font-mono text-5xl font-black tracking-widest text-white"
          style={{ textShadow: "0 0 25px rgba(0,245,255,0.5)" }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {fmtTime(seconds)}
        </motion.p>

        {/* Live indicator */}
        <div className="mt-4 flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-rose-400"
            style={{ boxShadow: "0 0 8px rgba(248,113,113,0.8)" }}
          />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Live</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 pb-10">
        <ControlButton active={muted} onClick={toggleMute} icon={muted ? MicOff : Mic} label="Mute" />
        {callType === "video" && (
          <ControlButton active={camOff} onClick={toggleCam} icon={camOff ? CameraOff : Camera} label="Camera" />
        )}
        <motion.button
          type="button"
          onClick={endCall}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          className="grid h-16 w-16 place-items-center rounded-full bg-rose-500 text-white"
          style={{ boxShadow: "0 0 30px rgba(239,68,68,0.5), 0 8px 30px rgba(0,0,0,0.4)" }}
          aria-label="End call"
        >
          <PhoneOff size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
}

function ControlButton({ active, onClick, icon: Icon, label }) {
  return (
    <button type="button" onClick={onClick} className={cn("grid h-12 w-12 place-items-center rounded-full border border-white/10 transition", active ? "bg-white/20 text-white" : "bg-white/8 text-slate-300 hover:bg-white/12")} aria-label={label}>
      <Icon size={20} />
    </button>
  );
}
