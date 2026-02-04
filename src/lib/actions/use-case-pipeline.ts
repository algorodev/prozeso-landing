"use server";

import type { UseCasePipelineState } from "@/lib/agents/pipeline";
import { runUseCasePipeline } from "@/lib/agents/pipeline";

export interface RunUseCasePipelineParams {
  companySize: string;
  industry: string;
  painPoints: string;
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

/**
 * Server action to run the use case pipeline
 * This generates a complete analysis and report based on the provided inputs
 */
export async function runUseCasePipelineAction(
  params: RunUseCasePipelineParams,
): Promise<RunUseCasePipelineResult> {
  const { companySize, industry, painPoints, locale = "en" } = params;

  // Validate required fields
  if (!companySize || !industry || !painPoints) {
    return {
      success: false,
      error:
        "Missing required fields: companySize, industry, and painPoints are required",
    };
  }

  // Validate pain points length
  if (painPoints.trim().length < 10) {
    return {
      success: false,
      error: "Pain points description must be at least 10 characters long",
    };
  }

  try {
    console.log("🚀 [SERVER ACTION] Starting use case pipeline...", {
      companySize,
      industry,
      painPointsLength: painPoints.length,
      locale,
    });

    const state = await runUseCasePipeline(
      companySize,
      industry,
      painPoints,
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

    // Serialize dates to ISO strings for client-side consumption
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
