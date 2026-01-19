"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CheckCircle2 } from "lucide-react";
import type { UseCaseReport } from "@/types/UseCaseReport";

interface ExecutiveSummaryProps {
  data: UseCaseReport["executiveSummary"];
}

export function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const t = useTranslations("useCases.report.sections.executiveSummary");
  
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="section-title">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <p className="body-text leading-relaxed text-foreground">{data.overview}</p>
        
        {data.mainChallenges.length > 0 && (
          <div className="space-y-4">
            <h3 className="card-title">{t("mainChallenges")}</h3>
            <ul className="space-y-3">
              {data.mainChallenges.map((challenge, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="body-text text-muted-foreground">{challenge}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {data.keyOpportunities.length > 0 && (
          <div className="space-y-4">
            <h3 className="card-title">{t("keyOpportunities")}</h3>
            <ul className="space-y-3">
              {data.keyOpportunities.map((opportunity, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="body-text text-muted-foreground">{opportunity}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
