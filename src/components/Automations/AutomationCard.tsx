"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ComponentType } from "react";
import { LocalizedLink } from "@/i18n/LocalizedLink";

export type AutomationItem = {
  id: string;
  title: string;
  description: string;
  verticals: string[];
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  metrics?: string[];
};

export default function AutomationCard({
  automation,
}: {
  automation: AutomationItem;
}) {
  const Icon = automation.icon;
  const tCard = useTranslations("automations.page.card");
  const tItem = useTranslations(`automations.${automation.id}`);
  const tVert = useTranslations("solutions.verticals");

  const title = tItem.has("title") ? tItem("title") : automation.title;
  const description = tItem.has("description")
    ? tItem("description")
    : automation.description;
  const metrics: string[] | undefined = (
    tItem.has("metrics")
      ? (tItem.raw("metrics") as string[])
      : automation.metrics
  ) as string[] | undefined;

  const verticalKeyMap: Record<string, string> = {
    Restaurants: "restaurants",
    "Hair & Beauty": "beauty",
    Clinics: "clinics",
    Hotels: "hotels",
    "Real Estate": "realEstate",
  };

  const localizedVerticals = automation.verticals.map((v) => {
    const key = verticalKeyMap[v] || "";
    const path = key ? `${key}.title` : "";
    return path && tVert.has(path) ? (tVert(path) as string) : v;
  });

  return (
    <LocalizedLink
      key={automation.id}
      href={`/automations/${automation.id}`}
      className="block h-full"
    >
      <div className="group h-full flex flex-col cursor-pointer rounded-2xl border-2 border-border p-4 transition-all hover:border-primary hover:scale-[1.05] relative overflow-hidden">
        <div className="flex items-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-secondary backdrop-blur-sm flex items-center justify-center relative z-10">
            <Icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="card-title text-lg! mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="card-subtitle text-muted-foreground mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>
        {metrics && metrics.length > 0 && (
          <div className="mb-4 flex flex-col gap-2">
            {(metrics as string[]).slice(0, 3).map((m) => (
              <span
                key={m}
                className="w-fit text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 truncate max-w-full"
                title={m}
              >
                {m}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {localizedVerticals.slice(0, 2).map((vertical) => (
            <span
              key={vertical}
              className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {vertical}
            </span>
          ))}
          {localizedVerticals.length > 2 && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              +{localizedVerticals.length - 2}
            </span>
          )}
        </div>
        <div className="mt-auto pt-2">
          <span className="text-sm font-medium flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
            {tCard("learnMore")} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </LocalizedLink>
  );
}
