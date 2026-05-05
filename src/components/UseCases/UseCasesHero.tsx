"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessagesSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";

export function UseCasesHero() {
  const t = useTranslations("useCases.hero");

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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3"
      >
        <Button asChild size="lg" className="w-full sm:w-auto">
          <LocalizedLink href="/start">
            <MessagesSquare className="mr-1 size-5" />
            {t("ctaPrimary")}
          </LocalizedLink>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
        >
          <LocalizedLink href="/solutions">
            {t("ctaSecondary")}
            <ArrowRight className="ml-1 size-5" />
          </LocalizedLink>
        </Button>
      </motion.div>
    </div>
  );
}
