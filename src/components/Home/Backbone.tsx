"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AREAS, COLOR_GROUPS } from "@/components/Solutions/constants";
import { Button, SectionHeader } from "@/components/ui";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import { cn } from "@/lib/utils";

const Backbone = () => {
  const t = useTranslations("home.automationSuite");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="relative w-full py-16 md:py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-[1280px]">
        <SectionHeader
          title={t.rich("title", {
            highlight: (chunks) => (
              <span className="text-primary">{chunks}</span>
            ),
            br: () => <br />,
          })}
          subtitle={t("subtitle")}
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1 }}
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 items-start"
        >
          {COLOR_GROUPS.map((group) => {
            const isOpen = openIds.has(group.id);
            const panelId = `backbone-${group.id}`;

            return (
              <motion.div
                key={group.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(group.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(group.id);
                  }
                }}
                className="group relative overflow-hidden rounded-2xl border border-border p-6 md:p-8 flex flex-col cursor-pointer transition-colors duration-300 hover:border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <span
                  className="pointer-events-none absolute -top-20 -right-16 h-44 w-44 rounded-full blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-20"
                  style={{ background: group.color }}
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-1 h-6 rounded-full shrink-0"
                    style={{ background: group.color }}
                  />
                  <h3
                    className="font-sora text-xl font-semibold tracking-tight transition-colors duration-300"
                    style={{ color: isOpen ? group.color : undefined }}
                  >
                    {t(`groups.${group.id}`)}
                  </h3>
                  <ChevronDown
                    className={cn(
                      "ml-auto size-5 text-foreground-subtle transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                    strokeWidth={1.75}
                  />
                </div>
                <p className="text-foreground-subtle leading-relaxed">
                  {t(`groupDescriptions.${group.id}`)}
                </p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 mt-6 pt-6 border-t border-border/60">
                        {group.areaIds.map((areaId) => {
                          const area = AREAS.find((a) => a.id === areaId);
                          if (!area) return null;
                          const Icon = area.icon;

                          return (
                            <LocalizedLink
                              key={areaId}
                              href={`/solutions?group=${group.id}&area=${areaId}#grid`}
                              onClick={(e) => e.stopPropagation()}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors duration-300 ease-out hover:bg-surface-elevated/70"
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
                                  <span className="font-sora font-medium tracking-tight text-foreground">
                                    {t(`areas.${areaId}.name`)}
                                  </span>
                                </div>
                                <p className="text-sm text-foreground-subtle leading-relaxed mt-0.5">
                                  {t(`areas.${areaId}.shortDescription`)}
                                </p>
                              </div>
                            </LocalizedLink>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
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
