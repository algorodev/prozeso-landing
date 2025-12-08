"use client";

import { useTranslations } from "next-intl";
import { useAutomationFromParams } from "./useAutomationFromParams";

export function AutomationProblemSolution() {
  const { automation, id } = useAutomationFromParams();
  if (!automation) return null;
  const t = useTranslations(`automations.details.${id}`);
  const tc = useTranslations("automations.details.common");

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              {tc("theProblem", { default: "The Problem" })}
            </p>
            <p className="text-xl md:text-2xl leading-relaxed">
              {t("problem", { default: automation.problem })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              {tc("theSolution", { default: "The Solution" })}
            </p>
            <p className="text-xl md:text-2xl leading-relaxed">
              {t("solution", { default: automation.solution })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
