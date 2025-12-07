"use client";

import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("start.hero");

  return (
    <section className="pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="hero-title text-balance">
          {t.rich("title", {
            primary: (chunks) => <span className="text-primary">{chunks}</span>,
            secondary: (chunks) => <span className="text-secondary">{chunks}</span>,
          })}
        </h1>
        <p className="mt-4 hero-subtitle text-balance text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
