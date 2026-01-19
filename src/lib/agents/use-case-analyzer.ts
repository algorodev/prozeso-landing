import { generateText, Output } from "ai";
import { z } from "zod";
import { getGoogleModel } from "@/lib/config/google-ai";
import { USE_CASE_ANALYZER_PROMPT } from "@/lib/prompts";
import type { UseCaseAnalysisResult, ImpactLevel, PainPointCategory } from "@/types/UseCaseReport";

const impactLevelSchema = z.enum(["high", "medium", "low"]);

const painPointCategorySchema = z.enum([
  "operational",
  "customerService",
  "revenue",
  "resources",
  "scalability",
]);

const analysisSchema = z.object({
  painPoints: z
    .array(
      z.object({
        identified: z.string().describe("Description of the identified pain point"),
        category: painPointCategorySchema.describe("Category of the pain point"),
        rootCauses: z
          .array(z.string())
          .describe("Array of root causes for this pain point"),
        impact: z
          .object({
            revenue: impactLevelSchema.describe("Revenue impact level"),
            cost: impactLevelSchema.describe("Cost impact level"),
            customerSatisfaction: impactLevelSchema.describe(
              "Customer satisfaction impact level",
            ),
            productivity: impactLevelSchema.describe("Productivity impact level"),
          })
          .describe("Impact assessment of the pain point"),
        priority: z
          .number()
          .int()
          .min(1)
          .max(10)
          .describe("Priority ranking from 1 (lowest) to 10 (highest)"),
        automationOpportunities: z
          .array(z.string())
          .describe(
            "Specific automation opportunities that could address this pain point",
          ),
      }),
    )
    .min(1)
    .describe("Array of identified pain points"),
  summary: z
    .string()
    .describe("Overall summary of the business situation and analysis"),
  keyInsights: z
    .array(z.string())
    .min(1)
    .describe("Key insights from the analysis"),
  recommendedFocusAreas: z
    .array(z.string())
    .min(1)
    .describe("Recommended focus areas for automation implementation"),
});

export async function analyzeUseCase(
  companySize: string,
  industry: string,
  painPoints: string,
  locale: "en" | "es" = "en",
): Promise<UseCaseAnalysisResult> {
  console.log("🔵 [USE CASE ANALYZER] Starting analysis...");
  console.log("📥 [USE CASE ANALYZER] Input:", {
    companySize,
    industry,
    painPointsLength: painPoints.length,
    locale,
  });

  try {
    console.log("🤖 [USE CASE ANALYZER] Calling AI model...");
    const { output } = await generateText({
      model: getGoogleModel("gemini-2.0-flash-exp"),
      output: Output.object({
        schema: analysisSchema,
      }),
      prompt: USE_CASE_ANALYZER_PROMPT(companySize, industry, painPoints, locale),
    });

    console.log("✅ [USE CASE ANALYZER] Analysis completed:", {
      painPointsCount: output.painPoints.length,
      insightsCount: output.keyInsights.length,
      focusAreasCount: output.recommendedFocusAreas.length,
    });

    return output as UseCaseAnalysisResult;
  } catch (error) {
    console.error("❌ [USE CASE ANALYZER] Error:", error);
    throw error;
  }
}
