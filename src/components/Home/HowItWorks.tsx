"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Handshake,
  Link2,
  RefreshCw,
  ScanSearch,
  Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const HowItWorks = () => {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      icon: ScanSearch,
      title: t("steps.discovery.title"),
      body: t("steps.discovery.body"),
    },
    {
      icon: Workflow,
      title: t("steps.design.title"),
      body: t("steps.design.body"),
    },
    {
      icon: Link2,
      title: t("steps.build.title"),
      body: t("steps.build.body"),
    },
    {
      icon: Bot,
      title: t("steps.monitor.title"),
      body: t("steps.monitor.body"),
    },
    {
      icon: RefreshCw,
      title: t("steps.iterate.title"),
      body: t("steps.iterate.body"),
    },
    {
      icon: Handshake,
      title: t("steps.scale.title"),
      body: t("steps.scale.body"),
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  } as const;

  const child = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  } as const;

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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="mt-3 text-muted-foreground"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <svg
          className="pointer-events-none absolute inset-x-0 top-36 hidden h-[640px] w-full md:block"
          id="sw-js-blob-svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs>
            <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
              <stop
                id="stop1"
                stopColor="rgba(230, 172, 61, 1)"
                offset="0%"
              ></stop>
              <stop
                id="stop2"
                stopColor="rgba(230, 172, 61, 1)"
                offset="100%"
              ></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#sw-gradient)"
            d="M9.3,-13.5C16.1,-7.8,28.4,-10.5,33.7,-7.8C39,-5,37.1,3.2,30.7,6C24.4,8.9,13.6,6.3,7.7,11.8C1.8,17.2,0.9,30.7,-1.4,32.6C-3.8,34.6,-7.5,25.1,-7.7,17.8C-7.8,10.5,-4.3,5.4,-5.1,1.9C-5.8,-1.5,-10.8,-3.3,-13,-6.6C-15.2,-9.9,-14.6,-14.6,-12,-21.7C-9.4,-28.7,-4.7,-38.1,-1.7,-35.7C1.2,-33.4,2.5,-19.2,9.3,-13.5Z"
            width="100%"
            height="100%"
            transform="translate(50 50)"
            strokeWidth="0"
            style={{ transition: "0.3s" }}
            stroke="url(#sw-gradient)"
          ></path>
        </svg>

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto mt-12"
        >
          <div
            className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-border"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {steps.map(({ icon: Icon, title, body }, idx) => {
              const isRight = idx % 2 === 1;
              return (
                <motion.li
                  key={title}
                  variants={child}
                  className={cn(
                    "relative",
                    "md:[&:nth-child(odd)]:translate-y-0 md:[&:nth-child(even)]:translate-y-14",
                  )}
                >
                  <span
                    className="md:hidden absolute -left-[7px] top-6 h-3.5 w-3.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <article
                    className={cn(
                      "group rounded-2xl border border-border bg-card shadow-sm backdrop-blur-sm",
                      "p-5 sm:p-6 hover:shadow-md transition-shadow",
                      isRight && "md:text-right",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-start gap-3",
                        isRight && "md:flex-row-reverse",
                      )}
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="grow">
                        <h3 className="mt-1 text-lg font-semibold text-foreground">
                          {title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {body}
                        </p>
                      </div>
                    </div>
                  </article>
                  <div
                    className={cn(
                      "hidden md:block absolute top-8",
                      isRight ? "-left-1 rotate-180" : "-right-1",
                    )}
                    aria-hidden="true"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      className="text-muted-foreground"
                    >
                      <path d="M0 6 L12 0 L12 12 Z" fill="currentColor" />
                    </svg>
                  </div>
                </motion.li>
              );
            })}
          </div>
        </motion.ol>
      </div>
    </section>
  );
};

export default HowItWorks;
