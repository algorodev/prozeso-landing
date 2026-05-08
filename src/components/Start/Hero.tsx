"use client";

import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("start.hero");

  return (
    <section className="pt-20 pb-10 px-6">
      <div className="container mx-auto max-w-[1280px]">
        <h1 className="display-2xl text-balance">
          {t.rich("title", {
            primary: (chunks) => <span className="text-primary">{chunks}</span>,
            secondary: (chunks) => (
              <span className="text-accent-01">{chunks}</span>
            ),
          })}
        </h1>
        <p className="mt-4 body-lg font-medium tracking-tight text-balance text-foreground-muted sm:text-lg max-w-3xl">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
