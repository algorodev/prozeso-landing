"use client";

import { NotebookPen } from "lucide-react";
import { useTranslations } from "next-intl";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import { useAutomationFromParams } from "./useAutomationFromParams";

export function AutomationCTA() {
  const { automation, id } = useAutomationFromParams();
  if (!automation) return null;
  const t = useTranslations(`automations.details.${id}`);
  const tc = useTranslations("automations.details.common");
  const tCommonCta = useTranslations("common.cta");

  return (
    <section className="relative py-32 px-6 border-t border-border overflow-hidden bg-background text-foreground">
      <div className="container mx-auto text-center max-w-2xl relative z-10">
        <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-balance">
          {tc.rich("readyToGetStarted", {
            primary: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h2>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          {t("cta.subtitle", {
            default: `See how ${automation.name} can transform your business. Free assessment, no credit card required.`,
          })}
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3">
          <Button asChild size="lg">
            <LocalizedLink href="/start">
              <NotebookPen className="mr-1 size-5" />
              {tCommonCta("startAssessment")}
            </LocalizedLink>
          </Button>
          <BookCallButton />
        </div>
      </div>
    </section>
  );
}
