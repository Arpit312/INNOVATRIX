export const USER = {
  name: "Arpit Pathak",
  title: "Full-Stack Engineer & UX Strategist",
  avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=arya",
  trustScore: 91,
  badges: ["Verified Expert", "Top Contributor"],
  location: "Bhopal, India",
  joinDate: "Jan 2022",
};

export const PROJECTS = [
  {
    id: 1,
    title: "FinFlow - Personal Finance OS",
    description:
      "A real-time budget intelligence dashboard with ML-driven spending predictions, bank-grade encryption, and interactive Sankey charts.",
    tags: ["React", "FastAPI", "TensorFlow", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://finflow.demo",
    validators: [
      { name: "Priya S.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=priya" },
      { name: "Rajan K.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=rajan" },
      { name: "Sia T.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=sia" },
      { name: "Dev M.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=dev" },
    ],
    validationCount: 18,
    category: "Fintech",
  },
  {
    id: 2,
    title: "EduTrack - LMS for Micro-Schools",
    description:
      "A lightweight learning management system built for grassroots education networks with offline-first PWA support and adaptive quizzing.",
    tags: ["Next.js", "Supabase", "Tailwind", "PWA"],
    githubUrl: "https://github.com",
    liveUrl: "https://edutrack.demo",
    validators: [
      { name: "Neha R.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=neha" },
      { name: "Amit J.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=amit" },
      { name: "Leela P.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=leela" },
    ],
    validationCount: 11,
    category: "EdTech",
  },
  {
    id: 3,
    title: "ShardDB - Distributed Cache Layer",
    description:
      "An open-source Redis-compatible caching middleware with consistent hashing, TTL-aware eviction, and Prometheus metrics out of the box.",
    tags: ["Go", "Redis", "Docker", "gRPC"],
    githubUrl: "https://github.com",
    liveUrl: null,
    validators: [
      { name: "Karan V.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=karan" },
      { name: "Meera D.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=meera" },
    ],
    validationCount: 7,
    category: "Infrastructure",
  },
  {
    id: 4,
    title: "MoodMap - Sentiment Analytics",
    description:
      "A SaaS product that runs multi-lingual NLP pipelines over customer feedback streams, surfacing actionable sentiment trends in real time.",
    tags: ["Python", "spaCy", "Kafka", "D3.js"],
    githubUrl: "https://github.com",
    liveUrl: "https://moodmap.demo",
    validators: [
      { name: "Ananya G.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=ananya" },
      { name: "Rohan B.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=rohan" },
      { name: "Tara S.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=tara" },
      { name: "Varun L.", avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=varun" },
    ],
    validationCount: 24,
    category: "AI / NLP",
  },
];

export const SKILLS = [
  {
    id: 1,
    name: "Python",
    level: 95,
    source: "Passed Assessment",
    sourceType: "assessment",
    endorsements: 34,
  },
  {
    id: 2,
    name: "UI / UX Design",
    level: 88,
    source: "Peer Reviewed",
    sourceType: "peer",
    endorsements: 22,
  },
  {
    id: 3,
    name: "React & Next.js",
    level: 92,
    source: "Project Linked",
    sourceType: "project",
    endorsements: 29,
  },
  {
    id: 4,
    name: "Machine Learning",
    level: 79,
    source: "Passed Assessment",
    sourceType: "assessment",
    endorsements: 17,
  },
  {
    id: 5,
    name: "System Design",
    level: 83,
    source: "Peer Reviewed",
    sourceType: "peer",
    endorsements: 14,
  },
  {
    id: 6,
    name: "Go (Golang)",
    level: 71,
    source: "Project Linked",
    sourceType: "project",
    endorsements: 9,
  },
];

export const SKILL_OPTIONS = [
  "Python",
  "JavaScript / TypeScript",
  "React & Next.js",
  "UI / UX Design",
  "Machine Learning",
  "System Design",
  "Go (Golang)",
  "Rust",
  "Data Engineering",
  "DevOps & CI/CD",
  "Blockchain / Web3",
  "Mobile (Flutter / React Native)",
];
