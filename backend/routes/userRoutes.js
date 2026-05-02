const express = require("express");
const router = express.Router();
const User = require("../Models/User");

// ── Helper ────────────────────────────────────────────────────────────────────
function safeUser(user) {
  const obj = user.toObject();
  delete obj.password;
  return obj;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

// POST /api/users/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      trustScore: 10,
      badges: ["New Builder"],
    });

    await user.save();
    res.status(201).json({ message: "Account created successfully.", user: safeUser(user) });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase(), password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.json(safeUser(user));
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error during login." });
  }
});

// ── Profile ───────────────────────────────────────────────────────────────────

// GET /api/users/profile/:id
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(safeUser(user));
  } catch (err) {
    console.error("Get profile error:", err.message);
    res.status(500).json({ message: "Server error fetching profile." });
  }
});

// PUT /api/users/profile/:id
router.put("/profile/:id", async (req, res) => {
  try {
    const allowed = ["name", "title", "avatar", "location", "bio"];
    const updates = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(safeUser(user));
  } catch (err) {
    console.error("Update profile error:", err.message);
    res.status(500).json({ message: "Server error updating profile." });
  }
});

// ── Projects ──────────────────────────────────────────────────────────────────

// GET /api/users/:id/projects
router.get("/:id/projects", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("projects");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user.projects);
  } catch (err) {
    console.error("Get projects error:", err.message);
    res.status(500).json({ message: "Server error fetching projects." });
  }
});

// POST /api/users/:id/projects
router.post("/:id/projects", async (req, res) => {
  try {
    const { title, description, tags, githubUrl, liveUrl, category } = req.body;
    if (!title) return res.status(400).json({ message: "Project title is required." });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.projects.push({ title, description, tags, githubUrl, liveUrl, category });
    await user.save();

    res.status(201).json(user.projects[user.projects.length - 1]);
  } catch (err) {
    console.error("Add project error:", err.message);
    res.status(500).json({ message: "Server error adding project." });
  }
});

// ── Skills ────────────────────────────────────────────────────────────────────

// GET /api/users/:id/skills
router.get("/:id/skills", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("skills");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user.skills);
  } catch (err) {
    console.error("Get skills error:", err.message);
    res.status(500).json({ message: "Server error fetching skills." });
  }
});

// POST /api/users/:id/skills/verify
router.post("/:id/skills/verify", async (req, res) => {
  try {
    const { name, level, source, sourceType } = req.body;
    if (!name) return res.status(400).json({ message: "Skill name is required." });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Update existing or add new
    const existing = user.skills.find((s) => s.name === name);
    if (existing) {
      existing.level = level ?? existing.level;
      existing.source = source ?? existing.source;
      existing.sourceType = sourceType ?? existing.sourceType;
      existing.verified = true;
      existing.endorsements += 1;
    } else {
      user.skills.push({ name, level: level ?? 50, source, sourceType, verified: true, endorsements: 1 });
    }

    // Recalculate trust score
    const verifiedCount = user.skills.filter((s) => s.verified).length;
    user.trustScore = Math.min(100, 10 + verifiedCount * 8 + user.projects.filter((p) => p.verified).length * 5);

    await user.save();
    res.json({ message: "Skill verified.", skills: user.skills, trustScore: user.trustScore });
  } catch (err) {
    console.error("Verify skill error:", err.message);
    res.status(500).json({ message: "Server error verifying skill." });
  }
});

module.exports = router;
