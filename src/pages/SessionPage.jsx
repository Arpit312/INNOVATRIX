import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const SKILLS   = ["React / Frontend", "Python / AI", "Data Structures", "Node.js"];
const LEVELS   = ["Beginner", "Intermediate", "Advanced"];
const GOALS    = ["Job Prep", "Internship", "Hackathon", "Self Growth"];
const MAX_FREE = 3;

const AI_REPLIES = [
  (skill, level, goal) =>
    `Hi there! 👋 I'm your You Mentor. I see you want to master **${skill}** at **${level}** level for **${goal}** — that's an awesome goal!\n\nTo build your personalised roadmap, tell me: what have you already built or learned so far?`,
  () =>
    `Great start! 🚀 For React / Frontend, I'd recommend solidifying your understanding of component lifecycle and hooks first.\n\nHave you tried building a small project with **useState** and **useEffect** yet? That's usually the best way to cement the fundamentals.`,
  () =>
    `Love the energy! 💡 Consistency beats intensity — aim for **2 focused hours daily**: one on theory, one on building.\n\nI suggest a mini **Todo App** as your next milestone. Want to hop on a call and walk through the architecture together?`,
  () =>
    `Excellent session today! 🎯 Here's your quick roadmap:\n\n**Week 1** — React basics & JSX\n**Week 2** — State management & hooks\n**Week 3** — API integration & real projects\n\nYou've reached the end of your free session. Upgrade to keep the momentum going!`,
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmtTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// ─── Sub-components ──────────────────────────────────────────────────────────

function ChipGroup({ label, icon, options, value, onChange }) {
  return (
    <div className="mb-5">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2.5">
        <span>{icon}</span>
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-150 cursor-pointer select-none
              ${value === o
                ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-300"
                : "bg-stone-50 border-stone-200 text-stone-500 hover:border-indigo-300 hover:text-indigo-600"
              }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-end gap-2.5 animate-[fadeUp_0.3s_ease_forwards]">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-[13px] text-white flex-shrink-0">
        ✦
      </div>
      <div className="bg-white border border-stone-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-400 inline-block"
              style={{ animation: `blink 1.2s ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Message({ msg }) {
  if (msg.type === "system") {
    return (
      <div className="flex justify-center">
        <span className="text-[11px] text-stone-400 bg-stone-100 border border-stone-200 rounded-full px-3 py-1">
          {msg.text}
        </span>
      </div>
    );
  }

  const isAI = msg.sender === "ai";

  return (
    <div
      className={`flex items-end gap-2.5 animate-[fadeUp_0.3s_ease_forwards] ${
        isAI ? "" : "flex-row-reverse"
      }`}
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] flex-shrink-0 ${
          isAI
            ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white"
            : "bg-stone-200 text-stone-600"
        }`}
      >
        {isAI ? "✦" : "👤"}
      </div>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${
          isAI
            ? "bg-white border border-stone-100 text-stone-800 rounded-bl-sm"
            : "bg-indigo-600 text-white rounded-br-sm"
        }`}
      >
        {msg.text.split("\n").map((line, i, arr) => (
          <span key={i}>
            <span
              dangerouslySetInnerHTML={{
                __html: line.replace(
                  /\*\*(.*?)\*\*/g,
                  `<strong class="${isAI ? "text-indigo-700" : "text-indigo-100"}">$1</strong>`
                ),
              }}
            />
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Call Overlay ─────────────────────────────────────────────────────────────
function CallOverlay({ callType, onEnd }) {
  const [sec, setSec]       = useState(0);
  const [muted, setMuted]   = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef            = useRef(null);
  const timerRef            = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSec((s) => s + 1), 1000);
    if (callType === "video") {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((s) => {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(() => {});
    }
    return () => {
      clearInterval(timerRef.current);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);                   // eslint-disable-line

  const handleEnd = () => {
    clearInterval(timerRef.current);
    if (stream) stream.getTracks().forEach((t) => t.stop());
    onEnd(callType, fmtTime(sec));
  };

  const toggleMute = () => {
    if (stream) stream.getAudioTracks().forEach((t) => (t.enabled = muted));
    setMuted((m) => !m);
  };

  const toggleCam = () => {
    if (stream) stream.getVideoTracks().forEach((t) => (t.enabled = camOff));
    setCamOff((c) => !c);
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#0D0B19] flex flex-col overflow-hidden animate-[fadeIn_0.3s_ease]">
      {/* ambient blobs */}
      <div className="absolute w-72 h-72 rounded-full bg-indigo-600/20 blur-[90px] -top-16 -left-16 animate-[blobFloat_8s_ease-in-out_infinite_alternate]" />
      <div className="absolute w-60 h-60 rounded-full bg-violet-600/20 blur-[90px] -bottom-10 -right-10 animate-[blobFloat_8s_4s_ease-in-out_infinite_alternate]" />

      {/* PIP */}
      {callType === "video" && (
        <div className="absolute top-4 right-4 w-28 h-40 rounded-xl overflow-hidden border border-white/10 bg-stone-900 z-10 shadow-xl">
          {stream && !camOff ? (
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl text-white/30">👤</div>
          )}
        </div>
      )}

      {/* Centre content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div
          className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-4xl text-white mb-5 shadow-2xl"
          style={{ animation: "ringPulse 2s infinite" }}
        >
          ✦
        </div>
        <h2 className="text-white text-2xl font-bold mb-1">You Mentor</h2>
        <p className="text-white/40 text-sm mb-2 font-mono">{callType === "video" ? "Video Call" : "Voice Call"}</p>
        <p className="text-white text-3xl font-bold font-mono tracking-widest">{fmtTime(sec)}</p>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-5 z-10">
        <CtrlBtn
          active={muted}
          icon={muted ? "🔇" : "🎙️"}
          label="Mute"
          onClick={toggleMute}
        />
        {callType === "video" && (
          <CtrlBtn
            active={camOff}
            icon={camOff ? "🚫" : "📷"}
            label="Camera"
            onClick={toggleCam}
          />
        )}
        <div className="flex flex-col items-center">
          <button
            onClick={handleEnd}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white text-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30"
          >
            📵
          </button>
          <span className="text-[10px] text-white/30 mt-1">End</span>
        </div>
      </div>
    </div>
  );
}

function CtrlBtn({ icon, label, active, onClick }) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all hover:scale-105 active:scale-95
          ${active ? "bg-white/25 text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
      >
        {icon}
      </button>
      <span className="text-[10px] text-white/30 mt-1">{label}</span>
    </div>
  );
}

// ─── Paywall ─────────────────────────────────────────────────────────────────
function Paywall({ onClose }) {
  const features = [
    "Unlimited Video & Audio Calls",
    "Personalised Roadmap Tracker",
    "Deep-dive Code Reviews",
    "Mock Interview Simulator",
  ];
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-5 backdrop-blur-md bg-stone-100/80 animate-[fadeIn_0.35s_ease]">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden animate-[slideUp_0.35s_ease]">
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
        <div className="p-7">
          <div className="text-3xl mb-3">🔓</div>
          <h2 className="text-xl font-bold text-stone-900 mb-1.5">Free Session Complete</h2>
          <p className="text-stone-500 text-[13px] leading-relaxed mb-5">
            You've finished your free 1-on-1 session! Upgrade to unlock unlimited live calls and keep your momentum going.
          </p>
          <ul className="space-y-2.5 mb-5">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-[13px] text-stone-700">
                <span className="text-emerald-500 font-bold text-sm">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between bg-stone-50 rounded-xl p-4 border border-stone-200 mb-5">
            <div>
              <p className="text-[11px] text-stone-400 font-medium mb-0.5">Premium Plan</p>
              <p className="text-2xl font-bold text-stone-900">
                $19<span className="text-sm font-normal text-stone-400">/mo</span>
              </p>
            </div>
            <span className="bg-emerald-50 text-emerald-600 text-[11px] font-semibold px-3 py-1 rounded-full border border-emerald-100">
              Save 20%
            </span>
          </div>
          <button className="w-full py-3.5 bg-stone-900 text-white rounded-xl font-semibold text-sm hover:bg-stone-800 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-md mb-3">
            Upgrade Now →
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 text-stone-400 text-sm hover:text-stone-700 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [skill, setSkill]         = useState("React / Frontend");
  const [level, setLevel]         = useState("Beginner");
  const [goal, setGoal]           = useState("Job Prep");
  const [started, setStarted]     = useState(false);
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState("");
  const [typing, setTyping]       = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [limitHit, setLimitHit]   = useState(false);
  const [showPay, setShowPay]     = useState(false);
  const [call, setCall]           = useState(null); // 'audio' | 'video' | null
  const endRef                    = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const addMsg = (sender, text, type = "chat") =>
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), sender, text, type }]);

  const startSession = () => {
    setStarted(true);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMsg("ai", AI_REPLIES[0](skill, level, goal));
    }, 1200);
  };

  const sendMessage = useCallback(() => {
    if (!input.trim() || limitHit || typing) return;
    addMsg("user", input.trim());
    setInput("");
    setTyping(true);
    const next = userCount + 1;
    setUserCount(next);
    setTimeout(() => {
      setTyping(false);
      addMsg("ai", AI_REPLIES[Math.min(next, AI_REPLIES.length - 1)](skill, level, goal));
      if (next >= MAX_FREE) {
        setLimitHit(true);
        setTimeout(() => setShowPay(true), 600);
      }
    }, 1400);
  }, [input, limitHit, typing, userCount, skill, level, goal]);

  const handleCallEnd = (type, duration) => {
    setCall(null);
    addMsg("", `${type === "video" ? "📹 Video" : "🎙️ Voice"} call ended • ${duration}`, "system");
  };

  const msgsLeft = MAX_FREE - userCount;
  const progress = (msgsLeft / MAX_FREE) * 100;

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes slideUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blink    { 0%,80%,100% { opacity:0.3; } 40% { opacity:1; } }
        @keyframes blobFloat{ 0% { transform:translate(0,0); } 100% { transform:translate(30px,20px); } }
        @keyframes ringPulse{ 0%{box-shadow:0 0 0 0 rgba(99,102,241,.5);} 70%{box-shadow:0 0 0 24px rgba(99,102,241,0);} 100%{box-shadow:0 0 0 0 rgba(99,102,241,0);} }
        @keyframes floatIcon{ 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      `}</style>

      <div className="flex flex-col h-screen bg-[#F7F6F3] font-sans overflow-hidden">

        {/* ── NAV ── */}
        <nav className="flex items-center justify-between px-6 h-14 bg-white border-b border-stone-200 flex-shrink-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm shadow-sm">
              ✦
            </div>
            <div>
              <p className="text-[15px] font-bold leading-none text-stone-900 tracking-tight">Personal Mentor</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Personalised 1-on-1</p>
            </div>
          </div>
          <span className="bg-indigo-50 text-indigo-600 text-[11px] font-semibold px-3 py-1 rounded-full border border-indigo-100">
            Free Plan
          </span>
        </nav>

        {/* ── BODY ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── SIDEBAR ── */}
          <aside className="w-72 flex-shrink-0 bg-white border-r border-stone-200 flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100">
              <p className="text-[13px] font-semibold text-stone-800">Session Setup</p>
              <p className="text-[11px] text-stone-400 mt-0.5">Configure your learning profile</p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin scrollbar-thumb-stone-200">
              <ChipGroup label="Skill Focus"   icon="⚡" options={SKILLS} value={skill} onChange={setSkill} />
              <ChipGroup label="Your Level"    icon="🎯" options={LEVELS} value={level} onChange={setLevel} />
              <ChipGroup label="Primary Goal"  icon="🏆" options={GOALS}  value={goal}  onChange={setGoal}  />

              {!started ? (
                <button
                  onClick={startSession}
                  className="mt-4 w-full py-3.5 rounded-xl bg-indigo-600 text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  Start Free Session
                  <span className="text-indigo-200 text-xs">→</span>
                </button>
              ) : (
                <div className="mt-4 p-3.5 bg-indigo-50 rounded-xl border border-indigo-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-indigo-600">Session Active</span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      {msgsLeft > 0 ? `${msgsLeft} left` : "Ended"}
                    </span>
                  </div>
                  <div className="h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(progress, 0)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* ── CHAT MAIN ── */}
          <main className="flex-1 flex flex-col overflow-hidden bg-[#F7F6F3] relative">

            {/* CHAT HEADER */}
            {started && (
              <div className="h-14 bg-white border-b border-stone-200 px-5 flex items-center justify-between flex-shrink-0 z-10">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm">
                      ✦
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-stone-900 leading-none">Your Mentor</p>
                    <p className="text-[11px] text-emerald-500 font-medium mt-0.5">● Online</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {[
                    { icon: "🎙️", type: "audio", label: "Voice Call" },
                    { icon: "📹", type: "video", label: "Video Call" },
                  ].map(({ icon, type, label }) => (
                    <button
                      key={type}
                      title={label}
                      disabled={limitHit}
                      onClick={() => setCall(type)}
                      className="w-9 h-9 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center text-[15px] hover:bg-indigo-50 hover:border-indigo-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGES */}
            {!started ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <div
                  className="text-5xl mb-5"
                  style={{ animation: "floatIcon 3s ease-in-out infinite" }}
                >
                  🤖
                </div>
                <h3 className="text-lg font-bold text-stone-800 mb-2">Mentor is ready</h3>
                <p className="text-stone-400 text-[13px] leading-relaxed max-w-xs">
                  Configure your profile on the left and click{" "}
                  <strong className="text-indigo-600">Start Free Session</strong> to begin your personalised roadmap.
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
                  {messages.map((msg) => (
                    <Message key={msg.id} msg={msg} />
                  ))}
                  {typing && <TypingBubble />}
                  <div ref={endRef} />
                </div>

                {/* INPUT */}
                <div className="bg-white border-t border-stone-200 px-5 py-3.5 flex-shrink-0">
                  <div className="flex gap-2.5 items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      disabled={limitHit || typing}
                      placeholder={limitHit ? "Session ended." : "Type your message…"}
                      className="flex-1 bg-stone-50 border border-stone-200 rounded-full px-5 py-2.5 text-[13.5px] text-stone-800 outline-none placeholder-stone-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || limitHit || typing}
                      className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-base hover:bg-indigo-700 transition-all disabled:bg-stone-200 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex-shrink-0 shadow-sm shadow-indigo-200"
                    >
                      ➤
                    </button>
                  </div>
                  <p className="text-center text-[11px] text-stone-300 mt-2 flex items-center justify-center gap-1">
                    🔒 Secure 1-on-1 You Mentorship Environment
                  </p>
                </div>
              </>
            )}

            {/* PAYWALL */}
            {showPay && <Paywall onClose={() => setShowPay(false)} />}

            {/* CALL OVERLAY */}
            {call && <CallOverlay callType={call} onEnd={handleCallEnd} />}

          </main>
        </div>
      </div>
    </>
  );
}