"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, Calendar, Rocket, Phone } from "lucide-react";

export function StaticNextSteps() {
  const t = useTranslations("useCases.report.sections.nextSteps");
  
  const nextSteps = [
    {
      icon: Phone,
      title: t("step1.title", { default: "Schedule a Consultation" }),
      description: t("step1.description", { default: "Book a free consultation call with our automation experts to discuss your specific needs." }),
    },
    {
      icon: Rocket,
      title: t("step2.title", { default: "Get a Custom Plan" }),
      description: t("step2.description", { default: "Receive a tailored automation roadmap designed specifically for your business." }),
    },
    {
      icon: Calendar,
      title: t("step3.title", { default: "Start Implementation" }),
      description: t("step3.description", { default: "Begin your automation journey with our guided implementation process." }),
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10">
              <Rocket className="size-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              {t("title", { default: "Next Steps" })}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-xl border bg-background/50"
                >
                  <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 mb-4">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  {t("cta.title", { default: "Ready to Transform Your Business?" })}
                </h3>
                <p className="text-muted-foreground">
                  {t("cta.description", { default: "Let's discuss how automation can help you achieve your goals." })}
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto"
              >
                <a
                  href="https://calendly.com/prozeso360/30min"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("cta.button", { default: "Get Started" })}
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
