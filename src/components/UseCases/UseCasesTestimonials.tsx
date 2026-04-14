"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";

const TESTIMONIAL_IDS = ["1", "2", "3", "4", "5", "6"] as const;

export default function UseCasesTestimonials() {
  const t = useTranslations("useCases.testimonials");

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="section-title mb-4"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="hero-subtitle text-muted-foreground max-w-3xl mx-auto"
        >
          {t("subtitle")}
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.1 }}
        variants={{
          hidden: { opacity: 1 },
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {TESTIMONIAL_IDS.map((id) => {
          const name = t(`items.${id}.name`);
          const initials = name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

          return (
            <motion.div
              key={id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card className="h-full border-border/60 bg-transparent hover:border-border transition-colors">
                <CardContent className="pt-6 pb-6 flex flex-col h-full">
                  <Quote
                    className="size-7 text-primary/60 mb-4"
                    aria-hidden="true"
                  />
                  <p className="text-base leading-relaxed text-foreground mb-6 flex-1">
                    “{t(`items.${id}.quote`)}”
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <Avatar className="size-11 border border-border/60">
                      <AvatarImage src={t(`items.${id}.avatar`)} alt={name} />
                      <AvatarFallback className="text-sm font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">
                        {name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t(`items.${id}.role`)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
