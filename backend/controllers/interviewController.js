const  reviewAnswerWithAI = require("../services/interviewService.js");

const reviewAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Check required fields
    if (
      typeof question !== "string" ||
      typeof answer !== "string" ||
      !question.trim() ||
      !answer.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required.",
      });
    }

    // Limit input size
    if (question.length > 2000 || answer.length > 10000) {
      return res.status(400).json({
        success: false,
        message: "Question or answer is too long.",
      });
    }

    // Call AI service
    const feedback = await reviewAnswerWithAI(
      question.trim(),
      answer.trim()
    );

    return res.status(200).json({
      success: true,
      message: "Interview answer reviewed successfully.",
      feedback,
    });
  } catch (error) {
    console.error("Interview Review Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to review your answer. Please try again.",
    });
  }
};

module.exports = reviewAnswer ;