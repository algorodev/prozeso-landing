"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Sparkles, CheckCircle2, TrendingUp, TrendingDown, Clock, AlertCircle } from "lucide-react";
import type { UseCaseReport } from "@/types/UseCaseReport";
import { cn } from "@/lib/utils";

interface AutomationRecommendationsProps {
  data: UseCaseReport["automationRecommendations"];
  painPoints?: UseCaseReport["painPointsAnalysis"]["painPoints"];
}

const complexityColors: Record<string, string> = {
  low: "text-green-500 bg-green-500/10",
  medium: "text-orange-500 bg-orange-500/10",
  high: "text-red-500 bg-red-500/10",
};

export function AutomationRecommendations({ data, painPoints = [] }: AutomationRecommendationsProps) {
  const t = useTranslations("useCases.report.sections.automationRecommendations");
  
  const complexityLabels: Record<string, string> = {
    low: t("complexityLevels.low"),
    medium: t("complexityLevels.medium"),
    high: t("complexityLevels.high"),
  };

  // Map pain point IDs to their titles
  const getPainPointTitle = (id: string): string => {
    const painPoint = painPoints.find((pp) => pp.id === id);
    return painPoint?.title || id;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="section-title">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {data.summary && (
          <p className="body-text text-muted-foreground leading-relaxed">{data.summary}</p>
        )}

        <div className="space-y-8">
          {data.recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.1 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border bg-muted/30 p-5 sm:p-6"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 shrink-0">
                  <Sparkles className="size-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="card-title mb-2">{rec.name}</h3>
                  <p className="body-text text-muted-foreground">{rec.description}</p>
                </div>
              </div>

              {rec.painPointsAddressed.length > 0 && (
                <div className="mb-5">
                  <h4 className="body-strong-text mb-3">{t("addresses")}</h4>
                  <div className="flex flex-wrap gap-2">
                    {rec.painPointsAddressed.map((point, pointIndex) => (
                      <span
                        key={pointIndex}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 caption-text font-medium text-primary border border-primary/20"
                      >
                        <CheckCircle2 className="size-3.5" />
                        {getPainPointTitle(point)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2 mt-6 pt-6 border-t">
                {Object.keys(rec.expectedBenefits).length > 0 && (
                  <div>
                    <h4 className="body-strong-text mb-4 flex items-center gap-2">
                      <TrendingUp className="size-4 text-primary" />
                      {t("expectedBenefits")}
                    </h4>
                    <ul className="space-y-2.5">
                      {rec.expectedBenefits.timeSaved && (
                        <li className="body-text text-muted-foreground flex items-center gap-2">
                          <Clock className="size-4 shrink-0 text-primary" />
                          <span>{t("timeSaved")}: {rec.expectedBenefits.timeSaved}</span>
                        </li>
                      )}
                      {rec.expectedBenefits.revenueIncrease && (
                        <li className="body-text text-muted-foreground flex items-center gap-2">
                          <TrendingUp className="size-4 shrink-0 text-primary" />
                          <span>{t("revenueIncrease")}: {rec.expectedBenefits.revenueIncrease}</span>
                        </li>
                      )}
                      {rec.expectedBenefits.costReduction && (
                        <li className="body-text text-muted-foreground flex items-center gap-2">
                          <TrendingDown className="size-4 shrink-0 text-primary" />
                          <span>{t("costReduction")}: {rec.expectedBenefits.costReduction}</span>
                        </li>
                      )}
                      {rec.expectedBenefits.customerSatisfaction && (
                        <li className="body-text text-muted-foreground flex items-center gap-2">
                          <CheckCircle2 className="size-4 shrink-0 text-primary" />
                          <span>{t("customerSatisfaction")}: {rec.expectedBenefits.customerSatisfaction}</span>
                        </li>
                      )}
                      {rec.expectedBenefits.productivityGain && (
                        <li className="body-text text-muted-foreground flex items-center gap-2">
                          <TrendingUp className="size-4 shrink-0 text-primary" />
                          <span>{t("productivity")}: {rec.expectedBenefits.productivityGain}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="body-strong-text mb-4 flex items-center gap-2">
                    <AlertCircle className="size-4 text-primary" />
                    {t("implementationDetails")}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="body-text text-muted-foreground">{t("complexity")}</span>
                      <span className={cn("rounded-full px-3 py-1 caption-text font-medium", complexityColors[rec.implementation.complexity])}>
                        {complexityLabels[rec.implementation.complexity]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="body-text text-muted-foreground">{t("timeline")}</span>
                      <span className="body-strong-text">{rec.implementation.timeline}</span>
                    </div>
                    {rec.implementation.prerequisites.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <span className="caption-text font-medium text-muted-foreground">{t("prerequisites")}:</span>
                        <ul className="mt-2 space-y-1.5">
                          {rec.implementation.prerequisites.map((prereq, prereqIndex) => (
                            <li
                              key={prereqIndex}
                              className="caption-text text-muted-foreground before:content-['•'] before:mr-2 before:text-primary"
                            >
                              {prereq}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {rec.expectedMetrics.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="body-strong-text mb-4">{t("expectedMetrics")}</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {rec.expectedMetrics.map((metric, metricIndex) => (
                      <div
                        key={metricIndex}
                        className="rounded-lg bg-background/50 p-3 border"
                      >
                        <span className="body-strong-text">{metric.metric}:</span>{" "}
                        <span className="body-text text-primary">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rec.examples && rec.examples.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="body-strong-text mb-3">{t("examples")}</h4>
                  <ul className="space-y-2">
                    {rec.examples.map((example, exampleIndex) => (
                      <li
                        key={exampleIndex}
                        className="body-text text-muted-foreground before:content-['•'] before:mr-2 before:text-primary"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {data.overallImpact && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <h3 className="card-title mb-3">{t("overallImpact")}</h3>
            <p className="body-text text-muted-foreground">{data.overallImpact}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
