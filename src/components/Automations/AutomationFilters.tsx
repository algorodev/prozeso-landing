"use client";

import { ChevronDown, Filter } from "lucide-react";
import * as React from "react";
import {
  ALL_CATEGORIES,
  SORTS,
  type SortKey,
} from "@/app/[locale]/automations/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import { useTranslations } from "next-intl";

const AutomationFilters = ({
  q,
  setQ,
  activeCats,
  toggleCat,
  sort,
  setSort,
}: {
  q: string;
  setQ: (v: string) => void;
  activeCats: string[];
  toggleCat: (c: string) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
}) => {
  const t = useTranslations("automations");
  const sortLabel = (s: SortKey) => t(`filters.sort.options.${s}` as any);
  const catLabel = (c: string) => t(`filters.categories.${c}` as any);

  return (
    <>
      {/* Header + sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("list.title")}
          </h1>
          <p className="mt-1 max-w-2xl text-muted-foreground">
            {t("list.subtitle")}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="size-4" />
              {t("filters.sort.label")}: {sortLabel(sort)}
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("filters.sort.sortBy")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {SORTS.map((s) => (
              <DropdownMenuItem key={s} onClick={() => setSort(s)}>
                {sortLabel(s)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((c) => (
            <Badge
              key={c}
              variant={activeCats.includes(c) ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => toggleCat(c)}
            >
              {catLabel(c)}
            </Badge>
          ))}
        </div>
        <div className="w-full sm:w-80">
          <Input
            placeholder={t("filters.searchPlaceholder")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default AutomationFilters;
