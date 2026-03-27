// backend/src/services/llmService.js
const Groq = require("groq-sdk");
require("dotenv").config();

// Bhai, .env mein GROQ_API_KEY daalna mat bhoolna!
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const extractProfileData = async (userInput) => {
  try {
    // System prompt ekdum strict rakha hai taaki model line se bahar na jaye
    const systemPrompt = `
      You are an expert AI recruitment assistant. Extract professional information from the user's input.
      You MUST respond ONLY with a valid JSON object. Do not include any other text, markdown, or explanation.
      
      Required JSON Schema:
      {
        "skills": ["skill1", "skill2"],
        "experience": [
          {
            "role": "Job Title",
            "company": "Company Name",
            "duration": "Time period",
            "description": "Short description of what they did"
          }
        ],
        "projects": [
          {
            "title": "Project Name",
            "techStack": ["tech1", "tech2"],
            "description": "What the project does"
          }
        ],
        "summary": "A 2-3 sentence professional summary based on the input."
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput },
      ],
      // Llama 3 70B use kar rahe hain for better reasoning and strict JSON adherence
      model: "llama-3.3-70b-versatile",
      temperature: 0.2, // Low temp so it doesn't get overly creative and break the JSON
      // YEH SABSE IMPORTANT HAI BHAI:
      response_format: { type: "json_object" },
    });

    const responseText = chatCompletion.choices[0]?.message?.content || "{}";

    // Groq json_object format guarantee karta hai valid JSON, toh direct parse kar sakte hain
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Groq AI Error Bhai:", error);
    throw new Error("AI service ne dhoka de diya. Phat gaya code.");
  }
};

module.exports = { extractProfileData };
