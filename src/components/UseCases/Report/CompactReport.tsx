"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  Clock,
  DollarSign,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { UseCaseReport } from "@/types/UseCaseReport";

interface CompactReportProps {
  report: UseCaseReport;
}

const impactColors: Record<string, string> = {
  high: "text-green-500 bg-green-500/10 border-green-500/20",
  medium: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  low: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
};

export function CompactReport({ report }: CompactReportProps) {
  const t = useTranslations("useCases.report.compact");

  // Get the highest priority pain point for Problem section
  const mainPainPoint = report.painPointsAnalysis.painPoints.sort(
    (a, b) => a.priority - b.priority,
  )[0];

  // Get the main automation recommendation for Solution section
  const mainSolution = report.automationRecommendations.recommendations[0];

  // Calculate overall impact from pain points
  const overallImpact = {
    revenue: report.painPointsAnalysis.painPoints.reduce(
      (acc, pp) => {
        if (pp.impact.revenue === "high") return "high";
        if (pp.impact.revenue === "medium" && acc !== "high") return "medium";
        return acc;
      },
      "low" as "high" | "medium" | "low",
    ),
    cost: report.painPointsAnalysis.painPoints.reduce(
      (acc, pp) => {
        if (pp.impact.cost === "high") return "high";
        if (pp.impact.cost === "medium" && acc !== "high") return "medium";
        return acc;
      },
      "low" as "high" | "medium" | "low",
    ),
    customerSatisfaction: report.painPointsAnalysis.painPoints.reduce(
      (acc, pp) => {
        if (pp.impact.customerSatisfaction === "high") return "high";
        if (pp.impact.customerSatisfaction === "medium" && acc !== "high")
          return "medium";
        return acc;
      },
      "low" as "high" | "medium" | "low",
    ),
    productivity: report.painPointsAnalysis.painPoints.reduce(
      (acc, pp) => {
        if (pp.impact.productivity === "high") return "high";
        if (pp.impact.productivity === "medium" && acc !== "high")
          return "medium";
        return acc;
      },
      "low" as "high" | "medium" | "low",
    ),
  };

  return (
    <div className="space-y-8">
      {/* Impact Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10">
                <TrendingUp className="size-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                {t("impact")}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                className={cn(
                  "rounded-xl p-4 border",
                  impactColors[overallImpact.revenue],
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="size-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {t("revenue")}
                  </span>
                </div>
                <p className="text-lg font-semibold">
                  {t(`impactLevels.${overallImpact.revenue}`)}
                </p>
              </div>

              <div
                className={cn(
                  "rounded-xl p-4 border",
                  impactColors[overallImpact.cost],
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="size-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {t("cost")}
                  </span>
                </div>
                <p className="text-lg font-semibold">
                  {t(`impactLevels.${overallImpact.cost}`)}
                </p>
              </div>

              <div
                className={cn(
                  "rounded-xl p-4 border",
                  impactColors[overallImpact.customerSatisfaction],
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="size-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {t("customer")}
                  </span>
                </div>
                <p className="text-lg font-semibold">
                  {t(`impactLevels.${overallImpact.customerSatisfaction}`)}
                </p>
              </div>

              <div
                className={cn(
                  "rounded-xl p-4 border",
                  impactColors[overallImpact.productivity],
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="size-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {t("productivity")}
                  </span>
                </div>
                <p className="text-lg font-semibold">
                  {t(`impactLevels.${overallImpact.productivity}`)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Problem Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-transparent">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center size-12 rounded-xl bg-destructive/10">
                <AlertCircle className="size-6 text-destructive" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                {t("problem")}
              </h2>
            </div>

            {mainPainPoint && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {mainPainPoint.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {mainPainPoint.description}
                  </p>
                </div>

                {mainPainPoint.affectedAreas.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                      {t("affectedAreas")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mainPainPoint.affectedAreas.map((area, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-full bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive border border-destructive/20"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.section>

      {/* Solution Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10">
                <Sparkles className="size-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                {t("solution")}
              </h2>
            </div>

            {mainSolution && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {mainSolution.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {mainSolution.description}
                  </p>
                </div>

                {Object.keys(mainSolution.expectedBenefits).length > 0 && (
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                    {mainSolution.expectedBenefits.timeSaved && (
                      <div className="flex items-start gap-3">
                        <Clock className="size-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {t("timeSaved")}
                          </p>
                          <p className="text-base font-semibold">
                            {mainSolution.expectedBenefits.timeSaved}
                          </p>
                        </div>
                      </div>
                    )}
                    {mainSolution.expectedBenefits.revenueIncrease && (
                      <div className="flex items-start gap-3">
                        <TrendingUp className="size-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {t("revenueIncrease")}
                          </p>
                          <p className="text-base font-semibold">
                            {mainSolution.expectedBenefits.revenueIncrease}
                          </p>
                        </div>
                      </div>
                    )}
                    {mainSolution.expectedBenefits.costReduction && (
                      <div className="flex items-start gap-3">
                        <Target className="size-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {t("costReduction")}
                          </p>
                          <p className="text-base font-semibold">
                            {mainSolution.expectedBenefits.costReduction}
                          </p>
                        </div>
                      </div>
                    )}
                    {mainSolution.expectedBenefits.customerSatisfaction && (
                      <div className="flex items-start gap-3">
                        <Users className="size-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {t("customerSatisfaction")}
                          </p>
                          <p className="text-base font-semibold">
                            {mainSolution.expectedBenefits.customerSatisfaction}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {mainSolution.expectedMetrics.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                      {t("expectedMetrics")}
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {mainSolution.expectedMetrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg bg-primary/5 p-4 border border-primary/10"
                        >
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {metric.metric}
                          </p>
                          <p className="text-lg font-semibold text-primary">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
