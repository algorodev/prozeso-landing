"use client";

import type { AutomationDetail } from "@/app/[locale]/automations/[id]/data";
import type { Automation } from "@/app/[locale]/automations/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";

export default function DetailHero({
  automation,
  detail,
}: {
  automation: Automation;
  detail: AutomationDetail;
}) {
  const Icon = automation.icon;
  return (
    <section className="relative overflow-hidden gradient-cta text-white">
      <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8">
        <div className="flex items-start gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-white/20 text-white ring-1 ring-white/40">
            <Icon className="size-6" />
          </div>
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
              {automation.title}
            </h1>
            <p className="mt-3 max-w-2xl text-white/90">
              {detail.hero.tagline}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {automation.categories.map((c) => (
                <Badge
                  key={c}
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/25"
                >
                  {c}
                </Badge>
              ))}
            </div>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-white/90">
              {detail.hero.outcomes.map((o) => (
                <li key={o} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-white/90" /> {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-start gap-3 w-full md:w-auto md:mt-0 mt-4">
          <Button size="lg" variant="accent" asChild className="w-full md:w-auto">
            <LocalizedLink href={`/start?automation=${automation.id}`}>
              Request setup
            </LocalizedLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
