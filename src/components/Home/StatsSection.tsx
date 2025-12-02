"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, TrendingUp, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const StatsBlock = () => {
  const t = useTranslations("stats");

  const stats = [
    {
      icon: Workflow,
      value: "120+",
      label: t("items.automationCount.label"),
      desc: t("items.automationCount.desc"),
    },
    {
      icon: TrendingUp,
      value: "3.2M+",
      label: t("items.tasksExecuted.label"),
      desc: t("items.tasksExecuted.desc"),
    },
    {
      icon: Clock,
      value: "12,000h",
      label: t("items.hoursSaved.label"),
      desc: t("items.hoursSaved.desc"),
    },
    {
      icon: CheckCircle2,
      value: "99.97%",
      label: t("items.successRate.label"),
      desc: t("items.successRate.desc"),
    },
  ];

  return (
    <section className="relative overflow-x-clip">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-title text-balance">
            {t("title")}
          </h2>
          <p className="mt-3 body-text text-muted-foreground">{t("subtitle")}</p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map(({ icon: Icon, value, label, desc }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
              }}
            >
              <Card className="h-full border-none bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                    <CardTitle className="stats-text">{value}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 body-text">
                    <p className="body-strong-text">{label}</p>
                    <p className="text-muted-foreground mt-1 body-text">{desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBlock;
