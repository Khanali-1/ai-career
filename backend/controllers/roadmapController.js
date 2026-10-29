
const generateRoadmapWithAI = require("../services/roadMap.js");

const generateRoadmap = async (req, res) => {
  try {
    const { role, level } = req.body;

    const allowedRoles = [
      "MERN Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Software Engineer",
    ];

    const allowedLevels = [
      "Beginner",
      "Intermediate",
      "Advanced",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid career role",
      });
    }

    if (!allowedLevels.includes(level)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid experience level",
      });
    }

    const roadmap = await generateRoadmapWithAI(role, level);

    return res.status(200).json({
      success: true,
      message: "Career roadmap generated successfully",
      roadmap,
    });
  } catch (error) {
    console.error("Roadmap generation error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to generate roadmap. Please try again.",
    });
  }
};

module.exports =  generateRoadmap ;
