import { generateText, Output } from "ai";
import { z } from "zod";
import { getGoogleModel } from "@/lib/config/google-ai";
import { REPORT_GENERATOR_PROMPT } from "@/lib/prompts";
import type {
  UseCaseAnalysisResult,
  UseCaseReport,
  Priority,
} from "@/types/UseCaseReport";

const impactLevelSchema = z.enum(["high", "medium", "low"]);

const painPointCategorySchema = z.enum([
  "operational",
  "customerService",
  "revenue",
  "resources",
  "scalability",
]);

const automationCategorySchema = z.enum([
  "aiReceptionist",
  "appointmentReminders",
  "missedCallRecovery",
  "schedulingOptimization",
  "customerCommunication",
  "workflowAutomation",
  "dataAnalytics",
  "integration",
]);

const complexitySchema = z.enum(["low", "medium", "high"]);
const timeframeSchema = z.enum(["3months", "6months", "12months"]);
const changeSchema = z.enum(["increase", "decrease"]);

const reportSchema = z.object({
  metadata: z.object({
    generatedAt: z.string().describe("ISO 8601 date string"),
    companySize: z.string(),
    industry: z.string(),
    locale: z.enum(["en", "es"]),
  }),
  executiveSummary: z.object({
    overview: z
      .string()
      .describe("2-3 paragraph overview of the business situation"),
    mainChallenges: z
      .array(z.string())
      .min(2)
      .describe("Main challenges identified (at least 2)"),
    keyOpportunities: z
      .array(z.string())
      .min(2)
      .describe("Key opportunities for improvement (at least 2)"),
  }),
  businessContext: z.object({
    industry: z.string(),
    companySize: z.string(),
    industryInsights: z
      .array(z.string())
      .min(2)
      .describe("Industry-specific insights"),
    sizeConsiderations: z
      .array(z.string())
      .min(2)
      .describe("Considerations based on company size"),
  }),
  painPointsAnalysis: z.object({
    summary: z.string().describe("Overview of pain points analysis"),
    painPoints: z
      .array(
        z.object({
          id: z.string().describe("Unique identifier (e.g., 'pp1', 'pp2')"),
          title: z.string().describe("Clear title for the pain point"),
          description: z
            .string()
            .describe("Detailed description of the pain point"),
          category: painPointCategorySchema,
          impact: z.object({
            revenue: impactLevelSchema,
            cost: impactLevelSchema,
            customerSatisfaction: impactLevelSchema,
            productivity: impactLevelSchema,
          }),
          priority: z
            .number()
            .int()
            .min(1)
            .max(10)
            .pipe(z.custom<Priority>())
            .describe("Priority from 1-10"),
          affectedAreas: z.array(z.string()).describe("Areas affected by this pain point"),
        }),
      )
      .min(3)
      .describe("Detailed pain points (at least 3)"),
    priorityInsights: z
      .array(z.string())
      .min(2)
      .describe("Insights about priorities"),
  }),
  automationRecommendations: z.object({
    summary: z.string().describe("Overview of recommendations"),
    recommendations: z
      .array(
        z.object({
          id: z.string().describe("Unique identifier (e.g., 'rec1', 'rec2')"),
          name: z.string().describe("Solution name"),
          description: z
            .string()
            .describe("Detailed description of the solution"),
          category: automationCategorySchema,
          painPointsAddressed: z
            .array(z.string())
            .describe("IDs of pain points this addresses"),
          expectedBenefits: z.object({
            timeSaved: z.string().optional(),
            revenueIncrease: z.string().optional(),
            costReduction: z.string().optional(),
            customerSatisfaction: z.string().optional(),
            productivityGain: z.string().optional(),
          }),
          expectedMetrics: z
            .array(
              z.object({
                metric: z.string(),
                value: z.string(),
              }),
            )
            .min(1)
            .describe("Expected metrics (at least 1)"),
          implementation: z.object({
            complexity: complexitySchema,
            timeline: z.string().describe("e.g., '2-4 weeks'"),
            prerequisites: z.array(z.string()),
          }),
          examples: z.array(z.string()).optional(),
        }),
      )
      .min(3)
      .describe("Automation recommendations (at least 3)"),
    overallImpact: z.string().describe("Summary of overall impact"),
  }),
  expectedImpact: z.object({
    summary: z.string().describe("Overview of expected impact"),
    projections: z
      .array(
        z.object({
          timeframe: timeframeSchema,
          metrics: z
            .array(
              z.object({
                label: z.string(),
                value: z.string(),
                change: changeSchema,
              }),
            )
            .min(1),
          description: z.string(),
        }),
      )
      .length(3)
      .describe("Projections for 3months, 6months, and 12months"),
    roi: z.object({
      description: z.string().describe("ROI overview"),
      keyMetrics: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
          }),
        )
        .min(2)
        .describe("Key ROI metrics (at least 2)"),
    }),
  }),
  implementationRoadmap: z.object({
    overview: z.string().describe("Roadmap overview"),
    phases: z
      .array(
        z.object({
          phase: z
            .number()
            .int()
            .min(1)
            .max(3)
            .pipe(z.custom<1 | 2 | 3>())
            .describe("Phase number (1, 2, or 3)"),
          name: z.string().describe("Phase name"),
          timeline: z.string().describe("e.g., '0-3 months'"),
          description: z.string().describe("Phase description"),
          recommendations: z
            .array(z.string())
            .describe("IDs of recommendations in this phase"),
          expectedOutcomes: z
            .array(z.string())
            .min(1)
            .describe("Expected outcomes for this phase"),
        }),
      )
      .length(3)
      .describe("Three implementation phases"),
    totalTimeline: z.string().describe("e.g., '12 months'"),
  }),
  nextSteps: z.object({
    immediateActions: z
      .array(z.string())
      .min(2)
      .describe("Immediate actions (at least 2)"),
    consultationOffer: z.object({
      title: z.string().describe("Free consultation title"),
      description: z.string().describe("Consultation offer description"),
      cta: z.string().describe("Call to action text"),
    }),
    gettingStarted: z
      .array(z.string())
      .min(2)
      .describe("Getting started steps (at least 2)"),
  }),
});

export async function generateReport(
  analysis: UseCaseAnalysisResult,
  companySize: string,
  industry: string,
  locale: "en" | "es" = "en",
): Promise<UseCaseReport> {
  console.log("🟢 [REPORT GENERATOR] Starting report generation...");
  console.log("📥 [REPORT GENERATOR] Input:", {
    analysisSummary: analysis.summary,
    painPointsCount: analysis.painPoints.length,
    insightsCount: analysis.keyInsights.length,
    companySize,
    industry,
    locale,
  });

  try {
    // Convert analysis to JSON string for the prompt
    const analysisJson = JSON.stringify(analysis, null, 2);

    console.log("🤖 [REPORT GENERATOR] Calling AI model...");
    const { output } = await generateText({
      model: getGoogleModel("gemini-2.0-flash-exp"),
      output: Output.object({
        schema: reportSchema,
      }),
      prompt: REPORT_GENERATOR_PROMPT(analysisJson, companySize, industry, locale),
    });

    // Ensure generatedAt is set to current ISO date
    const report: UseCaseReport = {
      ...output,
      metadata: {
        ...output.metadata,
        generatedAt: new Date().toISOString(),
        companySize,
        industry,
        locale,
      },
    };

    console.log("✅ [REPORT GENERATOR] Report generated successfully:", {
      painPointsCount: report.painPointsAnalysis.painPoints.length,
      recommendationsCount: report.automationRecommendations.recommendations.length,
      phasesCount: report.implementationRoadmap.phases.length,
    });

    return report;
  } catch (error) {
    console.error("❌ [REPORT GENERATOR] Error:", error);
    throw error;
  }
}
