"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Building2, Users } from "lucide-react";
import type { UseCaseReport } from "@/types/UseCaseReport";

interface BusinessContextSectionProps {
  data: UseCaseReport["businessContext"];
}

export function BusinessContextSection({ data }: BusinessContextSectionProps) {
  const t = useTranslations("useCases.report.sections.businessContext");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="section-title">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                <Building2 className="size-5 text-primary" />
              </div>
              <h3 className="card-title">{t("industry")}</h3>
            </div>
            <p className="body-strong-text text-foreground">{data.industry}</p>
            {data.industryInsights.length > 0 && (
              <ul className="mt-4 space-y-2.5">
                {data.industryInsights.map((insight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.1 }}
                    transition={{ delay: index * 0.1 }}
                    className="body-text text-muted-foreground before:content-['•'] before:mr-2 before:text-primary"
                  >
                    {insight}
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                <Users className="size-5 text-primary" />
              </div>
              <h3 className="card-title">{t("companySize")}</h3>
            </div>
            <p className="body-strong-text text-foreground">{data.companySize}</p>
            {data.sizeConsiderations.length > 0 && (
              <ul className="mt-4 space-y-2.5">
                {data.sizeConsiderations.map((consideration, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.1 }}
                    transition={{ delay: index * 0.1 }}
                    className="body-text text-muted-foreground before:content-['•'] before:mr-2 before:text-primary"
                  >
                    {consideration}
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
