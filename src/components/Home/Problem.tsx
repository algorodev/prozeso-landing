"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/Card";

const Problem = () => {
  const t = useTranslations("problem");

  const lead = t("lead");
  const paragraphs = (t.raw("paragraphs") as string[]) || [];

  return (
    <section className="relative overflow-x-clip">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {t("title")}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="mx-auto mt-8 max-w-3xl"
        >
          <Card className="relative overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/5 shadow-sm transition-shadow hover:shadow-lg hover:shadow-destructive/20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-10 size-60 rounded-full bg-destructive/20 blur-3xl"
            />
            <CardContent className="relative p-6 sm:p-8">
              <p className="text-pretty text-xl font-semibold leading-7 sm:text-2xl">
                {lead}
              </p>
              <div className="mt-5 space-y-3 text-base leading-7 text-muted-foreground sm:text-lg">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute -top-24 right-0 size-[22rem] rounded-full bg-destructive/10 blur-3xl" />
    </section>
  );
};

export default Problem;
