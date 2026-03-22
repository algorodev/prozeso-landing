"use client";

import { useTranslations } from "next-intl";
import { useAutomationFromParams } from "./useAutomationFromParams";

export function AutomationMetrics() {
  const { automation, id } = useAutomationFromParams();
  const t = useTranslations(`automations.details.${id}`);
  if (!automation || !automation.metrics?.length) return null;

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid md:grid-cols-3 gap-6">
          {automation.metrics.map(
            (
              metric: { stat: string; suffix?: string; description: string },
              idx: number,
            ) => {
              const colors = ["text-chart-2", "text-accent", "text-primary"];
              const bgColors = ["bg-chart-2/5", "bg-accent/5", "bg-primary/5"];
              return (
                <div
                  key={metric.description}
                  className={`${bgColors[idx % bgColors.length]} rounded-3xl p-8 text-center`}
                >
                  <div className="flex items-baseline justify-center mb-4">
                    <span
                      className={`text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tighter ${colors[idx % colors.length]}`}
                    >
                      {metric.stat}
                    </span>
                    {metric.suffix && (
                      <span
                        className={`text-2xl sm:text-3xl md:text-4xl font-extralight ml-1 ${colors[idx % colors.length]}`}
                      >
                        {metric.suffix}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t(`metrics.${idx}.description`, {
                      default: metric.description,
                    })}
                  </p>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
