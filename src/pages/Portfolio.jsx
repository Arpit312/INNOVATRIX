import { useState } from "react";
import {
  BookOpen,
  Award,
  GitBranch,
  ExternalLink,
  Github,
  Calendar,
  Star,
  Code,
  Users,
  TrendingUp,
  Filter,
  Search,
  Eye,
  Heart,
  MessageSquare
} from "lucide-react";

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const portfolioItems = [
    {
      id: 1,
      title: "DeFi Payment Gateway",
      description: "A decentralized payment router handling multi-chain stablecoin settlements with advanced security features and real-time transaction monitoring.",
      longDescription: "Built a comprehensive DeFi payment solution that processes millions in daily transactions across multiple blockchain networks. Implemented advanced security protocols, real-time monitoring, and seamless user experience.",
      tech: ["React", "Solidity", "Node.js", "Web3.js", "MongoDB"],
      category: "fintech",
      status: "live",
      github: "https://github.com/username/defi-gateway",
      demo: "https://defi-gateway.demo.com",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      stats: { stars: 45, forks: 12, views: 1200, likes: 89 },
      date: "Mar 2024",
      featured: true,
      verified: true
    },
    {
      id: 2,
      title: "AI Essay Grader",
      description: "NLP-powered essay evaluation system that provides detailed feedback and scoring for educational institutions.",
      longDescription: "Developed an advanced AI system using natural language processing to automatically grade student essays. The system provides detailed feedback, identifies improvement areas, and maintains consistency in grading.",
      tech: ["Python", "PyTorch", "FastAPI", "Next.js", "PostgreSQL"],
      category: "ai",
      status: "live",
      github: "https://github.com/username/ai-grader",
      demo: "https://ai-grader.edu",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      stats: { stars: 78, forks: 23, views: 2100, likes: 156 },
      date: "Feb 2024",
      featured: true,
      verified: true
    },
    {
      id: 3,
      title: "Global CDN Router",
      description: "Edge routing logic for a distributed content delivery network with intelligent load balancing.",
      longDescription: "Architected a global CDN routing system that optimizes content delivery across 50+ edge locations worldwide. Implemented intelligent load balancing, caching strategies, and real-time performance monitoring.",
      tech: ["Go", "Rust", "Docker", "Kubernetes", "Redis"],
      category: "infrastructure",
      status: "in-development",
      github: "https://github.com/username/cdn-router",
      demo: null,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      stats: { stars: 34, forks: 8, views: 890, likes: 67 },
      date: "Jan 2024",
      featured: false,
      verified: false
    },
    {
      id: 4,
      title: "Sentiment Analysis Bot",
      description: "Real-time Twitter sentiment tracker for crypto assets with predictive analytics.",
      longDescription: "Created a sophisticated sentiment analysis system that monitors social media sentiment for cryptocurrency assets. Uses machine learning models to predict market trends and provide trading insights.",
      tech: ["Python", "TensorFlow", "FastAPI", "React", "TimescaleDB"],
      category: "ai",
      status: "live",
      github: "https://github.com/username/sentiment-bot",
      demo: "https://sentiment-bot.crypto",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      stats: { stars: 92, forks: 31, views: 3200, likes: 203 },
      date: "Dec 2023",
      featured: true,
      verified: true
    },
    {
      id: 5,
      title: "Smart Contract Audit Tool",
      description: "Automated security analysis tool for Solidity smart contracts with vulnerability detection.",
      longDescription: "Developed a comprehensive smart contract auditing tool that automatically detects security vulnerabilities, gas optimization opportunities, and best practice violations in Solidity code.",
      tech: ["Solidity", "Python", "Web3.py", "Vue.js", "SQLite"],
      category: "fintech",
      status: "live",
      github: "https://github.com/username/contract-audit",
      demo: "https://audit-tool.blockchain",
      image: "https://images.unsplash.com/photo-1639762681057-4085b5ad8e21?w=400&h=250&fit=crop",
      stats: { stars: 156, forks: 45, views: 4800, likes: 312 },
      date: "Nov 2023",
      featured: true,
      verified: true
    },
    {
      id: 6,
      title: "Real-time Collaboration Platform",
      description: "Web-based collaborative coding environment with live editing and video chat.",
      longDescription: "Built a comprehensive collaboration platform for remote development teams. Features include real-time code editing, integrated video chat, project management tools, and deployment pipelines.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB", "Docker"],
      category: "productivity",
      status: "live",
      github: "https://github.com/username/collab-platform",
      demo: "https://collab.dev",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      stats: { stars: 67, forks: 18, views: 1600, likes: 134 },
      date: "Oct 2023",
      featured: false,
      verified: true
    }
  ];

  const categories = [
    { id: "all", label: "All Projects", count: portfolioItems.length },
    { id: "fintech", label: "FinTech", count: portfolioItems.filter(p => p.category === "fintech").length },
    { id: "ai", label: "AI & NLP", count: portfolioItems.filter(p => p.category === "ai").length },
    { id: "infrastructure", label: "Infrastructure", count: portfolioItems.filter(p => p.category === "infrastructure").length },
    { id: "productivity", label: "Productivity", count: portfolioItems.filter(p => p.category === "productivity").length }
  ];

  const filteredItems = portfolioItems.filter(item => {
    const matchesFilter = filter === "all" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredItems = portfolioItems.filter(item => item.featured);
  const totalStats = portfolioItems.reduce((acc, item) => ({
    stars: acc.stars + item.stats.stars,
    forks: acc.forks + item.stats.forks,
    views: acc.views + item.stats.views,
    likes: acc.likes + item.stats.likes
  }), { stars: 0, forks: 0, views: 0, likes: 0 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Portfolio</h1>
        <p className="text-slate-500">Showcase of my projects and technical expertise</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="text-indigo-600" size={24} />
            <div>
              <p className="text-slate-500 text-sm">Total Projects</p>
              <p className="text-2xl font-bold text-slate-900">{portfolioItems.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <Star className="text-yellow-600" size={24} />
            <div>
              <p className="text-slate-500 text-sm">GitHub Stars</p>
              <p className="text-2xl font-bold text-slate-900">{totalStats.stars}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <Eye className="text-blue-600" size={24} />
            <div>
              <p className="text-slate-500 text-sm">Total Views</p>
              <p className="text-2xl font-bold text-slate-900">{totalStats.views.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <Heart className="text-red-600" size={24} />
            <div>
              <p className="text-slate-500 text-sm">Likes</p>
              <p className="text-2xl font-bold text-slate-900">{totalStats.likes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      {featuredItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Award className="text-yellow-600" size={24} />
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {item.verified && (
                      <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Verified
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      item.status === 'live' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                    }`}>
                      {item.status === 'live' ? 'Live' : 'In Development'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span>{item.stats.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{item.stats.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {item.github && (
                      <a href={item.github} target="_blank" rel="noopener noreferrer"
                         className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    {item.demo && (
                      <a href={item.demo} target="_blank" rel="noopener noreferrer"
                         className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`whitespace-nowrap px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                filter === category.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* All Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="aspect-video bg-slate-100 relative overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-3 left-3 flex gap-2">
                {item.verified && (
                  <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    ✓ Verified
                  </span>
                )}
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  item.status === 'live' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                }`}>
                  {item.status === 'live' ? 'Live' : 'Dev'}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm mb-3 line-clamp-2">{item.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-1 rounded-md">
                    {tech}
                  </span>
                ))}
                {item.tech.length > 3 && (
                  <span className="text-slate-500 text-xs font-semibold px-2 py-1">
                    +{item.tech.length - 3} more
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span>{item.stats.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={12} />
                    <span>{item.stats.views}</span>
                  </div>
                </div>
                <span>{item.date}</span>
              </div>
              <div className="flex gap-2">
                {item.github && (
                  <a href={item.github} target="_blank" rel="noopener noreferrer"
                     className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1">
                    <Github size={14} />
                    Code
                  </a>
                )}
                {item.demo && (
                  <a href={item.demo} target="_blank" rel="noopener noreferrer"
                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1">
                    <ExternalLink size={14} />
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">No projects found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}