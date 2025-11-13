import { GoogleGenAI } from "@google/genai";
import type { ChatMessage } from "@shared/schema";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const COURSE_CONTEXT = `
You are a helpful course advisor for Shri Shyam Infotech, a leading computer training institute in Patna with 17+ years of experience.

Available Courses:
1. ADCA (Advanced Diploma in Computer Applications) - 12 months, ₹25,000
   - Programming (C, C++, Java), Database Management, Web Development, MS Office, Hardware & Networking
   - Best for: Career in IT, software development, or advanced computer skills

2. DCA (Diploma in Computer Applications) - 6 months, ₹15,000
   - MS Office Suite, Internet, Email, Typing, Basic Programming
   - Best for: Office work, basic computer literacy, beginners

3. Tally Prime with GST - 3 months, ₹12,000
   - Complete Tally features, GST filing, Inventory, Payroll, Banking
   - Best for: Accounting jobs, finance professionals, business owners

4. Kushal Yuva Program (KYP) - 6 months, Government Sponsored (Free for eligible)
   - IT Skills, Communication, Personality Development, Placement Assistance
   - Best for: Youth seeking government-certified free training

5. DEEP MKCL Certification - Varies, ₹8,000 - ₹15,000
   - Digital Literacy, Office Tools, E-commerce, Cyber Safety
   - Best for: Government-recognized certification, career enhancement

Features:
- Expert faculty with 10+ years experience
- Hands-on practical training with modern labs
- 85% placement rate with dedicated placement cell
- Flexible batches: Morning, Afternoon, Evening, Weekend
- Certificate upon completion

Your role:
- Understand student's goals, background, and interests
- Recommend the most suitable course(s) based on their needs
- Answer questions about course duration, fees, syllabus, and career prospects
- Be friendly, helpful, and encourage them to enroll or book a free demo
- Keep responses concise (2-3 sentences maximum)
`;

export async function getCourseRecommendation(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    // Build conversation context
    const messages = conversationHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Add current user message
    messages.push({
      role: "user",
      parts: [{ text: userMessage }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: COURSE_CONTEXT,
        temperature: 0.7,
        maxOutputTokens: 200,
      },
      contents: messages,
    });

    return response.text || "I'm here to help you find the perfect course. Could you tell me about your learning goals?";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to get course recommendation");
  }
}
