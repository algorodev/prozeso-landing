"use client";

import { Globe } from "lucide-react";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { type Locale, locales } from "@/i18n/config";
import { cn } from "@/lib/utils";

type Props = {
  current: Locale;
  variant?: "auto" | "dropdown" | "segmented";
  className?: string;
};

export function LocaleSwitcher({ current, className }: Props) {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const router = useRouter();

  const buildHref = (nextLocale: Locale): Route => {
    const nextPath = pathname.match(/^\/[a-z]{2}(?:\/|$)/i)
      ? pathname.replace(/^\/[a-z]{2}(?=\/|$)/i, `/${nextLocale}`)
      : `/${nextLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;

    const qs = searchParams?.toString();
    return (qs ? `${nextPath}?${qs}` : nextPath) as Route;
  };

  const navigate = (nextLocale: Locale) => {
    router.replace(buildHref(nextLocale), { scroll: false });
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className={cn("gap-2", className)}
          >
            <Globe className="size-4" aria-hidden />
            <span className="font-medium">{current.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-36">
          {locales.map((l) => (
            <DropdownMenuItem
              key={l}
              onClick={() => navigate(l)}
              aria-current={l === current ? "true" : undefined}
            >
              <span className={cn("w-full", l === current && "font-semibold")}>
                {l.toUpperCase()}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
