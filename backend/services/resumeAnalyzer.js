const analyzeResumeWithAI = async (file) => {
  // 1. Gemini ki official SDK ko dynamically import kar rahe hain.
  // CommonJS backend mein import() use karke SDK load kar sakte hain.
  // GoogleGenAI class ko module se nikal rahe hain.
  const { GoogleGenAI } = await import("@google/genai");

  // 2. Check kar rahe hain ke Gemini API key .env file mein mojood hai ya nahi.
  // Agar key nahi mili, to error throw hoga aur function aage nahi chalega.
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from .env");
  }

  // 3. Gemini AI ka client object bana rahe hain.
  // API key ki madad se hamara backend Gemini service se connect karega.
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  // 4. AI ke liye instructions likh rahe hain.
  // Prompt AI ko batata hai ke resume ka analysis kaise karna hai
  // aur response mein kaun se fields return karne hain.
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
    - Give a fair score based on skills, projects, experience,
      education, clarity, and resume structure.
    - Do not invent qualifications or experience.
    - If something is not present, say it is not evident in the resume.
    - Give specific and practical suggestions.
    - Keep the response in English.
    - Return valid JSON only.
  `;

  // 5. Gemini ko request bhej rahe hain.
  // generateContent() AI se content generate/analyze karwata hai.
  // await ka matlab hai ke response aane tak wait karo.
  const response = await ai.models.generateContent({
    // AI model ka naam select karte hain.
    // Is model ID ko apni Gemini API ki supported models list se verify karo.
    model: "gemini-3.8-flash",

    // 6. Gemini ko user ka message bhej rahe hain.
    // Is message mein PDF file bhi hai aur analysis instructions bhi.
    contents: [
      {
        role: "user",

        // parts ke andar message ke different parts rakh sakte hain.
        parts: [
          {
            // 7. PDF file Gemini ko attach kar rahe hain.
            inlineData: {
              // Gemini ko batate hain ke file PDF format mein hai.
              mimeType: "application/pdf",

              // Multer ne PDF ko memory mein buffer ke andar rakha hai.
              // Buffer ko Base64 string mein convert kar rahe hain,
              // taake PDF ka data Gemini request mein bheja ja sake.
              data: file.buffer.toString("base64"),
            },
          },

          {
            // 8. Resume analyze karne ke liye prompt bhi bhej rahe hain.
            text: prompt,
          },
        ],
      },
    ],

    // 9. Gemini se response JSON format mein mang rahe hain.
    // Is se JSON response milne mein madad hoti hai,
    // lekin response ko phir bhi validate karna zaroori hai.
    config: {
      responseMimeType: "application/json",
    },
  });

  // 10. Gemini ka response.text aam tor par JSON string hota hai.
  // JSON.parse() us string ko JavaScript object mein convert karta hai.
  const result = JSON.parse(response.text);

  // 11. AI ke response ka basic validation kar rahe hain.
  // Check karte hain ke score number ho aur arrays/summary sahi type ki hon.
  // Agar format ghalat hua, to error throw hoga.
  if (
    !Number.isFinite(result.score) ||
    !Array.isArray(result.strengths) ||
    !Array.isArray(result.improvements) ||
    !Array.isArray(result.missingSkills) ||
    typeof result.summary !== "string"
  ) {
    throw new Error("Gemini returned an invalid analysis format.");
  }

  // 12. Score ko 0 se 100 ke darmiyan rakh rahe hain.
  // Math.round() decimal score ko nearest integer banata hai.
  // Math.min() maximum 100 aur Math.max() minimum 0 enforce karta hai.
  result.score = Math.max(0, Math.min(100, Math.round(result.score)));

  // 13. Final analyzed resume object return kar rahe hain.
  // Controller is result ko frontend ko JSON response mein bhej sakta hai.
  return result;
};

// 14. Function ko doosri backend files mein use karne ke liye export kar rahe hain.
// Example: const { analyzeResumeWithAI } = require("../services/resumeAI.js");
module.exports = { analyzeResumeWithAI };
