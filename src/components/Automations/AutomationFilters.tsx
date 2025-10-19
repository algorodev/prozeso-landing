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
  return (
    <>
      {/* Header + sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Automation catalog
          </h1>
          <p className="mt-1 max-w-2xl text-muted-foreground">
            Browse ready-to-use workflows. We tailor each automation to your
            stack and set up monitoring & alerts.
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="size-4" />
              Sort: {sort}
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {SORTS.map((s) => (
              <DropdownMenuItem key={s} onClick={() => setSort(s)}>
                {s}
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
              {c}
            </Badge>
          ))}
        </div>
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search automations, tools, or outcomes…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default AutomationFilters;
