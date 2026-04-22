"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { DesktopNav } from "@/components/DesktopNav";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import Logo from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
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

export const Header = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const locale = useLocale();

  const navItems: NavItem[] = [
    { label: t("nav.solutions"), href: "/solutions" },
    { label: t("nav.useCases"), href: "/use-cases" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.about"), href: "/about" },
  ];

  return (
    <header
      className="sticky top-0 z-[60] w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b"
      suppressHydrationWarning
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-3 px-3 sm:px-4">
        <div className="md:hidden">
          <MobileNav nav={navItems} />
        </div>
        <div className="flex items-center">
          <LocalizedLink href="/" className="flex items-center gap-2">
            <Logo priority />
          </LocalizedLink>
        </div>
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {navItems.map((item) => (
            <DesktopNav key={item.label} item={item} activePath={pathname} />
          ))}
        </nav>
        <div className="flex-1" />
        <div className="flex items-center gap-1">
          <LocaleSwitcher current={locale as Locale} />
          <div className="hidden sm:flex items-center gap-2">
            <Button asChild>
              <LocalizedLink href="/start">{t("cta")}</LocalizedLink>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
