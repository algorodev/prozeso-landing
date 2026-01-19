"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AlertCircle, TrendingDown } from "lucide-react";
import type { UseCaseReport } from "@/types/UseCaseReport";
import { cn } from "@/lib/utils";

interface PainPointsAnalysisProps {
  data: UseCaseReport["painPointsAnalysis"];
}

const impactColors: Record<string, string> = {
  high: "text-destructive",
  medium: "text-orange-500",
  low: "text-yellow-500",
};

export function PainPointsAnalysis({ data }: PainPointsAnalysisProps) {
  const t = useTranslations("useCases.report.sections.painPointsAnalysis");
  
  const impactLabels: Record<string, string> = {
    high: t("impactLevels.high"),
    medium: t("impactLevels.medium"),
    low: t("impactLevels.low"),
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

        <div className="space-y-6">
          {data.painPoints.map((painPoint, index) => (
            <motion.div
              key={painPoint.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.1 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border bg-muted/30 p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 shrink-0 mt-0.5">
                    <AlertCircle className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="card-title mb-2">{painPoint.title}</h3>
                    <p className="body-text text-muted-foreground">{painPoint.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="caption-text text-muted-foreground">{t("priority")}</span>
                  <span className="inline-flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary font-bold body-strong-text">
                    {painPoint.priority}
                  </span>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 mt-6 pt-6 border-t">
                <div>
                  <h4 className="body-strong-text mb-3">{t("impactAssessment")}</h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="body-text text-muted-foreground">{t("revenue")}</span>
                      <span className={cn("body-strong-text", impactColors[painPoint.impact.revenue])}>
                        {impactLabels[painPoint.impact.revenue]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="body-text text-muted-foreground">{t("cost")}</span>
                      <span className={cn("body-strong-text", impactColors[painPoint.impact.cost])}>
                        {impactLabels[painPoint.impact.cost]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="body-text text-muted-foreground">{t("customerSatisfaction")}</span>
                      <span className={cn("body-strong-text", impactColors[painPoint.impact.customerSatisfaction])}>
                        {impactLabels[painPoint.impact.customerSatisfaction]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="body-text text-muted-foreground">{t("productivity")}</span>
                      <span className={cn("body-strong-text", impactColors[painPoint.impact.productivity])}>
                        {impactLabels[painPoint.impact.productivity]}
                      </span>
                    </div>
                  </div>
                </div>

                {painPoint.affectedAreas.length > 0 && (
                  <div>
                    <h4 className="body-strong-text mb-3">{t("affectedAreas")}</h4>
                    <ul className="space-y-2">
                      {painPoint.affectedAreas.map((area, areaIndex) => (
                        <li
                          key={areaIndex}
                          className="body-text text-muted-foreground before:content-['•'] before:mr-2 before:text-primary"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {data.priorityInsights.length > 0 && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <h3 className="card-title mb-4 flex items-center gap-3">
              <TrendingDown className="size-5 text-primary" />
              {t("priorityInsights")}
            </h3>
            <ul className="space-y-2.5">
              {data.priorityInsights.map((insight, index) => (
                <li
                  key={index}
                  className="body-text text-muted-foreground before:content-['•'] before:mr-2 before:text-primary"
                >
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
