import { useState } from "react";
import {
  Shield,
  LayoutDashboard,
  BookOpen,
  Users,
  Bell,
  Menu,
  X,
  ChevronDown,
  Zap,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { USER } from "../data/dummyData";

const NAV_LINKS = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/portfolio", label: "Portfolio", icon: BookOpen },
  { path: "/network", label: "Network", icon: Users },
];

export default function Navbar({ onVerify }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <Shield size={16} className="text-white" />
            </div>
            <span className="text-slate-900 font-bold text-lg tracking-tight">
              ProofStack<span className="text-indigo-600">AI</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;

              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onVerify}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm shadow-indigo-200"
            >
              <Zap size={14} />
              Verify a Skill
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <Bell size={16} className="text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-2 text-sm">
                  {[
                    { msg: "Priya S. validated your FinFlow project", time: "2m ago" },
                    { msg: "New peer review request from Rajan K.", time: "1h ago" },
                    { msg: "Your Python assessment score is live!", time: "3h ago" },
                  ].map((n, i) => (
                    <div key={i} className="px-3 py-2.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                      <p className="text-slate-700 leading-snug">{n.msg}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <img
                src={USER.avatar}
                alt={USER.name}
                className="w-9 h-9 rounded-full border-2 border-indigo-200 bg-indigo-50"
              />
              <div className="hidden lg:block">
                <p className="text-xs font-semibold text-slate-800 leading-none">{USER.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">Score: {USER.trustScore}</p>
              </div>
              <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600" />
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} className="text-slate-600" /> : <Menu size={18} className="text-slate-600" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-1">
          {NAV_LINKS.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;

            return (
              <button
                key={path}
                onClick={() => { navigate(path); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => { onVerify(); setMobileOpen(false); }}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-3 rounded-lg"
            >
              <Zap size={14} />
              Verify a Skill
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}