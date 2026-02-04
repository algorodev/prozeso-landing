"use client";

import { NotebookPen } from "lucide-react";
import { useTranslations } from "next-intl";
import AutomationHeroBackground from "@/components/Automations/AutomationHeroBackground";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import { useAutomationFromParams } from "./useAutomationFromParams";

export function AutomationHeroSection() {
  const { automation, id } = useAutomationFromParams();
  if (!automation) return null;
  const t = useTranslations(`automations.details.${id}`);
  const tc = useTranslations("automations.details.common");
  const tCommonCta = useTranslations("common.cta");

  return (
    <section className="relative isolate min-h-[80vh] flex items-center justify-center px-6 pt-16 overflow-hidden">
      <AutomationHeroBackground />
      <div className="relative z-10 text-center max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="text-left">
          <p className="text-sm font-medium text-primary mb-6 tracking-wide uppercase border-b-2 border-primary inline-block pb-1">
            {t("name", { default: automation.name })}
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[0.95] text-balance mb-8">
            {t.rich("headline", {
              default: automation.headline,
              primary: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
              secondary: (chunks) => (
                <span className="text-secondary">{chunks}</span>
              ),
              accent: (chunks) => <span className="text-accent">{chunks}</span>,
            })}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            {t("subheading", { default: automation.subheading })}
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <Button asChild size="lg">
              <LocalizedLink href="/start">
                <NotebookPen className="mr-1 size-5" />
                {tCommonCta("startAssessment")}
              </LocalizedLink>
            </Button>
            <BookCallButton />
          </div>
        </div>
      </div>
    </section>
  );
}
