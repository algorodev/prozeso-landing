"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { AREAS, COLOR_GROUPS } from "@/components/Solutions/constants";
import { Button } from "@/components/ui";
import { LocalizedLink } from "@/i18n/LocalizedLink";

const Backbone = () => {
  const t = useTranslations("home.automationSuite");

  return (
    <section className="relative w-full py-16 md:py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-[1280px]">
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <motion.h2
            className="font-sora text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6 text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </motion.h2>
          <motion.p
            className="text-lg text-foreground-muted font-normal"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ delay: 0.05, duration: 0.6 }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1 }}
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
        >
          {COLOR_GROUPS.map((group) => (
            <motion.div
              key={group.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="rounded-2xl border border-border/60 bg-background-lighter/10 p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-1 h-6 rounded-full shrink-0"
                  style={{ background: group.color }}
                />
                <h3
                  className="font-sora text-xl font-semibold tracking-tight"
                  style={{ color: group.color }}
                >
                  {t(`groups.${group.id}`)}
                </h3>
              </div>

              <div className="space-y-2">
                {group.areaIds.map((areaId) => {
                  const area = AREAS.find((a) => a.id === areaId);
                  if (!area) return null;
                  const Icon = area.icon;

                  return (
                    <LocalizedLink
                      key={areaId}
                      href={`/solutions?group=${group.id}&area=${areaId}#grid`}
                      className="group flex items-start gap-3 rounded-lg p-3 -mx-3 transition-colors hover:bg-background/40"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${group.color} 12%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${group.color} 25%, transparent)`,
                        }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: group.color }}
                          strokeWidth={1.75}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-sora font-medium text-sm tracking-tight text-foreground">
                            {t(`areas.${areaId}.name`)}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-muted leading-relaxed mt-0.5">
                          {t(`areas.${areaId}.shortDescription`)}
                        </p>
                      </div>
                    </LocalizedLink>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <LocalizedLink href="/solutions">
              {t("viewAll")}
              <ArrowRight className="ml-1 size-4" />
            </LocalizedLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Backbone;
