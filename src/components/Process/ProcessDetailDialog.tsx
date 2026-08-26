"use client";

import { useTranslations } from "next-intl";
import { STAGES } from "@/components/Process/constants";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { LocalizedLink } from "@/i18n/LocalizedLink";

type ProcessDetailDialogProps = {
  selected: { stageId: string; index: number } | null;
  onClose: () => void;
};

const ProcessDetailDialog = ({
  selected,
  onClose,
}: ProcessDetailDialogProps) => {
  const t = useTranslations("home.process");

  if (!selected) return null;

  const { stageId, index } = selected;
  const stage = STAGES.find((s) => s.id === stageId);
  if (!stage) return null;

  const color = stage.color;
  const prefix = `stages.${stageId}.activities.${index}`;

  return (
    <Dialog
      open={selected !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-2xl gap-6">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <stage.icon
              className="h-6 w-6 shrink-0 mt-1"
              style={{ color }}
              strokeWidth={1.5}
            />
            <div className="min-w-0">
              <DialogTitle className="font-sora text-xl font-semibold tracking-tight">
                {t(`${prefix}.name`)}
              </DialogTitle>
              <p className="text-sm text-foreground-subtle mt-1">
                {t(`stages.${stageId}.name`)}
              </p>
            </div>
          </div>
        </DialogHeader>

        <p className="text-sm text-foreground-subtle leading-relaxed">
          {t(`${prefix}.description`)}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild size="sm" className="text-xs px-4 py-2 rounded-md">
            <LocalizedLink href="/start">{t("startCta")}</LocalizedLink>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessDetailDialog;
