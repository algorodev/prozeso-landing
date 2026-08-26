"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

const SOLUTION_ITEM_IDS = ["0", "1", "2", "3", "4"] as const;

type NarrativeProps = {
  namespace: string;
};

const ProseBlock = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div>
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="font-sora text-2xl sm:text-3xl font-semibold tracking-tight mb-6 text-balance"
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ delay: 0.05, duration: 0.5 }}
      className="space-y-4 text-foreground-subtle leading-relaxed text-base sm:text-lg max-w-2xl"
    >
      {children}
    </motion.div>
  </div>
);

export default function CaseStudyNarrative({ namespace }: NarrativeProps) {
  const t = useTranslations(namespace);

  return (
    <div className="space-y-16 sm:space-y-20">
      <ProseBlock title={t("problem.title")}>
        <p>{t("problem.body1")}</p>
        <p>{t("problem.body2")}</p>
      </ProseBlock>

      <div className="rounded-3xl bg-background-lighter/30 p-6 sm:p-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-sora text-2xl sm:text-3xl font-semibold tracking-tight mb-3 text-balance"
        >
          {t("solution.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="text-foreground-subtle leading-relaxed text-base sm:text-lg mb-8 max-w-2xl"
        >
          {t("solution.intro")}
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1 }}
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {SOLUTION_ITEM_IDS.map((id) => (
            <motion.div
              key={id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <h3 className="font-sora text-base font-semibold tracking-tight mb-2">
                {t(`solution.items.${id}.title`)}
              </h3>
              <p className="text-sm text-foreground-subtle leading-relaxed">
                {t(`solution.items.${id}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProseBlock title={t("technical.title")}>
        <p>{t("technical.body1")}</p>
        <p>{t("technical.body2")}</p>
        <p>{t("technical.body3")}</p>
        <div className="rounded-2xl border border-primary/25 bg-primary/5 p-6 mt-8">
          <h3 className="font-sora text-base font-semibold tracking-tight mb-2 text-foreground">
            {t("technical.honestyTitle")}
          </h3>
          <p className="text-sm leading-relaxed">{t("technical.honesty")}</p>
        </div>
      </ProseBlock>

      <ProseBlock title={t("evolution.title")}>
        <p>{t("evolution.body1")}</p>
        <p>{t("evolution.body2")}</p>
      </ProseBlock>
    </div>
  );
}
