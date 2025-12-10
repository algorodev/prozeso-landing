"use client";

import { ArrowRight, NotebookPen, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";

export default function AutomationsFinalCta() {
  const t = useTranslations("automations.page.cta");
  const tc = useTranslations("common.cta");
  return (
    <section className="relative py-24 px-6 border-t border-border overflow-hidden">
      <div className="container mx-auto text-center max-w-2xl relative z-10">
        <h2 className="font-sora text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-balance">
          {t.rich("title", {
            primary: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h2>
        <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3">
          <Button asChild size="lg">
            <LocalizedLink href="/start">
              <NotebookPen className="mr-1 size-5" />
              {tc("startAssessment")}
            </LocalizedLink>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href="https://calendly.com/prozeso360/30min"
              target="_blank"
              rel="noreferrer"
            >
              <Phone className="mr-1 size-5" />
              {tc("bookCall")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
