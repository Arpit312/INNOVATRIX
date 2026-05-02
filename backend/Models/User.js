const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  githubUrl: String,
  liveUrl: String,
  category: String,
  verified: { type: Boolean, default: false },
  validationCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, default: 0, min: 0, max: 100 },
  source: { type: String, default: "Self-reported" },
  sourceType: { type: String, enum: ["assessment", "peer", "project", "self"], default: "self" },
  verified: { type: Boolean, default: false },
  endorsements: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    // Profile
    title: { type: String, default: "Full-Stack Engineer" },
    avatar: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },
    // Trust
    trustScore: { type: Number, default: 0, min: 0, max: 100 },
    badges: [String],
    // Data
    projects: [projectSchema],
    skills: [skillSchema],
    // Meta
    joinDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
