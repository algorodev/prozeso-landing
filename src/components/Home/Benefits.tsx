"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Clock,
  PiggyBank,
  PlugZap,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

const Benefits = () => {
  const t = useTranslations("benefits");

  const items = [
    { icon: Clock, title: t("items.saveTime.title"), body: t("items.saveTime.body") },
    { icon: Workflow, title: t("items.fewerErrors.title"), body: t("items.fewerErrors.body") },
    { icon: BarChart3, title: t("items.visibility.title"), body: t("items.visibility.body") },
    { icon: PlugZap, title: t("items.connectStack.title"), body: t("items.connectStack.body") },
    { icon: ShieldCheck, title: t("items.security.title"), body: t("items.security.body") },
    { icon: PiggyBank, title: t("items.roi.title"), body: t("items.roi.body") },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const child = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

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
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} variants={child}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
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
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border bg-card/40 p-4 sm:grid-cols-4"
        >
          <Stat kpi="50+" label={t("stats.connectors")} />
          <Stat kpi="99.9%" label={t("stats.uptime")} />
          <Stat kpi="-60%" label={t("stats.manualTime")} />
          <Stat kpi=">30k" label={t("stats.tasksPerMonth")} />
        </motion.div>
      </div>
      <div className="pointer-events-none absolute -top-24 -right-24 size-[26rem] rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-[20rem] rounded-full bg-accent/20 blur-3xl" />
    </section>
  );
};

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-semibold tracking-tight">{kpi}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export default Benefits;
