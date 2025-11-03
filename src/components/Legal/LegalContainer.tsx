"use client";

import type { ReactNode } from "react";
import { Separator } from "@/components/ui/Separator";

interface LegalContainerProps {
  title: string;
  updatedAt?: string;
  children: ReactNode;
  toc?: { id: string; label: string }[];
}

export default function LegalContainer({ title, updatedAt, children, toc }: LegalContainerProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 lg:py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {updatedAt ? (
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {updatedAt}</p>
        ) : null}
      </header>

      {toc && toc.length > 0 ? (
        <aside className="mb-8 rounded-lg border bg-card p-4 text-card-foreground">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">On this page</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-sm text-primary hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <Separator className="mb-8" />

      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24">
        {children}
      </article>
    </div>
  );
}
