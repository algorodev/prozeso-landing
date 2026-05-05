"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const METRICS = [
  { id: "billing", number: "12", suffix: "%", color: "accent" },
  { id: "roi", number: "7", suffix: "x", color: "secondary" },
  { id: "cost", number: "34", suffix: "%", color: "primary" },
  { id: "time", number: "50", suffix: "%", color: "chart-2" },
] as const;

const colorClass = (color: string, kind: "text" | "border") => {
  const palette =
    color === "primary"
      ? kind === "text"
        ? "text-primary/40"
        : "border-primary/40 hover:border-primary/60"
      : color === "secondary"
        ? kind === "text"
          ? "text-secondary/40"
          : "border-secondary/40 hover:border-secondary/60"
        : color === "accent"
          ? kind === "text"
            ? "text-accent/40"
            : "border-accent/40 hover:border-accent/60"
          : kind === "text"
            ? "text-chart-2/40"
            : "border-chart-2/40 hover:border-chart-2/60";
  return palette;
};

const Impact = () => {
  const t = useTranslations("home.impact");

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="font-sora text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6 text-balance"
        >
          {t.rich("title", {
            highlight: (chunks) => (
              <span className="text-accent">{chunks}</span>
            ),
          })}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="text-lg text-muted-foreground mb-12 max-w-2xl font-normal"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {METRICS.map((metric) => (
            <motion.div
              key={metric.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className={`rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[260px] border bg-muted/10 transition-colors ${colorClass(metric.color, "border")}`}
            >
              <div className="flex items-baseline mb-6">
                <span
                  className={`text-6xl sm:text-7xl font-extralight tracking-tighter ${colorClass(metric.color, "text")}`}
                >
                  {metric.number}
                </span>
                <span
                  className={`text-3xl sm:text-4xl font-extralight ml-1 ${colorClass(metric.color, "text")}`}
                >
                  {metric.suffix}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-sora font-semibold text-base tracking-tight">
                  {t(`items.${metric.id}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                  {t(`items.${metric.id}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xs text-muted-foreground/80 mt-8 max-w-2xl"
        >
          {t("disclaimer")}
        </motion.p>
      </div>
    </section>
  );
};

export default Impact;
