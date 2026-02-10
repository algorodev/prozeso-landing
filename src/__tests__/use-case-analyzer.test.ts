import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockGenerateText, mockGetGoogleModel } = vi.hoisted(() => ({
  mockGenerateText: vi.fn(),
  mockGetGoogleModel: vi.fn(),
}));

vi.mock("ai", () => ({
  generateText: mockGenerateText,
  Output: {
    object: (opts: { schema: unknown }) => ({ schema: opts.schema }),
  },
}));

vi.mock("@/lib/config/google-ai", () => ({
  getGoogleModel: mockGetGoogleModel,
}));

import { analyzeUseCase } from "@/lib/agents/use-case-analyzer";

const mockAnalysisOutput = {
  painPoints: [
    {
      identified: "Slow service",
      category: "operational",
      rootCauses: ["Manual process"],
      impact: {
        revenue: "high",
        cost: "medium",
        customerSatisfaction: "high",
        productivity: "medium",
      },
      priority: 8,
      automationOpportunities: ["AI receptionist"],
    },
  ],
  summary: "Business needs automation",
  keyInsights: ["Key insight 1"],
  recommendedFocusAreas: ["Customer service"],
};

describe("analyzeUseCase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetGoogleModel.mockReturnValue({ id: "model" });
    mockGenerateText.mockResolvedValue({ output: mockAnalysisOutput });
  });

  it("calls generateText with the correct model", async () => {
    await analyzeUseCase("10-50", "restaurants", "slow service", "en");
    expect(mockGetGoogleModel).toHaveBeenCalledWith("gemini-2.0-flash-exp");
    expect(mockGenerateText).toHaveBeenCalledTimes(1);
  });

  it("returns parsed output as UseCaseAnalysisResult", async () => {
    const result = await analyzeUseCase("10-50", "restaurants", "slow service");
    expect(result).toEqual(mockAnalysisOutput);
  });

  it("passes locale to prompt", async () => {
    await analyzeUseCase("10-50", "restaurants", "slow service", "es");
    const call = mockGenerateText.mock.calls[0][0];
    expect(call.prompt).toContain("Spanish");
  });

  it("throws when AI call fails", async () => {
    mockGenerateText.mockRejectedValue(new Error("AI failed"));
    await expect(
      analyzeUseCase("10-50", "restaurants", "slow service"),
    ).rejects.toThrow("AI failed");
  });
});
