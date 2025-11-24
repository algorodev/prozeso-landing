"use client";

import { Check, Utensils, HeartPulse, Hotel, Home, Scissors, Sparkles } from "lucide-react";
import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type VerticalKey = "restaurants" | "beauty" | "clinics" | "hotels" | "realEstate";

const VERTICALS: { key: VerticalKey; icon: ComponentType<{ className?: string }> }[] = [
  { key: "restaurants", icon: Utensils },
  { key: "beauty", icon: Scissors },
  { key: "clinics", icon: HeartPulse },
  { key: "hotels", icon: Hotel },
  { key: "realEstate", icon: Home },
];

export default function SolutionsPage() {
  const t = useTranslations("solutions");

  return (
    <main className="relative">
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
      <section>
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {VERTICALS.map(({ key, icon: Icon }) => {
              const base = `verticals.${key}` as const;
              const title = t(`${base}.title`);
              const desc = t(`${base}.desc`);
              const highlights = t.raw(`${base}.highlights`) as string[];
              return (
                <Card key={key} className="group overflow-hidden flex flex-col h-full">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="rounded-xl border bg-card p-2 text-accent shadow-sm group-hover:shadow">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="leading-tight">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col space-y-4">
                    <p className="text-sm text-muted-foreground">{desc}</p>
                    <ul className="space-y-2">
                      {highlights?.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 text-accent" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-1 mt-auto">
                      <Button asChild variant="secondary" size="sm">
                        <LocalizedLink href={`/start?vertical=${key}`}>{t("cta")}</LocalizedLink>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            <Card className="group overflow-hidden flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl border bg-card p-2 text-accent shadow-sm group-hover:shadow">
                  <Sparkles className="size-5" />
                </div>
                <CardTitle className="leading-tight">{t("moreComing.title")}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col space-y-4">
                <p className="text-sm text-muted-foreground">{t("moreComing.desc")}</p>
                <div className="pt-1 mt-auto">
                  <Button asChild variant="secondary" size="sm">
                    <LocalizedLink href="/start">{t("cta")}</LocalizedLink>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
