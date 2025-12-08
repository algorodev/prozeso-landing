"use client";

import { useTranslations } from "next-intl";
import { useAutomationFromParams } from "./useAutomationFromParams";

export function AutomationPoweredBy() {
  const { automation, id } = useAutomationFromParams();
  if (!automation || !automation.tools?.length) return null;
  const t = useTranslations(`automations.details.${id}`);
  const tc = useTranslations("automations.details.common");

  return (
    <section className="py-16 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground mr-2">
            {tc("poweredBy", { default: "Powered by" })}
          </span>
          {automation.tools.map((tool: string, idx: number) => (
            <span
              key={tool}
              className="text-sm px-4 py-2 rounded-full border bg-accent/10 text-accent border-accent/20"
            >
              {t(`tools.${idx}`, { default: tool })}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
