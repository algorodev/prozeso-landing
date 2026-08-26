"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { STAGES } from "@/components/Process/constants";
import ProcessDetailDialog from "./ProcessDetailDialog";

const GLOW_POSITIONS = [
  "-bottom-32 -right-24",
  "-top-32 -left-24",
  "-bottom-32 -left-24",
];

export default function ProcessTimeline() {
  const t = useTranslations("home.process");
  const [selected, setSelected] = useState<{
    stageId: string;
    index: number;
  } | null>(null);

  return (
    <section className="container mx-auto max-w-[1280px] px-6 pb-16 pt-8 lg:py-16">
      <div className="space-y-20">
        {STAGES.map((stage, stageIdx) => {
          const StageIcon = stage.icon;
          const activities: number[] = [];
          for (let i = 0; i < 10; i++) {
            if (t.has(`stages.${stage.id}.activities.${i}.name`)) {
              activities.push(i);
            } else {
              break;
            }
          }

          return (
            <div key={stage.id} id={stage.id} className="scroll-mt-24">
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="w-1 self-stretch rounded-full"
                  style={{ background: stage.color }}
                />
                <span
                  className="text-3xl font-sora font-bold leading-none opacity-20"
                  style={{ color: stage.color }}
                >
                  {String(stageIdx + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <StageIcon
                      className="size-4"
                      style={{ color: stage.color }}
                      strokeWidth={1.75}
                    />
                    <h2 className="font-sora text-2xl sm:text-3xl font-semibold tracking-tight">
                      {t(`stages.${stage.id}.name`)}
                    </h2>
                  </div>
                  <p className="text-sm text-foreground-subtle leading-relaxed max-w-2xl mt-1.5">
                    {t(`stages.${stage.id}.description`)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start gap-4 mt-6">
                {activities.map((index, cardIdx) => {
                  const glowPos =
                    GLOW_POSITIONS[cardIdx % GLOW_POSITIONS.length];

                  return (
                    <button
                      key={`${stage.id}-${index}`}
                      type="button"
                      onClick={() => setSelected({ stageId: stage.id, index })}
                      className="group relative rounded-2xl border border-border p-5 overflow-hidden text-left cursor-pointer h-full space-y-3 flex flex-col"
                    >
                      <span
                        className={`pointer-events-none absolute ${glowPos} h-64 w-64 rounded-full blur-[100px] opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
                        style={{ background: stage.color }}
                        aria-hidden="true"
                      />
                      <h3 className="relative font-sora text-base font-semibold leading-tight">
                        {t(`stages.${stage.id}.activities.${index}.name`)}
                      </h3>
                      <p className="relative text-sm text-foreground-subtle leading-relaxed">
                        {t(
                          `stages.${stage.id}.activities.${index}.description`,
                        )}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <ProcessDetailDialog
        selected={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
