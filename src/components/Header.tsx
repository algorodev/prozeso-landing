"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import type { ReactNode } from "react";
import { DesktopNav } from "@/components/DesktopNav";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/config";
import { LocalizedLink } from "@/i18n/LocalizedLink";

type NavChild = {
  label: string;
  href: string;
  description?: string;
};

type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

type Props = {
  logo?: ReactNode;
  nav?: NavItem[];
  cta?: { label: string; href: string };
};

export const Header = ({ logo, nav = [], cta }: Props) => {
  const pathname = usePathname();
  const locale = useLocale();
  const clientUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3001";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-3 px-3 sm:px-4">
        <div className="md:hidden">
          <MobileNav nav={nav} cta={cta} />
        </div>
        <div className="flex items-center">
          {logo ?? (
            <LocalizedLink href="/" className="font-semibold tracking-tight">
              <span className="rounded-xl bg-foreground/10 px-2 py-1">
                Brand
              </span>
            </LocalizedLink>
          )}
        </div>
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {nav.map((item) => (
            <DesktopNav key={item.label} item={item} activePath={pathname} />
          ))}
        </nav>
        <div className="flex-1" />
        <div className="flex items-center gap-1">
          <LocaleSwitcher current={locale as Locale} />
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost">
              <Link href={`${clientUrl}/auth/login` as Route} target="_blank">
                Sign in
              </Link>
            </Button>
            {cta ? (
              <Button asChild>
                <LocalizedLink href={cta.href}>{cta.label}</LocalizedLink>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};
