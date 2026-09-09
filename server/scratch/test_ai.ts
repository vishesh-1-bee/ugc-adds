import dotenv from 'dotenv';
dotenv.config();
import ai from '../config/ai.js';

async function testAI() {
  try {
    console.log("Testing Gemini API with key:", process.env.GEMINI_API_KEY ? "Present" : "Missing");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Hello, respond with OK if you are working.'
    });
    console.log("Gemini Response:", response.text);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
  }
}

testAI();
