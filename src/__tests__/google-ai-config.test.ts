import { afterEach, describe, expect, it, vi } from "vitest";

const mockCreateGoogleGenerativeAI = vi.fn();

vi.mock("@ai-sdk/google", () => ({
  createGoogleGenerativeAI: mockCreateGoogleGenerativeAI,
}));

describe("google-ai config", () => {
  const originalEnv = process.env.GOOGLE_API_KEY;

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.GOOGLE_API_KEY = originalEnv;
    } else {
      delete process.env.GOOGLE_API_KEY;
    }
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("createGoogleProvider throws when GOOGLE_API_KEY is missing", async () => {
    delete process.env.GOOGLE_API_KEY;
    const { createGoogleProvider } = await import("@/lib/config/google-ai");
    expect(() => createGoogleProvider()).toThrow("Google AI API key not found");
  });

  it("createGoogleProvider calls createGoogleGenerativeAI with the key", async () => {
    process.env.GOOGLE_API_KEY = "test-key-123";
    mockCreateGoogleGenerativeAI.mockReturnValue(() => ({}));
    const { createGoogleProvider } = await import("@/lib/config/google-ai");
    createGoogleProvider();
    expect(mockCreateGoogleGenerativeAI).toHaveBeenCalledWith({
      apiKey: "test-key-123",
    });
  });

  it("getGoogleModel calls provider with modelId", async () => {
    process.env.GOOGLE_API_KEY = "test-key-123";
    const mockModel = { id: "gemini-2.0-flash-exp" };
    const mockProvider = vi.fn().mockReturnValue(mockModel);
    mockCreateGoogleGenerativeAI.mockReturnValue(mockProvider);
    const { getGoogleModel } = await import("@/lib/config/google-ai");
    const result = getGoogleModel("gemini-2.0-flash-exp");
    expect(mockProvider).toHaveBeenCalledWith("gemini-2.0-flash-exp");
    expect(result).toBe(mockModel);
  });
});
