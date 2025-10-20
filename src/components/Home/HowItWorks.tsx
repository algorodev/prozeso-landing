"use client";

import { motion } from "framer-motion";
import {
  Activity,
  PlugZap,
  RefreshCw,
  Settings2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import { useTranslations } from "next-intl";

const HowItWorks = () => {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      icon: Sparkles,
      title: t("steps.discovery.title"),
      body: t("steps.discovery.body"),
    },
    {
      icon: Settings2,
      title: t("steps.design.title"),
      body: t("steps.design.body"),
    },
    {
      icon: PlugZap,
      title: t("steps.build.title"),
      body: t("steps.build.body"),
    },
    {
      icon: Activity,
      title: t("steps.monitor.title"),
      body: t("steps.monitor.body"),
    },
    {
      icon: RefreshCw,
      title: t("steps.iterate.title"),
      body: t("steps.iterate.body"),
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  } as const;

  const child = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  } as const;

  return (
    <section className="relative overflow-x-clip">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="mt-3 text-muted-foreground"
          >
            {t("subtitle")}
          </motion.p>
        </div>
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map(({ icon: Icon, title, body }) => (
            <motion.li key={title} variants={child}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">
                  {body}
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </motion.ol>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-3 text-center"
        >
          <p className="text-sm text-muted-foreground">
            {t("ctaPrompt")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <LocalizedLink href="/start">{t("ctaPrimary")}</LocalizedLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <LocalizedLink href="/demo">{t("ctaSecondary")}</LocalizedLink>
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute -top-24 left-0 size-[22rem] rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 size-[26rem] rounded-full bg-accent/20 blur-3xl" />
    </section>
  );
};

export default HowItWorks;
