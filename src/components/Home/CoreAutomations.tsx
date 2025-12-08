"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";

const CoreAutomations = () => {
  const t = useTranslations("home.coreAutomations");

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
              <span className="text-chart-2">{chunks}</span>
            ),
          })}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="text-lg text-muted-foreground mb-12 max-w-xl font-normal"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              id: "receptionist",
              href: "/automations/receptionist-in-a-box",
            },
            {
              id: "reminders",
              href: "/automations/appointment-reminders-smart-reschedule",
            },
            {
              id: "callback",
              href: "/automations/missed-call-auto-callback",
            },
          ].map((automation, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <LocalizedLink href={automation.href}>
                <div className="group h-full p-6 rounded-2xl border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer">
                  <h3 className="font-sora text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    {t(`items.${automation.id}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-normal">
                    {t(`items.${automation.id}.desc`)}
                  </p>
                  <span className="text-sm font-medium flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                    {t("learnMore")} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </LocalizedLink>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Button asChild variant="outline">
            <LocalizedLink href="/automations">{t("viewAll")}</LocalizedLink>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreAutomations;
