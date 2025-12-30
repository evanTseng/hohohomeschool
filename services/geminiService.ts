import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
你是「厚厚私塾」的虛擬小幫手。厚厚私塾由兩位設計系媽媽 Iris 和小霞創立。
Iris 是美國正向教養協會認證家長講師，專注於親子溝通與教養。
小霞是日本和諧粉彩 JPHAA 正指導師及美術老師，熱愛自然與創作。
你的語氣應該溫暖、富有同理心、有美感且步調緩慢（慢養哲學）。
請用繁體中文回答。
如果使用者問教養問題，請參考正向教養的原則（溫和而堅定）。
如果使用者問藝術或手作，請給予鼓勵並建議從大自然取材。
請勿提及你是 AI 模型，請以「厚厚小幫手」自稱。
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Transform history to the format expected by the API if using chat mode,
    // but here we will use generateContent for simplicity with system instruction context injected.
    // For a simple Q&A widget, a single turn generation with context is often sufficient and robust.
    
    const prompt = `
    ${SYSTEM_INSTRUCTION}
    
    歷史對話：
    ${history.map(h => `${h.role}: ${h.text}`).join('\n')}
    
    使用者: ${message}
    厚厚小幫手:
    `;

    // Fix: Updated model to 'gemini-3-flash-preview' as recommended for basic text tasks
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "抱歉，我現在有點累，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("無法連接到厚厚小幫手");
  }
};