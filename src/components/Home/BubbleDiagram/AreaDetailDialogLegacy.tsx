"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { AREAS } from "./constants";

type AreaDetailDialogProps = {
  selectedArea: string | null;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const AreaDetailDialog = ({
  selectedArea,
  onClose,
  activeTab,
  onTabChange,
}: AreaDetailDialogProps) => {
  const t = useTranslations("home.automationSuite");

  const selected = AREAS.find((a) => a.id === selectedArea);
  if (!selected) return null;

  const automationIndices: number[] = [];
  for (let i = 0; i < 10; i++) {
    if (t.has(`areas.${selected.id}.automations.${i}.name`)) {
      automationIndices.push(i);
    } else {
      break;
    }
  }

  return (
    <Dialog
      open={selectedArea !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-5xl" closeButtonOutside>
        {/* Full-width header */}
        <DialogHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <selected.icon
                className="h-6 w-6 shrink-0"
                style={{ color: selected.color }}
                strokeWidth={1.5}
              />
              <DialogTitle className="font-sora text-2xl font-semibold tracking-tight">
                {t(`areas.${selected.id}.name`)}
              </DialogTitle>
            </div>
            {automationIndices.length > 0 && (
              <span
                className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  color: selected.color,
                  backgroundColor: `color-mix(in srgb, ${selected.color} 12%, transparent)`,
                }}
              >
                {t("automationCount", { count: automationIndices.length })}
              </span>
            )}
          </div>
          {t.has(`areas.${selected.id}.tagline`) &&
            t(`areas.${selected.id}.tagline`) && (
              <DialogDescription className="max-w-prose text-pretty">
                {t(`areas.${selected.id}.tagline`)}
              </DialogDescription>
            )}
        </DialogHeader>

        {/* Sidebar + Content */}
        <Tabs
          value={activeTab}
          onValueChange={onTabChange}
          orientation="vertical"
          className="flex flex-col md:flex-row gap-0 mt-4"
        >
          {/* Sidebar */}
          <div className="shrink-0 md:w-[280px] border-b md:border-b-0 md:border-none border-border pr-6 space-y-5">
            {automationIndices.length > 0 && (
              <div className="space-y-2 pb-5 border-b border-border">
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    color: selected.color,
                    backgroundColor: `color-mix(in srgb, ${selected.color} 12%, transparent)`,
                  }}
                >
                  {t("automationCount", { count: automationIndices.length })}
                </span>
                <p className="text-xs text-muted-foreground">
                  {t("automationPickCta")}
                </p>
              </div>
            )}

            <TabsList className="h-auto bg-transparent gap-2 p-0 flex-col items-stretch md:flex-col flex-wrap md:flex-nowrap">
              {automationIndices.map((i) => (
                <TabsTrigger
                  key={i}
                  value={String(i)}
                  className="h-auto rounded-lg px-3.5 py-1.5 text-sm font-medium cursor-pointer bg-white/5 text-white/70 border-transparent justify-start data-[state=active]:bg-white/5 data-[state=active]:shadow-none dark:data-[state=active]:bg-white/5 dark:data-[state=active]:border-current"
                  style={{
                    ...(activeTab === String(i) && {
                      color: selected.color,
                      borderColor: selected.color,
                    }),
                  }}
                >
                  {t(`areas.${selected.id}.automations.${i}.name`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 md:pl-6 bg-[#1a1c1e] rounded-lg p-6">
            {automationIndices.map((i) => (
              <TabsContent key={i} value={String(i)} className="mt-0">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <span
                      className="text-4xl font-sora font-bold opacity-20"
                      style={{ color: selected.color }}
                    >
                      {String(selected.startIndex + i).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-sora font-semibold">
                        {t(`areas.${selected.id}.automations.${i}.name`)}
                      </h3>
                      {t.has(
                        `areas.${selected.id}.automations.${i}.subtitle`,
                      ) && (
                        <p className="text-sm text-muted-foreground">
                          {t(`areas.${selected.id}.automations.${i}.subtitle`)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Problem & Solution */}
                  {(t.has(`areas.${selected.id}.automations.${i}.problem`) ||
                    t.has(
                      `areas.${selected.id}.automations.${i}.solution`,
                    )) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {t.has(
                        `areas.${selected.id}.automations.${i}.problem`,
                      ) && (
                        <div className="space-y-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-red-300">
                            {t("problemLabel")}
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t(`areas.${selected.id}.automations.${i}.problem`)}
                          </p>
                        </div>
                      )}
                      {t.has(
                        `areas.${selected.id}.automations.${i}.solution`,
                      ) && (
                        <div className="space-y-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-green-300">
                            {t("solutionLabel")}
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t(
                              `areas.${selected.id}.automations.${i}.solution`,
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Benefits */}
                  {t.has(`areas.${selected.id}.automations.${i}.benefits`) && (
                    <div className="space-y-3">
                      <span
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: selected.color }}
                      >
                        {t("benefitsLabel")}
                      </span>
                      <ul className="space-y-1.5">
                        {t(`areas.${selected.id}.automations.${i}.benefits`)
                          .split("·")
                          .map((item) => item.trim())
                          .filter(Boolean)
                          .map((benefit, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-muted-foreground" />
                              {benefit}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {/* Impact metric */}
                  {t.has(`areas.${selected.id}.automations.${i}.impact`) &&
                    t(`areas.${selected.id}.automations.${i}.impact`) && (
                      <div
                        className="space-y-3 rounded-lg px-4 py-3"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${selected.color} 12%, transparent)`,
                        }}
                      >
                        <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          {t("impactLabel")}
                        </span>
                        <div className="flex items-center gap-3">
                          {(() => {
                            const impact = t(
                              `areas.${selected.id}.automations.${i}.impact`,
                            );
                            const match = impact.match(
                              /^([↑↓×+-]?\s*[\d,.]+%?\s*[↑↓×]?\s*[\d,.]*%?)\s*(.*)/,
                            );
                            const rawMetric = match?.[1]?.trim() ?? impact;
                            const desc = match?.[2]?.trim() ?? "";
                            const hasUp = rawMetric.includes("↑");
                            const hasDown = rawMetric.includes("↓");
                            const metric = rawMetric
                              .replace(/[↑↓]/g, "")
                              .trim();
                            return (
                              <>
                                <span
                                  className="flex items-center gap-1 text-2xl font-sora font-bold"
                                  style={{ color: selected.color }}
                                >
                                  {hasUp && <ArrowUp className="h-5 w-5" />}
                                  {hasDown && <ArrowDown className="h-5 w-5" />}
                                  {metric}
                                </span>
                                {desc && (
                                  <span className="text-sm text-muted-foreground">
                                    {desc}
                                  </span>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AreaDetailDialog;
