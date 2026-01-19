"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, Calendar, Rocket } from "lucide-react";
import type { UseCaseReport } from "@/types/UseCaseReport";
import { LocalizedLink } from "@/i18n/LocalizedLink";

interface NextStepsSectionProps {
  data: UseCaseReport["nextSteps"];
}

export function NextStepsSection({ data }: NextStepsSectionProps) {
  const t = useTranslations("useCases.report.sections.nextSteps");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="section-title">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {data.immediateActions.length > 0 && (
          <div>
            <h3 className="card-title mb-5 flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                <Rocket className="size-5 text-primary" />
              </div>
              {t("immediateActions")}
            </h3>
            <ul className="space-y-3">
              {data.immediateActions.map((action, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-primary mt-0.5" />
                  <span className="body-text text-muted-foreground">{action}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {data.consultationOffer && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <h3 className="card-title mb-3">{data.consultationOffer.title}</h3>
            {data.consultationOffer.description && (
              <p className="body-text text-muted-foreground mb-5">
                {data.consultationOffer.description}
              </p>
            )}
            <LocalizedLink href="/start">
              <Button className="w-full sm:w-auto">
                {data.consultationOffer.cta}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </LocalizedLink>
          </div>
        )}

        {data.gettingStarted.length > 0 && (
          <div>
            <h3 className="card-title mb-5 flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                <Calendar className="size-5 text-primary" />
              </div>
              {t("gettingStarted")}
            </h3>
            <ul className="space-y-3">
              {data.gettingStarted.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-bold body-strong-text shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="body-text text-muted-foreground">{step}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
