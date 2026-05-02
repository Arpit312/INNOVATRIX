import { Shield, CheckCircle2, MapPin, Calendar, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { USER as fallbackUser } from "../data/Dummydata";

function TrustRing({ score }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-28 h-28 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="7" className="trust-ring-track" />
        <motion.circle cx="50" cy="50" r={radius} fill="none" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }} transition={{ duration: 1.2, ease: "easeOut" }}
          className="trust-ring-fill" stroke="url(#trustGradient)" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-white">{score}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Trust</span>
      </div>
    </div>
  );
}

export default function TrustHeader({ onVerify }) {
  const [user, setUser] = useState(fallbackUser);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  return (
    <div className="premium-card p-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="relative shrink-0">
          <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl object-cover" style={{ border: "2px solid rgba(0,245,255,0.3)", boxShadow: "0 0 20px rgba(0,245,255,0.15)" }} />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00c8ff, #7c3aed)", border: "2px solid #020617" }}>
            <Shield size={12} className="text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-xl font-black text-white">{user?.name}</h1>
            {user?.badges?.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1 border border-cyan-400/20 bg-cyan-400/8 text-cyan-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                <CheckCircle2 size={10} />{badge}
              </span>
            ))}
          </div>
          <p className="text-slate-400 text-sm mb-3">{user?.title}</p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><MapPin size={11} />{user?.location}</span>
            <span className="flex items-center gap-1"><Calendar size={11} />Member since {user?.joinDate}</span>
            <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" />Top 3% of verified engineers</span>
          </div>
        </div>
        <TrustRing score={user?.trustScore || 0} />
      </div>
      <div className="mt-5 pt-5 border-t border-white/8 grid grid-cols-3 gap-4 text-center">
        {[{ label: "Projects Verified", value: "12" }, { label: "Peer Validators", value: "48" }, { label: "Skills Certified", value: "6" }].map((s) => (
          <div key={s.label}>
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
