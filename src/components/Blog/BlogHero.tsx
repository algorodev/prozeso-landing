"use client";

import { useTranslations } from "next-intl";

export default function BlogHero() {
  const t = useTranslations("blog.hero");

  return (
    <section className="relative isolate overflow-hidden py-12 sm:py-16">
      <span
        className="pointer-events-none absolute bottom-0 left-0 translate-y-1/2 h-48 w-48 rounded-full blur-[100px] opacity-30"
        style={{ background: "var(--brand-lavender)" }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute right-0 top-0 translate-x-1/2 -translate-y-1/4 h-64 w-64 rounded-full blur-[100px] opacity-22"
        style={{ background: "var(--brand-blue)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <div className="mx-auto text-center max-w-3xl">
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-4 text-balance">
            {t.rich("title", {
              primary: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
