"use client";

import { ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AUTOMATIONS as CATALOG } from "@/data/automations";
import { VERTICALS } from "@/data/verticals";
import { LocalizedLink } from "@/i18n/LocalizedLink";

export function VerticalAutomations() {
  const params = useParams<{ id: string }>();
  const t = useTranslations();
  const tCard = useTranslations("automations.page.card");
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const vertical = id ? VERTICALS[id as keyof typeof VERTICALS] : undefined;
  const verticalName = (() => {
    if (!id) return vertical?.name ?? "";
    const key = `verticals.${id}.name`;
    return t.has(key) ? (t(key) as string) : (vertical?.name ?? "");
  })();
  const automationSlugs: string[] = Array.isArray(
    (vertical as any)?.recommendedAutomations,
  )
    ? ((vertical as any).recommendedAutomations as string[])
    : [];

  const resolved = automationSlugs
    .map((slug) => CATALOG.find((a) => a.id === slug))
    .filter(Boolean) as typeof CATALOG;

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="container mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-balance">
          {t.rich("verticals.page.automations.title", {
            name: () => <span className="text-primary">{verticalName}</span>,
          })}
        </h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-xl">
          {t.has("verticals.page.automations.subtitle")
            ? (t("verticals.page.automations.subtitle") as string)
            : "The workflows that make the biggest difference."}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {resolved.map((automation) => {
            const titleKey = `automations.${automation.id}.title`;
            const descKey = `automations.${automation.id}.description`;
            const metricsKey = `automations.${automation.id}.metrics`;
            const title = t.has(titleKey)
              ? (t(titleKey) as string)
              : ((automation as any).title ?? automation.id);
            const description = t.has(descKey)
              ? (t(descKey) as string)
              : (((automation as any).description as string) ?? "");
            const Icon = (automation as any).icon;
            const metrics: string[] = (t.has(metricsKey)
              ? (t.raw(metricsKey) as unknown)
              : (automation as any).metrics) as string[] | undefined as any;
            return (
              <LocalizedLink
                key={automation.id}
                href={`/automations/${automation.id}`}
              >
                <div className="group h-full flex flex-col cursor-pointer rounded-2xl border-2 border-border p-4 transition-all hover:border-primary hover:scale-[1.05] relative overflow-hidden">
                  <div className="flex items-center mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-secondary backdrop-blur-sm flex items-center justify-center relative z-10">
                      {Icon ? (
                        <Icon
                          className="w-8 h-8 text-foreground"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <ArrowRight
                          className="w-8 h-8 text-foreground"
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                  </div>
                  <h3 className="card-title text-lg! mb-2 group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  {description && (
                    <p className="card-subtitle text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {description}
                    </p>
                  )}
                  {metrics && (metrics as any).length > 0 && (
                    <div className="mb-2 flex flex-col gap-2">
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
                  <div className="mt-auto pt-2">
                    <span className="text-sm font-medium flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                      {tCard.has("learnMore")
                        ? (tCard("learnMore") as string)
                        : "See more"}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </LocalizedLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default VerticalAutomations;
