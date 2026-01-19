"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import type { UseCaseReport } from "@/types/UseCaseReport";

interface ExpectedImpactProps {
  data: UseCaseReport["expectedImpact"];
}

export function ExpectedImpact({ data }: ExpectedImpactProps) {
  const t = useTranslations("useCases.report.sections.expectedImpact");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="section-title">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {data.summary && (
          <p className="body-text text-muted-foreground leading-relaxed">{data.summary}</p>
        )}

        {data.projections.length > 0 && (
          <div className="space-y-6">
            <h3 className="card-title">{t("impactProjections")}</h3>
            {data.projections.map((projection, index) => (
              <motion.div
                key={projection.timeframe}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.1 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border bg-muted/30 p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h4 className="card-title">
                    {projection.timeframe === "3months" && t("threeMonths")}
                    {projection.timeframe === "6months" && t("sixMonths")}
                    {projection.timeframe === "12months" && t("twelveMonths")}
                  </h4>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-5">
                  {projection.metrics.map((metric, metricIndex) => (
                    <div
                      key={metricIndex}
                      className="rounded-lg bg-background/50 p-4 border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {metric.change === "increase" ? (
                          <TrendingUp className="size-4 text-green-500" />
                        ) : (
                          <TrendingDown className="size-4 text-red-500" />
                        )}
                        <span className="caption-text font-medium text-muted-foreground">
                          {metric.label}
                        </span>
                      </div>
                      <p className="stats-text text-foreground">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                {projection.description && (
                  <p className="body-text text-muted-foreground">{projection.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {data.roi && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                <DollarSign className="size-5 text-primary" />
              </div>
              <h3 className="card-title">{t("roiAnalysis")}</h3>
            </div>
            
            {data.roi.description && (
              <p className="body-text text-muted-foreground mb-5">{data.roi.description}</p>
            )}

            {data.roi.keyMetrics.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.roi.keyMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-background/50 p-4 border"
                  >
                    <div className="caption-text font-medium text-muted-foreground mb-2">
                      {metric.label}
                    </div>
                    <div className="stats-text text-primary">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
