import { Shield, CheckCircle, MapPin, Calendar, Star } from "lucide-react";
import { USER } from "../data/dummyData";

function TrustRing({ score }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e0e7ff" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">{score}</span>
        <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Trust</span>
      </div>
    </div>
  );
}

export default function TrustHeader({ onVerify }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        {/* Avatar + Ring */}
        <div className="relative flex-shrink-0">
          <img
            src={USER.avatar}
            alt={USER.name}
            className="w-20 h-20 rounded-2xl border-4 border-indigo-100 bg-indigo-50 shadow-sm"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white">
            <Shield size={10} className="text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">{USER.name}</h1>
            {USER.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200"
              >
                <CheckCircle size={10} />
                {badge}
              </span>
            ))}
          </div>
          <p className="text-slate-500 text-sm mb-3">{USER.title}</p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-slate-300" />
              {USER.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-slate-300" />
              Member since {USER.joinDate}
            </span>
            <span className="flex items-center gap-1">
              <Star size={12} className="text-amber-400" />
              Top 3% of verified engineers
            </span>
          </div>
        </div>

        {/* Trust Score */}
        <div className="flex flex-col items-center gap-2">
          <TrustRing score={USER.trustScore} />
          <p className="text-xs text-slate-400 font-medium">Global Trust Score</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
        {[
          { label: "Projects Verified", value: "12" },
          { label: "Peer Validators", value: "48" },
          { label: "Skills Certified", value: "6" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}