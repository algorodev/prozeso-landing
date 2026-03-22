"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { AREAS } from "./constants";

type AreaDetailDialogProps = {
  selectedArea: string | null;
  onClose: () => void;
};

/* Each card index gets a different glow + clip-path shape, cycling through 4 variants */
const GLOW_VARIANTS = [
  {
    // Bottom-right unmasked + square-masked center
    unmasked: "-bottom-32 -right-24",
    mask: {
      top: -2,
      left: -2,
      width: "55%",
      height: "70%",
      clipPath: undefined as string | undefined,
    },
    maskBlob: { left: "calc(60% + 20px)", top: "calc(60% + 2px)" },
  },
  {
    // Top-left unmasked + triangle-masked center
    unmasked: "-top-32 -left-24",
    mask: {
      top: "30%",
      left: "50%",
      width: "150%",
      height: "130%",
      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
    },
    maskBlob: { left: "calc(60% + 20px)", top: "calc(60% + 2px)" },
  },
  {
    // Bottom-left unmasked + circle-masked top-right
    unmasked: "-bottom-32 -left-24",
    mask: {
      top: "-100px",
      left: "30%",
      width: "130%",
      height: "130%",
      clipPath: "circle(50% at 50% 50%)",
    },
    maskBlob: { left: "30%", top: "50%" },
  },
  {
    // Top-right unmasked + square-masked bottom-left
    unmasked: "-top-32 -right-24",
    mask: {
      top: "30%",
      left: -2,
      width: "55%",
      height: "70%",
      clipPath: undefined as string | undefined,
    },
    maskBlob: { left: "calc(40% - 20px)", top: "calc(60% + 2px)" },
  },
];

const AreaDetailDialog = ({ selectedArea, onClose }: AreaDetailDialogProps) => {
  const t = useTranslations("home.automationSuite");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`,
    );
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

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

  const color = selected.color;

  return (
    <Dialog
      open={selectedArea !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-5xl" closeButtonOutside>
        {/* Header */}
        <DialogHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <selected.icon
                className="h-6 w-6 shrink-0"
                style={{ color }}
                strokeWidth={1.5}
              />
              <DialogTitle className="font-sora text-2xl font-semibold tracking-tight">
                {t(`areas.${selected.id}.name`)}
              </DialogTitle>
            </div>
            {automationIndices.length > 0 && (
              <span
                className="hidden sm:inline shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  color,
                  backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
                }}
              >
                {t("automationCount", { count: automationIndices.length })}
              </span>
            )}
          </div>
          {t.has(`areas.${selected.id}.tagline`) &&
            t(`areas.${selected.id}.tagline`) && (
              <DialogDescription className="max-w-prose text-pretty text-left">
                {t(`areas.${selected.id}.tagline`)}
              </DialogDescription>
            )}
        </DialogHeader>

        {/* Badge — mobile only */}
        {automationIndices.length > 0 && (
          <span
            className="sm:hidden w-fit rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              color,
              backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
            }}
          >
            {t("automationCount", { count: automationIndices.length })}
          </span>
        )}

        {/* Grid of automation cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 mt-2">
          {automationIndices.map((i, index) => {
            const glow = GLOW_VARIANTS[index % GLOW_VARIANTS.length];

            return (
              /* biome-ignore lint/a11y/noStaticElementInteractions: mouse tracking for visual effect only */
              <div
                key={i}
                onMouseMove={handleMouseMove}
                className="group relative rounded-2xl p-px overflow-hidden"
                style={{ background: "var(--color-border)" }}
              >
                {/* Cursor spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                  style={{
                    background: `radial-gradient(circle 150px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), ${color}, transparent)`,
                  }}
                />

                {/* Inner card */}
                <div className="relative z-10 w-full rounded-[15px] bg-background p-5 overflow-hidden space-y-4">
                  {/* Unmasked glow */}
                  <span
                    className={`pointer-events-none absolute ${glow.unmasked} h-64 w-64 rounded-full blur-[100px] opacity-20`}
                    style={{ background: color }}
                    aria-hidden="true"
                  />

                  {/* Masked glow */}
                  <div
                    className="pointer-events-none absolute overflow-hidden"
                    style={{
                      top: glow.mask.top,
                      left: glow.mask.left,
                      width: glow.mask.width,
                      height: glow.mask.height,
                      ...(glow.mask.clipPath && {
                        clipPath: glow.mask.clipPath,
                      }),
                      ...(index === 1 && { transform: "translateX(-50%)" }),
                    }}
                    aria-hidden="true"
                  >
                    <span
                      className="absolute h-64 w-64 rounded-full blur-[100px] opacity-10 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        background: color,
                        left: glow.maskBlob.left,
                        top: glow.maskBlob.top,
                      }}
                    />
                  </div>

                  {/* Number + Name */}
                  <div className="relative flex items-start gap-3">
                    <span
                      className="text-3xl font-sora font-bold leading-none opacity-20"
                      style={{ color }}
                    >
                      {String(selected.startIndex + i).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-sora text-lg font-semibold leading-tight">
                        {t(`areas.${selected.id}.automations.${i}.name`)}
                      </h3>
                      {t.has(
                        `areas.${selected.id}.automations.${i}.subtitle`,
                      ) && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {t(`areas.${selected.id}.automations.${i}.subtitle`)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Benefits checklist */}
                  {t.has(`areas.${selected.id}.automations.${i}.benefits`) && (
                    <div className="relative space-y-3 py-2">
                      {t(`areas.${selected.id}.automations.${i}.benefits`)
                        .split("·")
                        .map((item) => item.trim())
                        .filter(Boolean)
                        .map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <div
                              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5"
                              style={{
                                backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`,
                              }}
                            >
                              <Check
                                className="h-3 w-3"
                                style={{ color }}
                                strokeWidth={2.5}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {benefit}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Impact chip */}
                  {t.has(`areas.${selected.id}.automations.${i}.impact`) &&
                    t(`areas.${selected.id}.automations.${i}.impact`) && (
                      <div
                        className="relative rounded-lg px-3 py-2 flex items-center gap-2"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
                        }}
                      >
                        {(() => {
                          const impact = t(
                            `areas.${selected.id}.automations.${i}.impact`,
                          );
                          const match = impact.match(
                            /^([↑↓×+-]?\s*[\d,.]+%?\s*[↑↓×]?\s*[\d,.]*%?)\s*(.*)/,
                          );
                          const metric = match?.[1]?.trim() ?? impact;
                          const desc = match?.[2]?.trim() ?? "";
                          return (
                            <>
                              <span
                                className="text-lg font-sora font-bold"
                                style={{ color }}
                              >
                                {metric}
                              </span>
                              {desc && (
                                <span className="text-xs text-muted-foreground">
                                  {desc}
                                </span>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AreaDetailDialog;
