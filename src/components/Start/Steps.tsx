"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const STEPS = [
  { number: "01", id: "intro" },
  { number: "02", id: "call" },
  { number: "03", id: "launch" },
] as const;

export function Steps() {
  const t = useTranslations("start.steps.items");

  return (
    <section className="py-12 sm:py-16 px-6">
      <div className="container mx-auto max-w-[1280px]">
        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.15 }}
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="space-y-12 sm:space-y-14"
        >
          {STEPS.map(({ number, id }, i) => (
            <motion.li
              key={id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 items-start max-w-3xl"
            >
              <span
                aria-hidden
                className="font-sora text-5xl sm:text-7xl font-extralight tracking-tighter text-primary/30 leading-none select-none tabular-nums pt-1"
              >
                {number}
              </span>
              <div className="min-w-0">
                <h3 className="font-sora text-xl sm:text-2xl font-semibold tracking-tight mb-2">
                  {t(`${id}.title`)}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t(`${id}.desc`)}
                </p>
                {i < STEPS.length - 1 && (
                  <div
                    aria-hidden
                    className="mt-12 sm:mt-14 -mb-12 sm:-mb-14 h-px bg-border/60"
                  />
                )}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
