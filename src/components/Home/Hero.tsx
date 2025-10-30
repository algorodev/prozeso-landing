"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from 'next-themes'
import Image from "next/image";
import { useTranslations } from "next-intl";
import heroDashboardNegro from "@/assets/hero-dashboard-negro.png";
import heroDashboardBlanco from "@/assets/hero-dashboard-blanco.png";
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import { useEffect, useState } from 'react'

const Hero = () => {
  const t = useTranslations("hero");
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const isDark = mounted ? resolvedTheme === "dark" : undefined;

  return (
    <section className="relative isolate min-h-dvh-minus-header bg-secondary overflow-hidden flex items-center">
      <div
        id="hero-bg"
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60rem_60rem_at_50%_-10%,theme(colors.primary/0.12),transparent_60%),radial-gradient(40rem_40rem_at_120%_10%,theme(colors.accent/0.10),transparent_60%)]"
      />
      <div
        id="hero-bg-2"
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_bottom,theme(colors.border/20)_1px,transparent_1px),linear-gradient(to_right,theme(colors.border/20)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(50%_50%_at_50%_0%,black,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl py-20 px-6 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="mx-auto max-w-2xl text-center lg:col-span-6 lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-6xl"
            >
              {t.rich("title", {
                accent: (chunks) => (
                  <span className="text-accent">{chunks}</span>
                ),
              })}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="mt-4 text-pretty text-base leading-7 text-muted-foreground sm:text-lg"
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 lg:justify-start"
            >
              <Button asChild size="lg">
                <LocalizedLink href="/start">
                  {t("ctaPrimary")}
                  <ArrowRight className="ml-2 size-5" />
                </LocalizedLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <LocalizedLink href="/demo">{t("ctaSecondary")}</LocalizedLink>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start"
            >
              <span>{t("trialBadges.freeTrial")}</span>
              <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
              <span>{t("trialBadges.noCreditCard")}</span>
              <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
              <span>{t("trialBadges.cancelAnytime")}</span>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="relative lg:col-span-6"
          >
            <div className="relative mx-auto w-full max-w-xl rounded-2xl border border-border/50 bg-gradient-to-b from-background/60 to-background/30 p-2 shadow-xl backdrop-blur">
              <div
                className="absolute -inset-x-4 -top-4 h-24 rounded-t-[1.25rem] bg-gradient-to-b from-primary/20 to-transparent blur-2xl"
                aria-hidden
              />
              <div className="rounded-xl ring-1 ring-border/60 overflow-hidden">
                <Image
                  src={isDark ? heroDashboardNegro : heroDashboardBlanco}
                  alt={t("imageAlt")}
                  width={1200}
                  height={700}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>
            <div
              className="pointer-events-none absolute -left-10 -top-6 size-40 rounded-full bg-primary/20 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-6 bottom-0 size-40 rounded-full bg-accent/20 blur-3xl"
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
