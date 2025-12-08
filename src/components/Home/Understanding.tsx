"use client";

import { motion } from "framer-motion";
import { Calendar, MessageSquare, Shield, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

const Understanding = () => {
  const t = useTranslations("home.understanding");

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
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
          className="text-lg text-muted-foreground mb-16 max-w-xl font-normal"
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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              id: "conversations",
              icon: MessageSquare,
            },
            {
              id: "decisions",
              icon: TrendingUp,
            },
            {
              id: "automation",
              icon: Calendar,
            },
            {
              id: "security",
              icon: Shield,
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group flex flex-col h-full"
              >
                <div
                  className={`transition-all duration-300 bg-card border border-transparent hover:border-accent rounded-2xl aspect-[4/3] flex items-center justify-center mb-6 relative overflow-hidden`}
                >
                  <div className="w-20 h-20 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-125">
                    <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-sora font-semibold text-lg mb-2 leading-snug">
                  {t(`items.${feature.id}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-normal">
                  {t(`items.${feature.id}.desc`)}
                </p>
                <span className="inline-block w-fit mt-auto px-3 py-1 rounded-full text-xs font-medium border bg-accent/10 text-accent border-accent/20">
                  {t(`items.${feature.id}.tag`)}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Understanding;
