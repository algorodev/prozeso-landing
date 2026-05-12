"use client";

import { Close } from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
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
  nav?: NavItem[];
};

export const MobileNav = ({ nav = [] }: Props) => {
  const t = useTranslations("header");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[84vw] p-0">
        <SheetHeader className="px-4 py-3">
          <SheetTitle className="text-left body-md font-medium">
            Menu
          </SheetTitle>
          <SheetDescription className="sr-only">
            {t("mobileMenuDescription")}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4">
          <div className="flex flex-col gap-2 py-2">
            <Button asChild className="w-full">
              <Close asChild>
                <LocalizedLink href="/start">{t("cta")}</LocalizedLink>
              </Close>
            </Button>
          </div>
          <Separator className="my-3" />
          <div className="w-full">
            {nav.map((item) => (
              <div key={item.label} className="">
                {item.children?.length ? (
                  <div className="px-3 py-2 body-md font-medium">
                    {item.label}
                  </div>
                ) : (
                  <div className="px-1 py-2">
                    <Close asChild>
                      <LocalizedLink
                        href={item.href ?? "#"}
                        className="block rounded-xl px-2 py-2 hover:bg-secondary hover:text-background body-md"
                      >
                        {item.label}
                      </LocalizedLink>
                    </Close>
                    <Separator className="my-1" />
                  </div>
                )}
                {item.children?.length ? (
                  <ul className="mb-2 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Close asChild>
                          <LocalizedLink
                            href={child.href}
                            className="block rounded-xl px-3 py-2 hover:bg-secondary hover:text-background body-md"
                          >
                            <div className="body-md">{child.label}</div>
                            {child.description ? (
                              <div className="body-sm text-foreground-subtle">
                                {child.description}
                              </div>
                            ) : null}
                          </LocalizedLink>
                        </Close>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
