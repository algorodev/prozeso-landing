"use server";

import type { UseCasePipelineState } from "@/lib/agents/pipeline";
import { runUseCasePipeline } from "@/lib/agents/pipeline";
import type {
  BusinessGoal,
  BusinessRole,
  PainPointChip,
} from "@/types/UseCaseReport";

export interface RunUseCasePipelineParams {
  companySize: string;
  industry: string;
  role: BusinessRole;
  painPointChips: PainPointChip[];
  painPointsDetail: string;
  goal: BusinessGoal;
  locale?: "en" | "es";
}

export interface SerializedUseCasePipelineState {
  status: UseCasePipelineState["status"];
  analysis: UseCasePipelineState["analysis"];
  report: UseCasePipelineState["report"];
  error: UseCasePipelineState["error"];
  createdAt: string;
  updatedAt: string;
}

export interface RunUseCasePipelineResult {
  success: boolean;
  data?: SerializedUseCasePipelineState;
  error?: string;
}

export async function runUseCasePipelineAction(
  params: RunUseCasePipelineParams,
): Promise<RunUseCasePipelineResult> {
  const {
    companySize,
    industry,
    role,
    painPointChips,
    painPointsDetail,
    goal,
    locale = "en",
  } = params;

  if (!companySize || !industry || !role || !goal) {
    return {
      success: false,
      error:
        "Missing required fields: companySize, industry, role and goal are required",
    };
  }

  if (painPointChips.length === 0 && painPointsDetail.trim().length < 10) {
    return {
      success: false,
      error:
        "Select at least one pain point or describe your situation in more detail",
    };
  }

  try {
    console.log("🚀 [SERVER ACTION] Starting use case pipeline...", {
      companySize,
      industry,
      role,
      goal,
      painPointChipsCount: painPointChips.length,
      painPointsDetailLength: painPointsDetail.length,
      locale,
    });

    const state = await runUseCasePipeline(
      {
        companySize,
        industry,
        role,
        painPointChips,
        painPointsDetail,
        goal,
      },
      locale,
      {
        onStatusChange: (status) => {
          console.log(`📊 [SERVER ACTION] Status: ${status}`);
        },
        onAnalysisComplete: (analysis) => {
          console.log(`✅ [SERVER ACTION] Analysis complete:`, {
            painPointsCount: analysis.painPoints.length,
          });
        },
        onReportComplete: (report) => {
          console.log(`✅ [SERVER ACTION] Report complete:`, {
            recommendationsCount:
              report.automationRecommendations.recommendations.length,
          });
        },
        onError: (error) => {
          console.error(`❌ [SERVER ACTION] Error:`, error);
        },
      },
    );

    if (state.status === "error") {
      return {
        success: false,
        error:
          state.error || "An unknown error occurred during pipeline execution",
      };
    }

    if (state.status !== "completed" || !state.report) {
      return {
        success: false,
        error: "Pipeline did not complete successfully",
      };
    }

    console.log("🎉 [SERVER ACTION] Pipeline completed successfully");

    const serializedState: SerializedUseCasePipelineState = {
      status: state.status,
      analysis: state.analysis,
      report: state.report,
      error: state.error,
      createdAt: state.createdAt.toISOString(),
      updatedAt: state.updatedAt.toISOString(),
    };

    return {
      success: true,
      data: serializedState,
    };
  } catch (error) {
    console.error("❌ [SERVER ACTION] Unexpected error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while generating the report";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
