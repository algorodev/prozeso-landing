"use client";

import type { Automation } from "@/app/[locale]/automations/data";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { LocalizedLink } from "@/i18n/LocalizedLink";

const AutomationCard = ({ a }: { a: Automation }) => {
  const Icon = a.icon;
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <CardTitle className="truncate text-base sm:text-lg">
            {a.title}
          </CardTitle>
          <div className="mt-1 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
            {a.categories.map((c) => (
              <span key={c} className="rounded bg-[--muted] px-1.5 py-0.5">
                {c}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {a.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {a.integrations.map((i) => (
            <span
              key={i}
              className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground"
            >
              {i}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-md bg-[--secondary] px-2 py-0.5 text-[--secondary-foreground]">
              {a.estTimeSaved} saved
            </span>
            <span className="rounded-md bg-[--accent] px-2 py-0.5 text-[--accent-foreground]">
              ROI: {a.roi}
            </span>
          </div>
          <div className="flex items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Button asChild size="sm" variant="outline" className="w-full sm:w-auto">
              <LocalizedLink href={a.href}>View details</LocalizedLink>
            </Button>
            <Button asChild size="sm" variant="primary" className="w-full sm:w-auto">
              <LocalizedLink href={`/contact?automation=${a.id}`}>
                Request setup
              </LocalizedLink>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationCard;
