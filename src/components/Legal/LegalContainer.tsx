"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Separator } from "@/components/ui";

interface LegalContainerProps {
  title: string;
  updatedAt?: string;
  children: ReactNode;
  toc?: { id: string; label: string }[];
}

export default function LegalContainer({
  title,
  updatedAt,
  children,
  toc,
}: LegalContainerProps) {
  const t = useTranslations("legal");

  const tocBlock = toc && toc.length > 0 && (
    <nav>
      <p className="mb-2 body-sm font-medium uppercase tracking-wide text-foreground-muted">
        {t("onThisPage")}
      </p>
      <ul className="grid gap-2">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="body-sm text-primary hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:py-16">
      <header className="mb-8 max-w-3xl">
        <h1 className="display-xl text-balance">{title}</h1>
        {updatedAt ? (
          <p className="mt-2 body-sm text-foreground-muted">
            {t("lastUpdated", { date: updatedAt })}
          </p>
        ) : null}
      </header>

      {tocBlock && (
        <aside className="mb-8 rounded-lg border p-4 text-card-foreground lg:hidden">
          {tocBlock}
        </aside>
      )}

      <Separator className="mb-8 lg:hidden" />

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24">
          {children}
        </article>

        {tocBlock && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border p-4 text-card-foreground">
              {tocBlock}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
