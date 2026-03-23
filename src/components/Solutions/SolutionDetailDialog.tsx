"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { AREAS } from "@/components/Home/BubbleDiagram/constants";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { LocalizedLink } from "@/i18n/LocalizedLink";

type AutomationDetailDialogProps = {
  selectedAutomation: { areaId: string; index: number } | null;
  onClose: () => void;
};

const AutomationDetailDialog = ({
  selectedAutomation,
  onClose,
}: AutomationDetailDialogProps) => {
  const t = useTranslations("home.automationSuite");

  if (!selectedAutomation) return null;

  const { areaId, index } = selectedAutomation;
  const area = AREAS.find((a) => a.id === areaId);
  if (!area) return null;

  const color = area.color;
  const prefix = `areas.${areaId}.automations.${index}`;

  return (
    <Dialog
      open={selectedAutomation !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-2xl gap-6" closeButtonOutside>
        <DialogHeader>
          <div className="flex items-start gap-3">
            <area.icon
              className="h-6 w-6 shrink-0 mt-1"
              style={{ color }}
              strokeWidth={1.5}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span
                  className="text-3xl font-sora font-bold leading-none opacity-40"
                  style={{ color }}
                >
                  {String(area.startIndex + index).padStart(2, "0")}
                </span>
                <DialogTitle className="font-sora text-xl font-semibold tracking-tight">
                  {t(`${prefix}.name`)}
                </DialogTitle>
              </div>
              {t.has(`${prefix}.subtitle`) && (
                <p className="text-sm text-muted-foreground mt-1">
                  {t(`${prefix}.subtitle`)}
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        {(t.has(`${prefix}.problem`) || t.has(`${prefix}.solution`)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.has(`${prefix}.problem`) && (
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-300">
                  {t("problemLabel")}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${prefix}.problem`)}
                </p>
              </div>
            )}
            {t.has(`${prefix}.solution`) && (
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-green-300">
                  {t("solutionLabel")}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${prefix}.solution`)}
                </p>
              </div>
            )}
          </div>
        )}

        {t.has(`${prefix}.benefits`) && (
          <div className="space-y-3">
            <span
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color }}
            >
              {t("benefitsLabel")}
            </span>
            <ul className="space-y-1.5">
              {t(`${prefix}.benefits`)
                .split("·")
                .map((item) => item.trim())
                .filter(Boolean)
                .map((benefit) => (
                  <li
                    key={benefit}
                    className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-muted-foreground" />
                    {benefit}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {t.has(`${prefix}.impact`) && t(`${prefix}.impact`) && (
          <div
            className="space-y-3 rounded-lg px-4 py-3"
            style={{
              backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
            }}
          >
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              {t("impactLabel")}
            </span>
            <div className="flex items-center gap-3">
              {(() => {
                const impact = t(`${prefix}.impact`);
                const match = impact.match(
                  /^([↑↓×+-]?\s*[\d,.]+%?\s*[↑↓×]?\s*[\d,.]*%?)\s*(.*)/,
                );
                const rawMetric = match?.[1]?.trim() ?? impact;
                const desc = match?.[2]?.trim() ?? "";
                const hasUp = rawMetric.includes("↑");
                const hasDown = rawMetric.includes("↓");
                const metric = rawMetric.replace(/[↑↓]/g, "").trim();
                return (
                  <>
                    <span
                      className="flex items-center gap-1 text-2xl font-sora font-bold"
                      style={{ color }}
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

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild size="sm" className="text-xs px-4 py-2 rounded-md">
            <LocalizedLink href="/start">{t("startAssessment")}</LocalizedLink>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutomationDetailDialog;
