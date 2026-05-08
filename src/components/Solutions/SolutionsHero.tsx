"use client";

import { useTranslations } from "next-intl";

export default function SolutionsHero() {
  const t = useTranslations("solutions.hero");

  return (
    <section className="relative isolate overflow-hidden py-12 sm:py-16">
      <span
        className="pointer-events-none absolute bottom-0 left-0 translate-y-1/2 h-48 w-48 rounded-full blur-[100px] opacity-30"
        style={{ background: "var(--brand-lavender)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 left-0 h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="absolute bottom-0 right-0 h-32 w-32 translate-x-1/2 translate-y-1/2 rounded-full blur-[50px] opacity-15"
          style={{ background: "var(--brand-lavender)" }}
        />
      </div>

      <span
        className="pointer-events-none absolute right-0 top-0 translate-x-1/2 -translate-y-1/4 h-64 w-64 rounded-full blur-[100px] opacity-22"
        style={{ background: "var(--brand-blue)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 -right-4 sm:right-[80px] h-[100px] w-[100px] sm:h-[160px] sm:w-[160px] rotate-12"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        aria-hidden="true"
      >
        <span
          className="absolute bottom-0 right-0 h-48 w-48 rounded-full blur-[50px] opacity-13"
          style={{ background: "var(--brand-blue)" }}
        />
      </div>

      <div className="container mx-auto max-w-[1280px] px-6 sm:px-8 relative z-10">
        <div className="mx-auto text-center max-w-3xl">
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-4 text-balance">
            {t.rich("title", {
              primary: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>
          <p className="text-base sm:text-lg text-foreground-muted max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
