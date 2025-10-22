"use client";

import { motion } from "framer-motion";
import { Headphones, PiggyBank, TimerReset, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const Impact = () => {
  const t = useTranslations("impact");

  const lead = t("lead");
  const paragraphs = (t.raw("paragraphs") as string[]) || [];
  const tangibleTitle = t("tangibleTitle");

  const items = [
    {
      icon: TrendingUp,
      title: t("items.reservations.title"),
      body: t("items.reservations.body"),
    },
    {
      icon: TimerReset,
      title: t("items.hours.title"),
      body: t("items.hours.body"),
    },
    {
      icon: Headphones,
      title: t("items.support.title"),
      body: t("items.support.body"),
    },
    {
      icon: PiggyBank,
      title: t("items.costs.title"),
      body: t("items.costs.body"),
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  } as const;

  const child = {
    hidden: { opacity: 0, y: 12 },
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
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="mx-auto mt-8 max-w-3xl"
        >
          <Card className="relative overflow-hidden rounded-2xl border border-accent/30 bg-accent/5 shadow-sm transition-shadow hover:shadow-lg hover:shadow-accent/20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-10 size-60 rounded-full bg-accent/20 blur-3xl"
            />
            <CardContent className="relative p-6 sm:p-8">
              <p className="text-pretty text-xl font-semibold leading-7 sm:text-2xl">
                {lead}
              </p>
              <div className="mt-5 space-y-3 text-base leading-7 text-muted-foreground sm:text-lg">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="mx-auto mt-10 max-w-3xl text-center"
        >
          <p className="text-sm font-medium text-foreground/80">
            {tangibleTitle}
          </p>
        </motion.div>
        <div className="relative isolate mt-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-accent/60 z-0 sm:block lg:hidden"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-accent/60 z-0 hidden lg:block"
          />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-10 mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {items.map(({ icon: Icon, title, body }) => (
              <motion.div key={title} variants={child}>
                <Card className="h-full transition-shadow hover:shadow-lg dark:hover:shadow-white/10">
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-20 right-0 size-[22rem] rounded-full bg-accent/20 blur-3xl" />
    </section>
  );
};

export default Impact;
