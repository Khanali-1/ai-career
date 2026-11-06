const analyzeResumeWithAI = async (file) => {
  const { GoogleGenAI } = await import("@google/genai");

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from .env");
  }

  if (!file || !file.buffer) {
    throw new Error("Resume PDF file is missing.");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are a professional resume reviewer.

Analyze the attached PDF resume based only on its actual content.

Return a JSON object with exactly these fields:
{
  "score": 0,
  "summary": "Short overall assessment",
  "strengths": ["Strength 1", "Strength 2"],
  "improvements": ["Improvement 1", "Improvement 2"],
  "missingSkills": ["Skill 1", "Skill 2"]
}

Rules:
- score must be an integer between 0 and 100.
- Give a fair score based on skills, projects, experience, education, clarity, and resume structure.
- Do not invent qualifications or experience.
- If something is not present, say it is not evident in the resume.
- Give specific and practical suggestions.
- Keep the response in English.
- Return valid JSON only.
`;

  // Models order: pehle sabse available, phir better quality
  const models = [
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash",
    "gemini-3.8-flash",
  ];

  let lastError = null;

  for (const model of models) {
    const MAX_RETRIES = 2;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Resume analysis → model: ${model} | attempt ${attempt + 1}`);

        const response = await ai.models.generateContent({
          model,
          contents: [
            {
              role: "user",
              parts: [
                {
                  inlineData: {
                    mimeType: "application/pdf",
                    data: file.buffer.toString("base64"),
                  },
                },
                { text: prompt },
              ],
            },
          ],
          config: {
            responseMimeType: "application/json",
          },
        });

        if (!response?.text) {
          throw new Error("Empty response");
        }

        const result = JSON.parse(response.text);

        if (
          !Number.isFinite(result.score) ||
          !Array.isArray(result.strengths) ||
          !Array.isArray(result.improvements) ||
          !Array.isArray(result.missingSkills) ||
          typeof result.summary !== "string"
        ) {
          throw new Error("Invalid analysis format");
        }

        result.score = Math.max(0, Math.min(100, Math.round(result.score)));
        console.log(`✅ Resume analysis success with ${model}`);
        return result;

      } catch (error) {
        lastError = error;
        const status = Number(error.status || error.code);
        const msg = String(error.message || "");

        const isTemporary =
          [500, 502, 503, 504].includes(status) ||
          /UNAVAILABLE|overloaded|temporarily unavailable|high demand/i.test(msg);

        if (!isTemporary || attempt === MAX_RETRIES) {
          console.log(`❌ ${model} failed. Trying next model...`);
          break; // next model
        }

        const delay = 1500 * Math.pow(2, attempt);
        console.log(`Temporary error. Retrying in ${delay / 1000}s...`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  console.error("All models failed for resume analysis:", lastError?.message);
  throw new Error(
    "Resume analysis service is temporarily busy. Please try again in a few moments."
  );
};

module.exports = {analyzeResumeWithAI };