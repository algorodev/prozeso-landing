import { createGoogleGenerativeAI } from "@ai-sdk/google";

function getGoogleApiKey(): string {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    console.error("Environment variables available:", {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY ? "***" : "undefined",
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY
        ? "***"
        : "undefined",
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ? "***" : "undefined",
      NODE_ENV: process.env.NODE_ENV,
    });
    throw new Error(
      "Google AI API key not found. Please set GOOGLE_API_KEY in your .env file and restart the Next.js server.",
    );
  }

  return apiKey;
}

export function createGoogleProvider() {
  const apiKey = getGoogleApiKey();
  return createGoogleGenerativeAI({ apiKey });
}

export function getGoogleModel(modelId: string) {
  console.log("🔑 [GOOGLE AI] Creating model:", modelId);
  const provider = createGoogleProvider();
  console.log("🔑 [GOOGLE AI] Provider created successfully");
  return provider(modelId);
}
