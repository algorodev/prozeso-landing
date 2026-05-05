"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { AREAS, COLOR_GROUPS } from "./constants";
import type { ActiveFilter } from "./SolutionsGrid";

type SolutionsSidebarProps = {
  activeFilter: ActiveFilter;
  onFilterChange: (filter: ActiveFilter) => void;
  query: string;
};

function areaHasMatch(
  t: ReturnType<typeof useTranslations>,
  areaId: string,
  queryLower: string,
): boolean {
  for (let i = 0; i < 10; i++) {
    if (!t.has(`areas.${areaId}.automations.${i}.name`)) break;
    const name = t(`areas.${areaId}.automations.${i}.name`).toLowerCase();
    const subtitle = t.has(`areas.${areaId}.automations.${i}.subtitle`)
      ? t(`areas.${areaId}.automations.${i}.subtitle`).toLowerCase()
      : "";
    if (name.includes(queryLower) || subtitle.includes(queryLower)) return true;
  }
  return false;
}

export default function SolutionsSidebar({
  activeFilter,
  onFilterChange,
  query,
}: SolutionsSidebarProps) {
  const t = useTranslations("home.automationSuite");
  const queryLower = query.toLowerCase().trim();

  return (
    <nav className="space-y-3">
      {activeFilter !== null && (
        <button
          type="button"
          onClick={() => onFilterChange(null)}
          className="cursor-pointer flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
        >
          <X className="h-3.5 w-3.5" />
          {t("clearFilter")}
        </button>
      )}

      {COLOR_GROUPS.map((group) => {
        const isGroupActive = activeFilter?.groupId === group.id;
        const isGroupSelected = isGroupActive && activeFilter?.areaId === null;

        const visibleAreaIds = queryLower
          ? group.areaIds.filter((areaId) =>
              areaHasMatch(t, areaId, queryLower),
            )
          : group.areaIds;

        if (queryLower && visibleAreaIds.length === 0) return null;

        return (
          <div
            key={group.id}
            className="rounded-lg p-2 transition-colors"
            style={{
              backgroundColor: isGroupActive
                ? `color-mix(in srgb, ${group.color} 10%, transparent)`
                : "transparent",
            }}
          >
            <button
              type="button"
              onClick={() =>
                onFilterChange(
                  isGroupSelected ? null : { groupId: group.id, areaId: null },
                )
              }
              className="group/title cursor-pointer w-full flex items-center gap-2 mb-2 rounded-md px-2 py-1.5 transition-colors"
              onMouseEnter={(e) => {
                if (!isGroupActive) {
                  e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${group.color} 10%, transparent)`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div
                className="w-0.5 h-4 rounded-full shrink-0"
                style={{ background: group.color }}
              />
              <span className="text-sm font-semibold tracking-wider text-foreground">
                {t(`groups.${group.id}`)}
              </span>
            </button>

            <div className="flex flex-wrap gap-1">
              {visibleAreaIds.map((areaId) => {
                const isActive =
                  isGroupActive && activeFilter?.areaId === areaId;
                const area = AREAS.find((a) => a.id === areaId);
                const Icon = area?.icon;

                return (
                  <button
                    key={areaId}
                    type="button"
                    onClick={() =>
                      onFilterChange(
                        isActive
                          ? { groupId: group.id, areaId: null }
                          : { groupId: group.id, areaId },
                      )
                    }
                    className="cursor-pointer flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors whitespace-nowrap"
                    style={{
                      color: isActive
                        ? group.color
                        : "var(--color-muted-foreground)",
                      border: isActive
                        ? `1px solid ${group.color}`
                        : "1px solid var(--color-border)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${group.color} 10%, transparent)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />}
                    {t(`areas.${areaId}.name`)}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
