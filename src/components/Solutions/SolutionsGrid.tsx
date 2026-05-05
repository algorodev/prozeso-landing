"use client";

import { Filter, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { AREAS } from "@/components/Solutions/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { COLOR_GROUPS } from "./constants";
import SolutionDetailDialog from "./SolutionDetailDialog";
import SolutionsSidebar from "./SolutionsSidebar";

const GLOW_POSITIONS = [
  "-bottom-32 -right-24",
  "-top-32 -left-24",
  "-bottom-32 -left-24",
  "-top-32 -right-24",
];

export type ActiveFilter = { groupId: string; areaId: string | null } | null;

function getInitialFilter(
  group: string | null,
  area: string | null,
): ActiveFilter {
  if (!group) return null;
  const valid = COLOR_GROUPS.some((g) => g.id === group);
  if (!valid) return null;
  return { groupId: group, areaId: area };
}

export default function SolutionsGrid() {
  const t = useTranslations("home.automationSuite");
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(() =>
    getInitialFilter(searchParams.get("group"), searchParams.get("area")),
  );

  useEffect(() => {
    const filter = getInitialFilter(
      searchParams.get("group"),
      searchParams.get("area"),
    );
    setActiveFilter(filter);
    if (!filter) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState<{
    areaId: string;
    index: number;
  } | null>(null);

  const handleFilterChange = (filter: ActiveFilter) => {
    setActiveFilter(filter);
    if (filter) {
      document.getElementById("grid")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMobileFilter = (filter: ActiveFilter) => {
    handleFilterChange(filter);
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
    <section
      id="grid"
      className="mx-auto px-6 pb-16 pt-8 lg:py-16 scroll-mt-10"
    >
      <div className="lg:grid lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] lg:gap-10">
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
            <SolutionsSidebar
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              query={query}
            />
          </div>
        </aside>

        <div className="space-y-20">
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
                  <SolutionsSidebar
                    activeFilter={activeFilter}
                    onFilterChange={handleMobileFilter}
                    query={query}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {COLOR_GROUPS.filter((group) => {
            if (activeFilter && activeFilter.groupId !== group.id) return false;
            return true;
          })
            .map((group) => {
              const activeArea =
                activeFilter?.groupId === group.id ? activeFilter.areaId : null;

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
                    items.push({
                      areaId,
                      index: i,
                      startIndex: area.startIndex,
                    });
                  } else {
                    break;
                  }
                }
              }

              return { group, items };
            })
            .filter(({ items }) => items.length > 0)
            .map(({ group, items }) => (
              <div key={group.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1 self-stretch rounded-full"
                      style={{ background: group.color }}
                    />
                    <h2 className="font-sora text-3xl font-semibold tracking-tight">
                      {t(`groups.${group.id}`)}
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
                <span
                  className="sm:hidden w-fit rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap mb-4 block"
                  style={{
                    color: group.color,
                    backgroundColor: `color-mix(in srgb, ${group.color} 12%, transparent)`,
                  }}
                >
                  {t("automationCount", { count: items.length })}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start gap-4">
                  {items.map(({ areaId, index, startIndex }, cardIdx) => {
                    const color = group.color;
                    const glowPos =
                      GLOW_POSITIONS[cardIdx % GLOW_POSITIONS.length];

                    return (
                      <button
                        key={`${areaId}-${index}`}
                        type="button"
                        onMouseMove={handleMouseMove}
                        onClick={() => setSelectedAutomation({ areaId, index })}
                        className="group relative rounded-2xl p-px overflow-hidden text-left cursor-pointer"
                        style={{ background: "var(--color-border)" }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                          style={{
                            background: `radial-gradient(circle 150px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), ${color}, transparent)`,
                          }}
                        />

                        <div className="relative z-10 w-full rounded-[15px] bg-background p-5 overflow-hidden space-y-3">
                          <span
                            className={`pointer-events-none absolute ${glowPos} h-64 w-64 rounded-full blur-[100px] opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
                            style={{ background: color }}
                            aria-hidden="true"
                          />

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
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>

      <SolutionDetailDialog
        selectedAutomation={selectedAutomation}
        onClose={() => setSelectedAutomation(null)}
      />
    </section>
  );
}
