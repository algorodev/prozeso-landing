"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { LocalizedLink } from "@/i18n/LocalizedLink";

const FACT_IDS = ["client", "industry", "location", "locations"] as const;
const STAT_IDS = [
  "timeReduction",
  "reports",
  "documentation",
  "errorReduction",
] as const;

type SidebarProps = {
  namespace: string;
  logoSrc: string;
  logoAlt: string;
};

export default function CaseStudySidebar({
  namespace,
  logoSrc,
  logoAlt,
}: SidebarProps) {
  const t = useTranslations(namespace);

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:pr-2 scrollbar-subtle mb-12 lg:mb-0">
      <div className="relative h-10 w-full mb-6">
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          sizes="240px"
          className="object-contain object-left"
        />
      </div>

      <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground-subtle mb-6">
        {t("hero.eyebrow")}
      </span>

      <dl className="space-y-4 mb-8 pb-8 border-b border-border">
        {FACT_IDS.map((id) => (
          <div key={id}>
            <dt className="text-xs uppercase tracking-wider text-foreground-muted mb-0.5">
              {t(`hero.facts.${id}.label`)}
            </dt>
            <dd className="text-sm font-medium text-foreground">
              {t(`hero.facts.${id}.value`)}
            </dd>
          </div>
        ))}
      </dl>

      <div className="space-y-5 mb-8">
        {STAT_IDS.map((id) => (
          <div key={id}>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-sora font-semibold tracking-tighter text-primary">
                {t(`stats.${id}.value`)}
              </span>
              <span className="text-sm font-medium text-foreground">
                {t(`stats.${id}.label`)}
              </span>
            </div>
            <p className="text-xs text-foreground-subtle leading-relaxed mt-0.5">
              {t(`stats.${id}.desc`)}
            </p>
          </div>
        ))}
      </div>

      <Button asChild size="sm" className="w-full mb-4">
        <LocalizedLink href="/start">
          {t("cta.ctaPrimary")}
          <ArrowRight className="ml-1 size-4" />
        </LocalizedLink>
      </Button>
    </aside>
  );
}
