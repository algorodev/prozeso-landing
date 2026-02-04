"use client";

import { Building2, NotebookPen } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { ComponentType } from "react";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Button } from "@/components/ui/Button";
import VerticalHeroBackground from "@/components/Verticals/VerticalHeroBackground";
import { VERTICALS } from "@/data/verticals";
import { LocalizedLink } from "@/i18n/LocalizedLink";

export function VerticalHero() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const vertical = id ? VERTICALS[id as keyof typeof VERTICALS] : undefined;
  const Icon =
    (vertical?.icon as unknown as ComponentType<{ className?: string }>) ||
    Building2;
  const t = useTranslations();
  const tc = useTranslations("common.cta");
  const headlineKey = id ? `verticals.${id}.headline` : undefined;
  const subheadingKey = id ? `verticals.${id}.subheading` : undefined;
  const subheading =
    subheadingKey && t.has(subheadingKey)
      ? (t(subheadingKey) as string)
      : (vertical?.subheading ?? "");
  const slug = vertical?.slug ?? "";

  return (
    <section className="relative isolate min-h-[80vh] flex items-center justify-center px-6 pt-16 overflow-hidden">
      <VerticalHeroBackground />
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <Icon className="w-16 h-16 mb-8 text-foreground" />
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[0.95] text-balance mb-8">
              {headlineKey && t.has(headlineKey)
                ? t.rich(headlineKey, {
                    primary: (chunks) => (
                      <span className="text-primary">{chunks}</span>
                    ),
                    secondary: (chunks) => (
                      <span className="text-secondary">{chunks}</span>
                    ),
                  })
                : (vertical?.headline ?? "")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl lg:max-w-none mb-12 leading-relaxed">
              {subheading}
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <Button asChild size="lg">
                <LocalizedLink href={`/start?vertical=${slug}`}>
                  <NotebookPen className="mr-1 size-5" />
                  {tc("startAssessment")}
                </LocalizedLink>
              </Button>
              <BookCallButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerticalHero;
