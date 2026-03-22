"use client";

import { useTranslations } from "next-intl";
import { useAutomationFromParams } from "./useAutomationFromParams";

export function AutomationFeatures() {
  const { automation, id } = useAutomationFromParams();
  const t = useTranslations(`automations.details.${id}`);
  const tc = useTranslations("automations.details.common");
  if (!automation || !automation.features?.length) return null;

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1280px]">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-12">
          {tc("coreFeatures", { default: "Core features" })}
        </h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {automation.features.map(
            (feature: { title: string; description: string }, idx: number) => (
              <div key={feature.title}>
                <h3 className="font-bold mb-2">
                  {t(`features.${idx}.title`, { default: feature.title })}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`features.${idx}.description`, {
                    default: feature.description,
                  })}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
