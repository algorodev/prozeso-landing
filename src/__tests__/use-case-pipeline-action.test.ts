import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockRunUseCasePipeline } = vi.hoisted(() => ({
  mockRunUseCasePipeline: vi.fn(),
}));

vi.mock("@/lib/agents/pipeline", () => ({
  runUseCasePipeline: mockRunUseCasePipeline,
}));

import { runUseCasePipelineAction } from "@/lib/actions/use-case-pipeline";
import type {
  BusinessGoal,
  BusinessRole,
  PainPointChip,
} from "@/types/UseCaseReport";

const validParams = {
  companySize: "10-50",
  industry: "restaurants",
  role: "founder" as BusinessRole,
  painPointChips: ["missedCalls"] as PainPointChip[],
  painPointsDetail: "slow service all the time",
  goal: "saveTime" as BusinessGoal,
};

describe("runUseCasePipelineAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns error when companySize is missing", async () => {
    const result = await runUseCasePipelineAction({
      ...validParams,
      companySize: "",
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("Missing required fields");
  });

  it("returns error when industry is missing", async () => {
    const result = await runUseCasePipelineAction({
      ...validParams,
      industry: "",
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("Missing required fields");
  });

  it("returns error when no chips and painPointsDetail too short", async () => {
    const result = await runUseCasePipelineAction({
      ...validParams,
      painPointChips: [],
      painPointsDetail: "short",
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("pain point");
  });

  it("returns success with serialized state on completion", async () => {
    const now = new Date();
    mockRunUseCasePipeline.mockResolvedValue({
      status: "completed",
      analysis: { summary: "Analysis" },
      report: { executiveSummary: "Summary" },
      error: null,
      createdAt: now,
      updatedAt: now,
    });
    const result = await runUseCasePipelineAction(validParams);
    expect(result.success).toBe(true);
    expect(result.data?.status).toBe("completed");
    expect(result.data?.createdAt).toBe(now.toISOString());
    expect(result.data?.updatedAt).toBe(now.toISOString());
  });

  it("returns error when pipeline status is 'error'", async () => {
    mockRunUseCasePipeline.mockResolvedValue({
      status: "error",
      analysis: null,
      report: null,
      error: "Pipeline failed",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await runUseCasePipelineAction(validParams);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Pipeline failed");
  });

  it("returns error when pipeline does not complete", async () => {
    mockRunUseCasePipeline.mockResolvedValue({
      status: "analyzing",
      analysis: null,
      report: null,
      error: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const result = await runUseCasePipelineAction(validParams);
    expect(result.success).toBe(false);
    expect(result.error).toContain("did not complete");
  });

  it("handles unexpected thrown error", async () => {
    mockRunUseCasePipeline.mockRejectedValue(new Error("Unexpected"));
    const result = await runUseCasePipelineAction(validParams);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Unexpected");
  });
});
