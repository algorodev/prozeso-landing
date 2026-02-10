import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockAnalyzeUseCase, mockGenerateReport } = vi.hoisted(() => ({
  mockAnalyzeUseCase: vi.fn(),
  mockGenerateReport: vi.fn(),
}));

vi.mock("@/lib/agents/use-case-analyzer", () => ({
  analyzeUseCase: mockAnalyzeUseCase,
}));

vi.mock("@/lib/agents/report-generator", () => ({
  generateReport: mockGenerateReport,
}));

import { runUseCasePipeline } from "@/lib/agents/pipeline";

const fakeAnalysis = {
  painPoints: [{ identified: "test" }],
  summary: "Summary",
  keyInsights: ["Insight"],
  recommendedFocusAreas: ["Area"],
};

const fakeReport = {
  executiveSummary: { overview: "Overview" },
  painPointsAnalysis: { painPoints: [{ id: "pp1" }] },
  automationRecommendations: { recommendations: [{ id: "rec1" }] },
  implementationRoadmap: { phases: [{ phase: 1 }] },
  expectedImpact: { roi: { description: "ROI" } },
};

describe("runUseCasePipeline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAnalyzeUseCase.mockResolvedValue(fakeAnalysis);
    mockGenerateReport.mockResolvedValue(fakeReport);
  });

  it("transitions through analyzing → generating → completed", async () => {
    const statuses: string[] = [];
    await runUseCasePipeline("10-50", "restaurants", "slow service", "en", {
      onStatusChange: (s) => statuses.push(s),
    });
    expect(statuses).toEqual(["analyzing", "generating", "completed"]);
  });

  it("calls onAnalysisComplete and onReportComplete callbacks", async () => {
    const onAnalysisComplete = vi.fn();
    const onReportComplete = vi.fn();
    await runUseCasePipeline("10-50", "restaurants", "slow service", "en", {
      onAnalysisComplete,
      onReportComplete,
    });
    expect(onAnalysisComplete).toHaveBeenCalledWith(fakeAnalysis);
    expect(onReportComplete).toHaveBeenCalledWith(fakeReport);
  });

  it("returns completed state with analysis and report", async () => {
    const state = await runUseCasePipeline(
      "10-50",
      "restaurants",
      "slow service",
    );
    expect(state.status).toBe("completed");
    expect(state.analysis).toEqual(fakeAnalysis);
    expect(state.report).toEqual(fakeReport);
    expect(state.error).toBeNull();
  });

  it("handles analyzeUseCase error", async () => {
    mockAnalyzeUseCase.mockRejectedValue(new Error("Analysis failed"));
    const onError = vi.fn();
    const state = await runUseCasePipeline(
      "10-50",
      "restaurants",
      "slow service",
      "en",
      { onError },
    );
    expect(state.status).toBe("error");
    expect(state.error).toBe("Analysis failed");
    expect(onError).toHaveBeenCalledWith("Analysis failed");
  });

  it("handles generateReport error", async () => {
    mockGenerateReport.mockRejectedValue(new Error("Report failed"));
    const state = await runUseCasePipeline(
      "10-50",
      "restaurants",
      "slow service",
    );
    expect(state.status).toBe("error");
    expect(state.error).toBe("Report failed");
  });

  it("works without callbacks", async () => {
    const state = await runUseCasePipeline(
      "10-50",
      "restaurants",
      "slow service",
    );
    expect(state.status).toBe("completed");
  });

  it("passes locale to both agents", async () => {
    await runUseCasePipeline("10-50", "restaurants", "slow service", "es");
    expect(mockAnalyzeUseCase).toHaveBeenCalledWith(
      "10-50",
      "restaurants",
      "slow service",
      "es",
    );
    expect(mockGenerateReport).toHaveBeenCalledWith(
      fakeAnalysis,
      "10-50",
      "restaurants",
      "es",
    );
  });
});
