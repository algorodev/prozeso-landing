"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function UseCasesHero() {
  const t = useTranslations("useCases.hero");

  return (
    <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 lg:mb-20">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ delay: 0.05, duration: 0.6 }}
        className="hero-title mb-3 sm:mb-4"
      >
        {t.rich("title", {
          primary: (chunks) => (
            <span className="text-primary">{chunks}</span>
          ),
          secondary: (chunks) => (
            <span className="text-secondary">{chunks}</span>
          ),
        })}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ delay: 0.12, duration: 0.6 }}
        className="hero-subtitle text-muted-foreground max-w-3xl mx-auto leading-relaxed"
      >
        {t("subtitle")}
      </motion.p>
    </div>
  );
}
