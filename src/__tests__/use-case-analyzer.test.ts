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
import type { UseCasePipelineInput } from "@/types/UseCaseReport";

const fakeInput: UseCasePipelineInput = {
  companySize: "10-50",
  industry: "restaurants",
  role: "founder",
  painPointChips: ["missedCalls"],
  painPointsDetail: "slow service",
  goal: "saveTime",
};

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
    await analyzeUseCase(fakeInput, "en");
    expect(mockGetGoogleModel).toHaveBeenCalledWith("gemini-2.5-flash");
    expect(mockGenerateText).toHaveBeenCalledTimes(1);
  });

  it("returns parsed output as UseCaseAnalysisResult", async () => {
    const result = await analyzeUseCase(fakeInput);
    expect(result).toEqual(mockAnalysisOutput);
  });

  it("passes locale to prompt", async () => {
    await analyzeUseCase(fakeInput, "es");
    const call = mockGenerateText.mock.calls[0][0];
    expect(call.prompt).toContain("Spanish");
  });

  it("throws when AI call fails", async () => {
    mockGenerateText.mockRejectedValue(new Error("AI failed"));
    await expect(analyzeUseCase(fakeInput)).rejects.toThrow("AI failed");
  });
});
