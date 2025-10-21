"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";

const FinalCTA = () => {
  const t = useTranslations("finalCta");
  const trial = useTranslations("hero.trialBadges");

  const bullets = [
    trial("noCreditCard"),
    t("bullets.gdprEncrypted"),
    trial("cancelAnytime"),
  ];

  return (
    <section className="relative overflow-hidden gradient-cta text-white">
      <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/90">{t("subtitle")}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-8 flex max-w-xl flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" variant="accent" asChild>
            <LocalizedLink href="/start">{t("ctaPrimary")}</LocalizedLink>
          </Button>
          <Button size="lg" variant="outline" className="text-white/90" asChild>
            <LocalizedLink href="/demo">{t("ctaSecondary")}</LocalizedLink>
          </Button>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-2 text-sm text-white/90 sm:grid-cols-3"
        >
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-center justify-center gap-2 text-white/90"
            >
              <Check className="size-4" /> {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default FinalCTA;
