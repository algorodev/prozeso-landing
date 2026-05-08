"use client";

import { useTranslations } from "next-intl";
import { AREAS } from "@/components/Solutions/constants";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
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
      <DialogContent className="sm:max-w-2xl gap-6">
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
                <p className="text-sm text-foreground-muted mt-1">
                  {t(`${prefix}.subtitle`)}
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        {t.has(`${prefix}.state`) && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              {t("stateLabel")}:
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border"
              style={{
                color,
                borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
              }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: color }}
                aria-hidden="true"
              />
              {t(`stateValues.${t(`${prefix}.state`)}`)}
            </span>
          </div>
        )}

        {t.has(`${prefix}.description`) && (
          <p className="text-sm text-foreground-muted leading-relaxed">
            {t(`${prefix}.description`)}
          </p>
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
