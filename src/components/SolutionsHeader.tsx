"use client";

import { useTranslations } from "next-intl";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function SolutionsHeader() {
  const t = useTranslations("solutions");

  return (
    <section className="relative isolate overflow-hidden border-b bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-4">{t("hero.title")}</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("hero.title")}
          </h1>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <LocalizedLink href="/start">{t("cta")}</LocalizedLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
