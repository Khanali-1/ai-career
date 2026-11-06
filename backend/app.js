const express = require("express");
const cors = require("cors");
const path = require("path");

const profileRoutes = require("./routes/profileRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const jobsRoutes = require("./routes/jobsRoutes.js");
const resumeRoutes = require("./routes/resumeRoutes.js");
const roadRoutes = require("./routes/roadRoutes.js");
const interviewRoutes = require("./routes/interviewRoutes.js");
const savedJobRoutes = require("./routes/savedJobRoutes.js");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/job", jobsRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/roadmap", roadRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/saved-jobs", savedJobRoutes);

// Uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("AI Career is running here");
});

// Vercel ke liye zaroori
module.exports = app;