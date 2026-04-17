"use client";

import { motion } from "framer-motion";
import { NotebookPen } from "lucide-react";
import { useTranslations } from "next-intl";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";

const FinalCTA = () => {
  const t = useTranslations("home.finalCta");
  const tc = useTranslations("common.cta");

  return (
    <section className="relative py-32 px-6 border-y border-border overflow-hidden bg-background text-foreground">
      <div className="container mx-auto text-center max-w-[1280px] relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="font-sora text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-balance"
        >
          {t.rich("title", {
            highlight: (chunks) => (
              <span className="text-primary">{chunks}</span>
            ),
          })}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="text-lg text-foreground/70 mb-12 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col md:flex-row justify-center items-center gap-3"
        >
          <Button asChild size="lg">
            <LocalizedLink href="/start">
              <NotebookPen className="mr-1 size-5" />
              {tc("startAssessment")}
            </LocalizedLink>
          </Button>
          <BookCallButton />
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
