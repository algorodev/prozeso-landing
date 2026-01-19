import { analyzeUseCase } from "./use-case-analyzer";
import { generateReport } from "./report-generator";
import type {
  UseCaseAnalysisResult,
  UseCaseReport,
} from "@/types/UseCaseReport";

export type UseCasePipelineStatus =
  | "idle"
  | "analyzing"
  | "generating"
  | "completed"
  | "error";

export interface UseCasePipelineState {
  status: UseCasePipelineStatus;
  analysis: UseCaseAnalysisResult | null;
  report: UseCaseReport | null;
  error: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UseCasePipelineCallbacks {
  onStatusChange?: (status: UseCasePipelineStatus) => void;
  onAnalysisComplete?: (analysis: UseCaseAnalysisResult) => void;
  onReportComplete?: (report: UseCaseReport) => void;
  onError?: (error: string) => void;
}

export async function runUseCasePipeline(
  companySize: string,
  industry: string,
  painPoints: string,
  locale: "en" | "es" = "en",
  callbacks?: UseCasePipelineCallbacks,
): Promise<UseCasePipelineState> {
  console.log("🟢 [USE CASE PIPELINE] Starting pipeline execution");

  const state: UseCasePipelineState = {
    status: "idle",
    analysis: null,
    report: null,
    error: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    console.log("🔍 [USE CASE PIPELINE] Step 1: Starting use case analysis...");
    state.status = "analyzing";
    state.updatedAt = new Date();
    callbacks?.onStatusChange?.("analyzing");

    const analysis = await analyzeUseCase(
      companySize,
      industry,
      painPoints,
      locale,
    );
    console.log("✅ [USE CASE PIPELINE] Step 1 completed - Analysis received:", {
      painPointsCount: analysis.painPoints.length,
      insightsCount: analysis.keyInsights.length,
      focusAreasCount: analysis.recommendedFocusAreas.length,
      summaryLength: analysis.summary.length,
    });

    state.analysis = analysis;
    state.updatedAt = new Date();
    callbacks?.onAnalysisComplete?.(analysis);

    console.log("📄 [USE CASE PIPELINE] Step 2: Starting report generation...");
    state.status = "generating";
    state.updatedAt = new Date();
    callbacks?.onStatusChange?.("generating");

    const report = await generateReport(
      analysis,
      companySize,
      industry,
      locale,
    );
    console.log("✅ [USE CASE PIPELINE] Step 2 completed - Report received:", {
      hasExecutiveSummary: !!report.executiveSummary,
      painPointsCount: report.painPointsAnalysis.painPoints.length,
      recommendationsCount: report.automationRecommendations.recommendations.length,
      phasesCount: report.implementationRoadmap.phases.length,
      hasROI: !!report.expectedImpact.roi,
    });

    state.report = report;
    state.updatedAt = new Date();
    callbacks?.onReportComplete?.(report);

    state.status = "completed";
    state.updatedAt = new Date();
    callbacks?.onStatusChange?.("completed");

    console.log("🎉 [USE CASE PIPELINE] Pipeline completed successfully!");

    return state;
  } catch (error) {
    console.error("❌ [USE CASE PIPELINE] Pipeline error:", error);
    state.status = "error";
    state.error =
      error instanceof Error ? error.message : "Unknown error occurred";
    state.updatedAt = new Date();
    callbacks?.onError?.(state.error);
    callbacks?.onStatusChange?.("error");

    return state;
  }
}
