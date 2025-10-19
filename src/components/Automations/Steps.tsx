"use client";

import type { AutomationDetail } from "@/app/[locale]/automations/[id]/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Steps({ detail }: { detail: AutomationDetail }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {detail.steps.map((s, i) => (
            <li key={s.title}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">
                    {i + 1}. {s.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {s.body}
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
