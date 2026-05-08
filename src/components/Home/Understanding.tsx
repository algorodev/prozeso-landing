"use client";

import { motion } from "framer-motion";
import { Brain, Mic, Network, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const Understanding = () => {
  const t = useTranslations("home.understanding");

  const layers = [
    { id: "input", icon: Mic },
    { id: "orchestration", icon: Network },
    { id: "intelligence", icon: Brain },
  ] as const;

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="font-sora text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6 text-balance"
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
          className="text-lg text-foreground-muted mb-16 max-w-xl font-normal"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          variants={{
            hidden: { opacity: 1 },
            show: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="grid md:grid-cols-3 gap-6"
        >
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group flex flex-col h-full"
              >
                <div className="transition-all duration-300 border border-transparent hover:border-secondary rounded-2xl aspect-[4/3] flex items-center justify-center mb-6 relative overflow-hidden">
                  <div className="w-20 h-20 rounded-2xl bg-secondary/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-125">
                    <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <span className="inline-block w-fit px-3 py-1 mb-3 rounded-full text-xs font-medium border bg-secondary/10 text-secondary border-secondary/20">
                  {t(`items.${layer.id}.tag`)}
                </span>
                <h3 className="font-sora font-semibold text-xl tracking-tight mb-2 leading-snug">
                  {t(`items.${layer.id}.title`)}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed font-normal">
                  {t(`items.${layer.id}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-12 rounded-2xl border border-border/60 bg-background-lighter/20 p-6 flex flex-col sm:flex-row items-start gap-5"
        >
          <div className="w-12 h-12 rounded-xl bg-background-lighter/40 flex items-center justify-center shrink-0">
            <ShieldCheck
              className="w-6 h-6 text-foreground-muted"
              strokeWidth={1.5}
            />
          </div>
          <div className="flex-1">
            <span className="inline-block px-2.5 py-0.5 mb-2 rounded-full text-xs font-medium border border-border/60 bg-background/40 text-foreground-muted">
              {t("trust.tag")}
            </span>
            <h3 className="font-sora font-semibold text-base tracking-tight mb-1">
              {t("trust.title")}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed font-normal">
              {t("trust.desc")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Understanding;
