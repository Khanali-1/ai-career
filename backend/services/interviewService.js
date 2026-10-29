const { GoogleGenAI } = require("@google/genai");

const reviewAnswerWithAI = async (question, answer) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from .env");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are a professional technical interview coach.

Evaluate the candidate's answer fairly and constructively.

Interview question:
${question}

Candidate's answer:
${answer}

Return ONLY valid JSON using this exact structure:
{
  "score": 75,
  "strengths": ["First strength", "Second strength"],
  "improvements": ["First improvement", "Second improvement"],
  "improvedAnswer": "A stronger sample answer",
  "summary": "Short overall feedback"
}

Rules:
- Score must be an integer from 0 to 100.
- Evaluate correctness, clarity, relevance and completeness.
- Do not give a high score to an empty or irrelevant answer.
- Keep feedback specific to the candidate's answer.
- Do not claim the sample answer is the candidate's own experience.
- Use simple, helpful English.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text;

  if (!text) {
    throw new Error("AI returned an empty response");
  }

  const feedback = JSON.parse(text);

  if (
    typeof feedback.score !== "number" ||
    !Array.isArray(feedback.strengths) ||
    !Array.isArray(feedback.improvements) ||
    typeof feedback.improvedAnswer !== "string" ||
    typeof feedback.summary !== "string"
  ) {
    throw new Error("AI returned an invalid feedback format");
  }

  feedback.score = Math.max(0, Math.min(100, Math.round(feedback.score)));

  return feedback;
};

module.exports =  reviewAnswerWithAI ;