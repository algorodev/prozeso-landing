"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessagesSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, SectionHeader } from "@/components/ui";
import { LocalizedLink } from "@/i18n/LocalizedLink";

type CtaProps = {
  namespace: string;
};

export default function CaseStudyCta({ namespace }: CtaProps) {
  const t = useTranslations(namespace);

  return (
    <section className="relative py-24 sm:py-32 px-6 border-t border-border overflow-hidden bg-background text-foreground">
      <div className="container mx-auto text-center max-w-[1280px] relative z-10">
        <SectionHeader title={t("cta.title")} subtitle={t("cta.subtitle")} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col md:flex-row justify-center items-center gap-3"
        >
          <Button asChild size="lg">
            <LocalizedLink href="/start">
              <MessagesSquare className="mr-1 size-5" />
              {t("cta.ctaPrimary")}
            </LocalizedLink>
          </Button>
          <Button asChild size="lg" variant="outline">
            <LocalizedLink href="/solutions">
              {t("cta.ctaSecondary")}
              <ArrowRight className="ml-1 size-5" />
            </LocalizedLink>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
