import OpenAI from "openai";

export const openaiClient = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPEN_AI_CHAT_API_KEY,
    dangerouslyAllowBrowser: true,
});
