const { analyzeResumeWithAI } = require("../services/resumeAnalyzer.js");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a PDF file.",
      });
    }

    console.log("Analyzing resume:", req.file.originalname);

    const analysis = await analyzeResumeWithAI(req.file);

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully!",
      analysis,
    });
  } catch (error) {
    console.error("Resume analysis error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Resume analysis failed. Please try again.",
    });
  }
};

module.exports =  uploadResume ;