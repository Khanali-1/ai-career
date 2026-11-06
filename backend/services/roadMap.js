const { GoogleGenAI } = require("@google/genai");

const generateRoadmapWithAI = async (role, level) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from .env");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are an expert software career mentor.

Create a personalized career roadmap for a user.

Career role: ${role}
Experience level: ${level}

Rules:
- Beginner: focus on fundamentals.
- Intermediate: focus on practical projects and job readiness.
- Advanced: focus on architecture, testing and advanced skills.
- Return exactly 5 actionable learning steps.
- Each step must have a title and description.
- Use practical, clear English.
- Return valid JSON only, without Markdown.

Use this JSON format:
{
  "title": "Career roadmap title",
  "role": "${role}",
  "level": "${level}",
  "steps": [
    {
      "title": "Step title",
      "description": "What the user should learn or build"
    }
  ]
}
`;

  const models = [
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash",
    "gemini-3.8-flash",
  ];

  let lastError = null;

  for (const model of models) {
    try {
      console.log(`Roadmap → model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      let text = response?.text;
      if (!text) continue;

      // Markdown code block clean karna
      text = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();

      const roadmap = JSON.parse(text);

      if (!Array.isArray(roadmap.steps) || roadmap.steps.length === 0) {
        continue;
      }

      console.log(`✅ Roadmap success with ${model}`);
      return roadmap;

    } catch (error) {
      lastError = error;
      console.log(`❌ ${model} failed for roadmap:`, error.message);
    }
  }

  throw new Error(
    "Roadmap service is temporarily unavailable. Please try again."
  );
};

module.exports = generateRoadmapWithAI;