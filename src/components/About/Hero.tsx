"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("about.hero");

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-sora text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-center text-balance"
        >
          {t.rich("title", {
            highlight: (chunks) => (
              <span className="text-primary">{chunks}</span>
            ),
          })}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-lg md:text-xl text-foreground/70 text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-card p-8 md:p-12"
        >
          <h2 className="font-sora text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            {t("originTitle")}
          </h2>
          <p className="text-foreground/70 leading-relaxed text-base md:text-lg">
            {t("originText")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
