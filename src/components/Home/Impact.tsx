"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";

const PALETTE = {
  lavender: {
    text: "text-lavender/40",
    border: "hover:border-lavender/40",
  },
  blue: {
    text: "text-blue/40",
    border: "hover:border-blue/40",
  },
  cyan: {
    text: "text-cyan/40",
    border: "hover:border-cyan/40",
  },
  mint: {
    text: "text-mint/40",
    border: "hover:border-mint/40",
  },
} as const;

const METRICS = [
  { id: "billing", number: "12", suffix: "%", color: "lavender" },
  { id: "roi", number: "7", suffix: "x", color: "blue" },
  { id: "cost", number: "34", suffix: "%", color: "cyan" },
  { id: "time", number: "50", suffix: "%", color: "mint" },
] as const;

const Impact = () => {
  const t = useTranslations("home.impact");

  const disclaimer = (
    <p className="text-xs text-foreground-muted max-w-2xl">{t("disclaimer")}</p>
  );

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1280px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="w-full max-w-2xl mx-auto lg:mx-0 lg:w-[50%] lg:sticky lg:top-24">
            <SectionHeader
              title={t.rich("title", {
                highlight: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
              })}
              subtitle={t("subtitle")}
              className="text-center lg:text-left mb-0"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.1 }}
            variants={{
              hidden: { opacity: 1 },
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="flex-1 flex flex-col gap-4 w-full max-w-lg mx-auto lg:mx-0"
          >
            {METRICS.map((metric) => (
              <motion.div
                key={metric.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className={`rounded-2xl p-5 md:p-6 flex items-start gap-3 md:gap-6 border transition-colors border-border ${PALETTE[metric.color].border}`}
              >
                <div className="flex items-baseline shrink-0 w-20">
                  <span
                    className={`text-5xl sm:text-6xl font-extralight tracking-tighter ${PALETTE[metric.color].text}`}
                  >
                    {metric.number}
                  </span>
                  <span
                    className={`text-2xl sm:text-3xl font-extralight ml-1 ${PALETTE[metric.color].text}`}
                  >
                    {metric.suffix}
                  </span>
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="font-sora font-semibold text-base tracking-tight">
                    {t(`items.${metric.id}.title`)}
                  </h3>
                  <p className="text-sm text-foreground-subtle leading-relaxed font-normal">
                    {t(`items.${metric.id}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}

            <div className="mt-4">{disclaimer}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
