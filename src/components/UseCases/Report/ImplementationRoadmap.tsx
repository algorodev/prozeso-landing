"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CheckCircle2, Clock, Target } from "lucide-react";
import type { UseCaseReport } from "@/types/UseCaseReport";

interface ImplementationRoadmapProps {
  data: UseCaseReport["implementationRoadmap"];
}

export function ImplementationRoadmap({ data }: ImplementationRoadmapProps) {
  const t = useTranslations("useCases.report.sections.implementationRoadmap");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="section-title">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {data.overview && (
          <p className="body-text text-muted-foreground leading-relaxed">{data.overview}</p>
        )}

        <div className="space-y-6">
          {data.phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.1 }}
              transition={{ delay: index * 0.15 }}
              className="rounded-xl border bg-muted/30 p-5 sm:p-6 relative"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary font-bold shrink-0">
                  {phase.phase}
                </div>
                <div className="flex-1">
                  <h3 className="card-title mb-2">{phase.name}</h3>
                  <div className="flex items-center gap-2 caption-text text-muted-foreground">
                    <Clock className="size-4" />
                    <span>{phase.timeline}</span>
                  </div>
                </div>
              </div>

              {phase.description && (
                <p className="body-text text-muted-foreground mb-5">{phase.description}</p>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                {phase.recommendations.length > 0 && (
                  <div>
                    <h4 className="body-strong-text mb-4 flex items-center gap-2">
                      <Target className="size-4 text-primary" />
                      {t("recommendations")}
                    </h4>
                    <ul className="space-y-2.5">
                      {phase.recommendations.map((rec, recIndex) => (
                        <li
                          key={recIndex}
                          className="flex items-start gap-2 body-text text-muted-foreground"
                        >
                          <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-primary" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {phase.expectedOutcomes.length > 0 && (
                  <div>
                    <h4 className="body-strong-text mb-4 flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      {t("expectedOutcomes")}
                    </h4>
                    <ul className="space-y-2.5">
                      {phase.expectedOutcomes.map((outcome, outcomeIndex) => (
                        <li
                          key={outcomeIndex}
                          className="flex items-start gap-2 body-text text-muted-foreground"
                        >
                          <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-primary" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {data.totalTimeline && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="size-5 text-primary" />
              <h3 className="card-title">{t("totalTimeline")}</h3>
            </div>
            <p className="body-text text-muted-foreground">{data.totalTimeline}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
