import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getCopilotResponse(message) {
  try {
    const model = genAI.getGenerativeModel({ model: import.meta.env.VITE_GEMINI_MODEL });
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: 'You are Fin AI Copilot, a helpful customer service assistant. Be concise and friendly in your responses.',
        },
        {
          role: 'model',
          parts: 'I understand. I am Fin AI Copilot, and I will help users with their customer service inquiries in a friendly and concise manner.',
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    return "I apologize, but I'm having trouble processing your request right now.";
  }
}