import { motion } from "framer-motion";
import { CheckCircle2, Star, Users, Award, Zap } from "lucide-react";
import { revealMotion, stagger, viewport } from "../lib/motion";
import { cn } from "../lib/utils";

const ACTIVITIES = [
  { icon: CheckCircle2, color: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20", text: "Priya S. validated your FinFlow project", time: "2m ago" },
  { icon: Star, color: "text-amber-300 bg-amber-400/10 border-amber-400/20", text: "Your Trust Score increased to 91", time: "1h ago" },
  { icon: Users, color: "text-purple-300 bg-purple-400/10 border-purple-400/20", text: "Rajan K. sent a peer review request", time: "3h ago" },
  { icon: Award, color: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20", text: "Python assessment passed - score: 94/100", time: "1d ago" },
  { icon: Zap, color: "text-pink-300 bg-pink-400/10 border-pink-400/20", text: "EduTrack project got 3 new validations", time: "2d ago" },
];

export default function ActivityFeed() {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport} className="premium-card p-5">
      <div className="mb-4 border-b border-white/8 pb-4">
        <p className="eyebrow mb-1">Timeline</p>
        <h2 className="text-base font-black text-white">Recent Activity</h2>
      </div>
      <div className="space-y-1">
        {ACTIVITIES.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div key={i} variants={revealMotion} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
              <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-xl border", a.color)}>
                <Icon size={14} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-200 leading-snug">{a.text}</p>
                <p className="text-xs text-slate-500 mt-0.5">{a.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
