"use client";

import { ArrowRight, Filter, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { AREAS } from "@/components/Home/BubbleDiagram/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import AutomationSuiteSidebar from "./AutomationSuiteSidebar";
import { COLOR_GROUPS } from "./constants";

/** Maps "areaId:index" to the automation slug that has a detail page */
const AUTOMATION_SLUGS: Record<string, string> = {
  "bookings:0": "receptionist-ai",
  "bookings:1": "appointment-reminder",
  "bookings:2": "review-booster",
  "bookings:3": "smart-waitlist-cancellation-filler",
  "finance:0": "billing-and-invoice",
};

const GLOW_POSITIONS = [
  "-bottom-32 -right-24",
  "-top-32 -left-24",
  "-bottom-32 -left-24",
  "-top-32 -right-24",
];

export type ActiveFilter = { groupId: string; areaId: string | null } | null;

export default function AutomationSuiteGrid() {
  const t = useTranslations("home.automationSuite");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(null);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileFilter = (filter: ActiveFilter) => {
    setActiveFilter(filter);
    setMobileOpen(false);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`,
    );
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section className="mx-auto px-6 pb-16 pt-8 lg:py-16">
      <div className="lg:grid lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] lg:gap-10">
        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="h-9 pl-9"
              />
            </div>
            <AutomationSuiteSidebar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
        </aside>

        {/* Main content */}
        <div className="space-y-20">
          {/* Mobile filter button */}
          <div className="lg:hidden sticky top-20 z-50 flex items-center gap-3 mb-4 py-3 pointer-events-none">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 p-6 ms-auto pointer-events-auto bg-background"
                >
                  <Filter className="h-4 w-4" />
                  {t("mobileFilter")}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto p-6">
                <SheetHeader className="px-0">
                  <SheetTitle>{t("mobileFilterTitle")}</SheetTitle>
                </SheetHeader>
                <div className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={t("searchPlaceholder")}
                      className="h-9 pl-9"
                    />
                  </div>
                  <AutomationSuiteSidebar
                    activeFilter={activeFilter}
                    onFilterChange={handleMobileFilter}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {COLOR_GROUPS.filter(
            (group) => !activeFilter || activeFilter.groupId === group.id,
          ).map((group) => {
            const activeArea =
              activeFilter?.groupId === group.id ? activeFilter.areaId : null;

            // Collect all automations for this group across its areas
            const queryLower = query.toLowerCase().trim();
            const items: {
              areaId: string;
              index: number;
              startIndex: number;
            }[] = [];
            for (const areaId of group.areaIds) {
              if (activeArea && areaId !== activeArea) continue;
              const area = AREAS.find((a) => a.id === areaId);
              if (!area) continue;
              for (let i = 0; i < 10; i++) {
                if (t.has(`areas.${areaId}.automations.${i}.name`)) {
                  if (queryLower) {
                    const name = t(
                      `areas.${areaId}.automations.${i}.name`,
                    ).toLowerCase();
                    const subtitle = t.has(
                      `areas.${areaId}.automations.${i}.subtitle`,
                    )
                      ? t(
                          `areas.${areaId}.automations.${i}.subtitle`,
                        ).toLowerCase()
                      : "";
                    if (
                      !name.includes(queryLower) &&
                      !subtitle.includes(queryLower)
                    )
                      continue;
                  }
                  items.push({ areaId, index: i, startIndex: area.startIndex });
                } else {
                  break;
                }
              }
            }

            if (items.length === 0) return null;

            return (
              <div key={group.id}>
                {/* Group header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1 self-stretch rounded-full"
                      style={{ background: group.color }}
                    />
                    <h2 className="font-sora text-3xl font-semibold tracking-tight">
                      {group.label}
                    </h2>
                  </div>
                  <span
                    className="hidden sm:inline rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ml-auto"
                    style={{
                      color: group.color,
                      backgroundColor: `color-mix(in srgb, ${group.color} 12%, transparent)`,
                    }}
                  >
                    {t("automationCount", { count: items.length })}
                  </span>
                </div>
                {/* Badge — mobile only */}
                <span
                  className="sm:hidden w-fit rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap mb-4 block"
                  style={{
                    color: group.color,
                    backgroundColor: `color-mix(in srgb, ${group.color} 12%, transparent)`,
                  }}
                >
                  {t("automationCount", { count: items.length })}
                </span>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start gap-4">
                  {items.map(({ areaId, index, startIndex }, cardIdx) => {
                    const color = group.color;
                    const glowPos =
                      GLOW_POSITIONS[cardIdx % GLOW_POSITIONS.length];
                    const slug = AUTOMATION_SLUGS[`${areaId}:${index}`];

                    const cardContent = (
                      <>
                        {/* Cursor spotlight */}
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                          style={{
                            background: `radial-gradient(circle 150px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), ${color}, transparent)`,
                          }}
                        />

                        {/* Inner card */}
                        <div className="relative z-10 w-full rounded-[15px] bg-background p-5 overflow-hidden space-y-3">
                          {/* Glow blob — only on linked cards, visible on hover */}
                          {slug && (
                            <span
                              className={`pointer-events-none absolute ${glowPos} h-64 w-64 rounded-full blur-[100px] opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
                              style={{ background: color }}
                              aria-hidden="true"
                            />
                          )}

                          {/* Number + Name */}
                          <div className="relative flex items-start gap-3">
                            <span
                              className="text-3xl font-sora font-bold leading-none opacity-20"
                              style={{ color }}
                            >
                              {String(startIndex + index).padStart(2, "0")}
                            </span>
                            <div className="min-w-0">
                              <h3 className="font-sora text-base font-semibold leading-tight">
                                {t(`areas.${areaId}.automations.${index}.name`)}
                              </h3>
                              {t.has(
                                `areas.${areaId}.automations.${index}.subtitle`,
                              ) && (
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {t(
                                    `areas.${areaId}.automations.${index}.subtitle`,
                                  )}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Impact chip */}
                          {t.has(
                            `areas.${areaId}.automations.${index}.impact`,
                          ) &&
                            t(
                              `areas.${areaId}.automations.${index}.impact`,
                            ) && (
                              <div
                                className="relative rounded-lg px-3 py-2 flex items-center gap-2"
                                style={{
                                  backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
                                }}
                              >
                                {(() => {
                                  const impact = t(
                                    `areas.${areaId}.automations.${index}.impact`,
                                  );
                                  const match = impact.match(
                                    /^([↑↓×+-]?\s*[\d,.]+%?\s*[↑↓×]?\s*[\d,.]*%?)\s*(.*)/,
                                  );
                                  const metric = match?.[1]?.trim() ?? impact;
                                  const desc = match?.[2]?.trim() ?? "";
                                  return (
                                    <>
                                      <span
                                        className="text-lg font-sora font-bold whitespace-nowrap"
                                        style={{ color }}
                                      >
                                        {metric}
                                      </span>
                                      {desc && (
                                        <span className="text-xs text-muted-foreground">
                                          {desc}
                                        </span>
                                      )}
                                    </>
                                  );
                                })()}
                              </div>
                            )}

                          {/* Learn more link */}
                          {slug && (
                            <div
                              className="relative flex items-center justify-end gap-1 pt-2 text-sm font-medium text-foreground transition-colors"
                              style={{
                                ["--link-hover-color" as string]: color,
                              }}
                            >
                              <span className="group-hover:[color:var(--link-hover-color)]">
                                Saber más
                              </span>
                              <ArrowRight className="h-3.5 w-3.5 transition-all group-hover:translate-x-1 group-hover:[color:var(--link-hover-color)]" />
                            </div>
                          )}
                        </div>
                      </>
                    );

                    return slug ? (
                      <LocalizedLink
                        key={`${areaId}-${index}`}
                        href={`/automations/${slug}`}
                        onMouseMove={handleMouseMove}
                        className="group relative rounded-2xl p-px overflow-hidden"
                        style={{ background: "var(--color-border)" }}
                      >
                        {cardContent}
                      </LocalizedLink>
                    ) : (
                      /* biome-ignore lint/a11y/noStaticElementInteractions: mouse tracking for visual effect only */
                      <div
                        key={`${areaId}-${index}`}
                        onMouseMove={handleMouseMove}
                        className="group relative rounded-2xl p-px overflow-hidden"
                        style={{ background: "var(--color-border)" }}
                      >
                        {cardContent}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
