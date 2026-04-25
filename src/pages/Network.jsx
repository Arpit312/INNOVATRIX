import { useState } from "react";
import {
  Users,
  UserPlus,
  MessageSquare,
  Star,
  Search,
  Filter,
  MapPin,
  Briefcase,
  Award,
  TrendingUp,
  UserCheck,
  Clock,
  Send,
  MoreHorizontal,
  CheckCircle2,
  X,
  Heart,
  Zap
} from "lucide-react";

export default function Network() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("connections");

  const connections = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Product Manager",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      expertise: ["Product Strategy", "Agile", "User Research"],
      status: "connected",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      trustScore: 94,
      mutualConnections: 12,
      lastActive: "2 hours ago",
      skills: ["Product Management", "Strategy", "Leadership"],
      badges: ["Top Contributor", "Verified"],
      connectionDate: "Jan 2024"
    },
    {
      id: 2,
      name: "Alex Kumar",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      expertise: ["React", "Node.js", "Python", "DevOps"],
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      trustScore: 87,
      mutualConnections: 8,
      lastActive: "1 day ago",
      skills: ["JavaScript", "Python", "AWS"],
      badges: ["Rising Star"],
      connectionDate: null
    },
    {
      id: 3,
      name: "Jordan Lee",
      title: "UX Designer",
      company: "DesignStudio",
      location: "Los Angeles, CA",
      expertise: ["UI/UX Design", "Figma", "User Testing"],
      status: "connected",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      trustScore: 91,
      mutualConnections: 15,
      lastActive: "5 hours ago",
      skills: ["Design", "Prototyping", "Research"],
      badges: ["Design Expert", "Verified"],
      connectionDate: "Dec 2023"
    },
    {
      id: 4,
      name: "Emma Wilson",
      title: "Data Scientist",
      company: "DataTech Solutions",
      location: "Seattle, WA",
      expertise: ["Machine Learning", "Python", "Statistics"],
      status: "connected",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      trustScore: 96,
      mutualConnections: 22,
      lastActive: "30 minutes ago",
      skills: ["ML", "Python", "Statistics"],
      badges: ["AI Expert", "Top Rated", "Verified"],
      connectionDate: "Nov 2023"
    },
    {
      id: 5,
      name: "Marcus Johnson",
      title: "DevOps Engineer",
      company: "CloudSys",
      location: "Austin, TX",
      expertise: ["Kubernetes", "AWS", "CI/CD"],
      status: "connected",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      trustScore: 89,
      mutualConnections: 6,
      lastActive: "3 days ago",
      skills: ["DevOps", "Cloud", "Automation"],
      badges: ["Infrastructure Expert"],
      connectionDate: "Feb 2024"
    },
    {
      id: 6,
      name: "Priya Patel",
      title: "Frontend Developer",
      company: "WebFlow Agency",
      location: "Chicago, IL",
      expertise: ["React", "TypeScript", "CSS"],
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      trustScore: 85,
      mutualConnections: 9,
      lastActive: "6 hours ago",
      skills: ["React", "TypeScript", "CSS"],
      badges: ["Frontend Specialist"],
      connectionDate: null
    }
  ];

  const pendingRequests = connections.filter(c => c.status === "pending");
  const activeConnections = connections.filter(c => c.status === "connected");

  const filteredConnections = connections.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === "all" ||
                         (filter === "connected" && person.status === "connected") ||
                         (filter === "pending" && person.status === "pending");
    return matchesSearch && matchesFilter;
  });

  const networkStats = {
    totalConnections: activeConnections.length,
    pendingRequests: pendingRequests.length,
    messages: 8,
    recommendations: 5,
    weeklyGrowth: 3,
    topSkills: ["React", "Python", "AWS", "UI/UX", "DevOps"]
  };

  const tabs = [
    { id: "connections", label: "Connections", count: activeConnections.length },
    { id: "pending", label: "Pending", count: pendingRequests.length },
    { id: "discover", label: "Discover", count: null }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Network</h1>
        <p className="text-slate-500">Connect with professionals and expand your professional circle</p>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <Users className="text-indigo-600" size={24} />
            <div>
              <p className="text-slate-500 text-sm">Connections</p>
              <p className="text-2xl font-bold text-slate-900">{networkStats.totalConnections}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <UserPlus className="text-green-600" size={24} />
            <div>
              <p className="text-slate-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-slate-900">{networkStats.pendingRequests}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-blue-600" size={24} />
            <div>
              <p className="text-slate-500 text-sm">Messages</p>
              <p className="text-2xl font-bold text-slate-900">{networkStats.messages}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <Star className="text-yellow-600" size={24} />
            <div>
              <p className="text-slate-500 text-sm">Recommendations</p>
              <p className="text-2xl font-bold text-slate-900">{networkStats.recommendations}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-emerald-600" size={24} />
            <div>
              <p className="text-slate-500 text-sm">Weekly Growth</p>
              <p className="text-2xl font-bold text-slate-900">+{networkStats.weeklyGrowth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Skills in Network */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Top Skills in Your Network</h3>
        <div className="flex flex-wrap gap-2">
          {networkStats.topSkills.map((skill) => (
            <span key={skill} className="bg-indigo-50 text-indigo-700 text-sm font-semibold px-3 py-2 rounded-lg border border-indigo-200">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search connections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("connected")}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              filter === "connected"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            }`}
          >
            Connected ({activeConnections.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              filter === "pending"
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            }`}
          >
            Pending ({pendingRequests.length})
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            {tab.label} {tab.count !== null && `(${tab.count})`}
          </button>
        ))}
      </div>

      {/* Connections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnections.map((person) => (
          <div key={person.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <img src={person.avatar} alt={person.name} className="w-16 h-16 rounded-full border-2 border-slate-100" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 truncate">{person.name}</h3>
                  {person.badges.includes("Verified") && (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  )}
                </div>
                <p className="text-sm text-slate-600 truncate">{person.title}</p>
                <p className="text-xs text-slate-500 truncate">{person.company}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={12} className="text-slate-400" />
                  <span className="text-xs text-slate-500">{person.location}</span>
                </div>
              </div>
            </div>

            {/* Trust Score */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center">
                  <Zap size={14} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Trust Score</p>
                  <p className="text-sm font-bold text-slate-900">{person.trustScore}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">{person.mutualConnections} mutual</p>
                <p className="text-xs text-slate-400">{person.lastActive}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {person.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-1 rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Badges */}
            {person.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {person.badges.map((badge) => (
                  <span key={badge} className="bg-yellow-50 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-md border border-yellow-200">
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              {person.status === "connected" ? (
                <>
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <MessageSquare size={14} />
                    Message
                  </button>
                  <button className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <UserCheck size={14} />
                    Accept
                  </button>
                  <button className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors">
                    <X size={16} />
                  </button>
                </>
              )}
            </div>

            {person.connectionDate && (
              <p className="text-xs text-slate-400 mt-3 text-center">
                Connected {person.connectionDate}
              </p>
            )}
          </div>
        ))}
      </div>

      {filteredConnections.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">No connections found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
