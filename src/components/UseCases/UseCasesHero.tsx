"use client";

import { motion } from "framer-motion";
import { Clock, Gift, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function UseCasesHero() {
  const t = useTranslations("useCases.hero");

  const badges = [
    { icon: Clock, key: "badge1" },
    { icon: Gift, key: "badge2" },
    { icon: Sparkles, key: "badge3" },
  ] as const;

  return (
    <div className="mx-auto max-w-4xl text-center mb-10 sm:mb-14 lg:mb-16">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ delay: 0.05, duration: 0.6 }}
        className="hero-title mb-3 sm:mb-4"
      >
        {t.rich("title", {
          primary: (chunks) => <span className="text-primary">{chunks}</span>,
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
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}
        variants={{
          hidden: { opacity: 1 },
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
        }}
        className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
      >
        {badges.map(({ icon: Icon, key }) => (
          <motion.li
            key={key}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <Icon className="size-4 text-primary" aria-hidden />
            <span>{t(key)}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
