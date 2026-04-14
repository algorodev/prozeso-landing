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

import { generateReport } from "@/lib/agents/report-generator";
import type {
  UseCaseAnalysisResult,
  UseCasePipelineInput,
} from "@/types/UseCaseReport";

const fakeInput: UseCasePipelineInput = {
  companySize: "10-50",
  industry: "restaurants",
  role: "founder",
  painPointChips: ["missedCalls"],
  painPointsDetail: "slow service",
  goal: "saveTime",
};

const mockAnalysis: UseCaseAnalysisResult = {
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

const mockReportOutput = {
  metadata: {
    generatedAt: "2024-01-01T00:00:00.000Z",
    companySize: "old",
    industry: "old",
    locale: "en" as const,
  },
  executiveSummary: {
    overview: "Overview",
    mainChallenges: ["Challenge"],
    keyOpportunities: ["Opportunity"],
  },
  businessContext: {
    industry: "restaurants",
    companySize: "10-50",
    industryInsights: ["Insight"],
    sizeConsiderations: ["Consideration"],
  },
  painPointsAnalysis: {
    summary: "Summary",
    painPoints: [
      {
        id: "pp1",
        title: "Pain",
        description: "Desc",
        category: "operational" as const,
        impact: {
          revenue: "high" as const,
          cost: "high" as const,
          customerSatisfaction: "high" as const,
          productivity: "high" as const,
        },
        priority: 8 as 8,
        affectedAreas: ["Area"],
      },
    ],
    priorityInsights: ["Insight"],
  },
  automationRecommendations: {
    summary: "Summary",
    recommendations: [
      {
        id: "rec1",
        name: "AI Receptionist",
        description: "Desc",
        category: "aiReceptionist" as const,
        painPointsAddressed: ["pp1"],
        expectedBenefits: { timeSaved: "10h" },
        expectedMetrics: [{ metric: "Calls", value: "100" }],
        implementation: {
          complexity: "low" as const,
          timeline: "2 weeks",
          prerequisites: [],
        },
      },
    ],
    overallImpact: "Positive",
  },
  expectedImpact: {
    summary: "Good",
    projections: [
      {
        timeframe: "3months" as const,
        metrics: [
          { label: "Revenue", value: "+20%", change: "increase" as const },
        ],
        description: "Desc",
      },
    ],
    roi: {
      description: "ROI",
      keyMetrics: [{ label: "ROI", value: "300%" }],
    },
  },
  implementationRoadmap: {
    overview: "Roadmap",
    phases: [
      {
        phase: 1 as 1,
        name: "Quick wins",
        timeline: "0-3 months",
        description: "Desc",
        recommendations: ["rec1"],
        expectedOutcomes: ["Outcome"],
      },
    ],
    totalTimeline: "12 months",
  },
  nextSteps: {
    immediateActions: ["Action"],
    consultationOffer: {
      title: "Free",
      description: "Desc",
      cta: "Book now",
    },
    gettingStarted: ["Step 1"],
  },
};

describe("generateReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetGoogleModel.mockReturnValue({ id: "model" });
    mockGenerateText.mockResolvedValue({ output: mockReportOutput });
  });

  it("calls generateText with analysis JSON in prompt", async () => {
    await generateReport(mockAnalysis, fakeInput, "en");
    const call = mockGenerateText.mock.calls[0][0];
    expect(call.prompt).toContain(JSON.stringify(mockAnalysis, null, 2));
  });

  it("overrides metadata with correct values", async () => {
    const result = await generateReport(mockAnalysis, fakeInput, "es");
    expect(result.metadata.companySize).toBe("10-50");
    expect(result.metadata.industry).toBe("restaurants");
    expect(result.metadata.locale).toBe("es");
    expect(result.metadata.generatedAt).not.toBe("2024-01-01T00:00:00.000Z");
  });

  it("passes locale to prompt", async () => {
    await generateReport(mockAnalysis, fakeInput, "es");
    const call = mockGenerateText.mock.calls[0][0];
    expect(call.prompt).toContain("Spanish");
  });

  it("throws when AI call fails", async () => {
    mockGenerateText.mockRejectedValue(new Error("AI failed"));
    await expect(generateReport(mockAnalysis, fakeInput)).rejects.toThrow(
      "AI failed",
    );
  });
});
