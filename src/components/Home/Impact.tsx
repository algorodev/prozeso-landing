"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Impact = () => {
  const t = useTranslations("home.impact");

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
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
          className="text-lg text-muted-foreground mb-16 max-w-xl font-normal"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              number: "20",
              suffix: "%",
              id: "billing",
              color: "accent",
            },
            {
              number: "10",
              suffix: "x",
              id: "roi",
              color: "secondary",
            },
            {
              number: "72",
              suffix: "%",
              id: "resources",
              color: "primary",
            },
          ].map((metric, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className={`bg-card rounded-3xl p-8 flex flex-col justify-between min-h-[400px] border border-transparent transition-all ${
                metric.color === "primary"
                  ? "hover:border-primary/40"
                  : metric.color === "secondary"
                    ? "hover:border-secondary/40"
                    : "hover:border-accent/40"
              }`}
            >
              <div className="mb-auto">
                <div className="flex items-baseline">
                  <span
                    className={`text-8xl md:text-9xl font-extralight tracking-tighter ${
                      metric.color === "primary"
                        ? "text-primary/40"
                        : metric.color === "secondary"
                          ? "text-secondary/40"
                          : "text-accent/40"
                    }`}
                  >
                    {metric.number}
                  </span>
                  <span
                    className={`text-4xl md:text-5xl font-extralight ml-1 ${
                      metric.color === "primary"
                        ? "text-primary/40"
                        : metric.color === "secondary"
                          ? "text-secondary/40"
                          : "text-accent/40"
                    }`}
                  >
                    {metric.suffix}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-sora font-semibold text-xl">
                  {t(`items.${metric.id}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                  {t(`items.${metric.id}.desc`)}
                </p>

                <div
                  className={`border-l-2 pl-4 mt-6 ${
                    metric.color === "primary"
                      ? "border-primary/40"
                      : metric.color === "secondary"
                        ? "border-secondary/40"
                        : "border-accent/40"
                  }`}
                >
                  <p className="text-xs text-muted-foreground italic leading-relaxed font-normal">
                    {t(`items.${metric.id}.quote`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
