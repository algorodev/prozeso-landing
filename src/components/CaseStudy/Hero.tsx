"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type HeroProps = {
  namespace: string;
};

export default function CaseStudyHero({ namespace }: HeroProps) {
  const t = useTranslations(namespace);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-5 text-balance">
        {t.rich("hero.title", {
          highlight: (chunks) => <span className="text-primary">{chunks}</span>,
        })}
      </h1>
      <p className="text-base sm:text-lg text-foreground-subtle max-w-2xl leading-relaxed">
        {t("hero.subtitle")}
      </p>
    </motion.div>
  );
}
