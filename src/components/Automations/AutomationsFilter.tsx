"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import { CATEGORIES } from "@/data/automations";

export default function AutomationsFilter({
  category,
  onCategoryChange,
  query,
  onQueryChange,
}: {
  category: string;
  onCategoryChange: (value: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
}) {
  const t = useTranslations("automations.page.filter");
  const tc = useTranslations("automations.categories");
  const current = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[0];
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-3 items-center md:justify-end min-w-0">
        <div className="w-full md:w-auto min-w-0">
          <span className="sr-only" id="category-label">
            {t("categoryLabel")}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="border border-border rounded-md w-full md:w-auto min-w-0 justify-between"
              >
                <span className="truncate">
                  {tc.has(current.id) ? tc(current.id) : current?.label}
                </span>
                <ChevronDown className="ml-1 size-4 opacity-70 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[--radix-dropdown-menu-trigger-width] min-w-0 sm:min-w-56"
            >
              <DropdownMenuRadioGroup
                value={category}
                onValueChange={onCategoryChange}
              >
                {CATEGORIES.map((c) => (
                  <DropdownMenuRadioItem key={c.id} value={c.id}>
                    {tc.has(c.id) ? tc(c.id) : c.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <label htmlFor="automations-search" className="w-full md:max-w-md">
          <span className="sr-only">{t("searchAria")}</span>
          <Input
            id="automations-search"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchAria")}
            className="h-10"
          />
        </label>
      </div>
    </div>
  );
}
