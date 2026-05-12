"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessagesSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import HeroBackground from "@/components/Home/HeroBackground";
import { Button } from "@/components/ui";
import { LocalizedLink } from "@/i18n/LocalizedLink";

const Hero = () => {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate min-h-dvh-minus-header overflow-hidden flex items-center">
      <HeroBackground />
      <div className="relative mx-auto max-w-7xl py-20 px-6 sm:px-8">
        <div className="flex">
          <div className="text-center lg:text-left lg:w-2/3">
            <motion.h1
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="display-hero"
            >
              {t.rich("title", {
                primary: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
                secondary: (chunks) => (
                  <span className="text-accent-01">{chunks}</span>
                ),
              })}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="mt-6 text-balance body-lg font-medium tracking-tight text-foreground-subtle"
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3 lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto btn-gradient-hover"
              >
                <LocalizedLink href="/start">
                  <MessagesSquare className="size-5" />
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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 body-sm text-foreground-muted lg:justify-start"
            >
              <span>{t("trialBadges.freeTrial")}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{t("trialBadges.noCreditCard")}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{t("trialBadges.cancelAnytime")}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
