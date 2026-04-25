import { CheckCircle, Star, Users, Award } from "lucide-react";

const ACTIVITIES = [
  {
    icon: CheckCircle,
    color: "text-green-600 bg-green-50",
    text: "Priya S. validated your FinFlow project",
    time: "2m ago",
  },
  {
    icon: Star,
    color: "text-amber-600 bg-amber-50",
    text: "Your Trust Score increased to 91",
    time: "1h ago",
  },
  {
    icon: Users,
    color: "text-indigo-600 bg-indigo-50",
    text: "Rajan K. sent a peer review request",
    time: "3h ago",
  },
  {
    icon: Award,
    color: "text-violet-600 bg-violet-50",
    text: "Python assessment passed — score: 94/100",
    time: "1d ago",
  },
  {
    icon: CheckCircle,
    color: "text-green-600 bg-green-50",
    text: "EduTrack project got 3 new validations",
    time: "2d ago",
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className="px-5 pt-5 pb-4 border-b border-slate-100">
        <h2 className="text-base font-bold text-slate-900">Recent Activity</h2>
        <p className="text-xs text-slate-400 mt-0.5">Your verification timeline</p>
      </div>
      <div className="px-5 py-3 space-y-1">
        {ACTIVITIES.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.color}`}>
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 leading-snug">{a.text}</p>
                <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}