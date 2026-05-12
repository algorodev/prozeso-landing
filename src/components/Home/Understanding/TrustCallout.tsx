"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export const TrustCallout = () => {
  const t = useTranslations("home.understanding.trust");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="mt-12 rounded-2xl border border-border/60 bg-background-lighter/20 p-6 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-5"
    >
      <div className="w-12 h-12 rounded-xl bg-background-lighter/40 flex items-center justify-center shrink-0">
        <ShieldCheck
          className="w-6 h-6 text-foreground-muted"
          strokeWidth={1.5}
        />
      </div>
      <div className="flex-1">
        <span className="inline-block px-2.5 py-0.5 mb-2 rounded-full text-xs font-medium border border-border/60 bg-background/40 text-foreground-muted">
          {t("tag")}
        </span>
        <h3 className="font-sora font-semibold text-base tracking-tight mb-1">
          {t("title")}
        </h3>
        <p className="text-sm text-foreground-subtle leading-relaxed font-normal">
          {t("desc")}
        </p>
      </div>
    </motion.div>
  );
};
