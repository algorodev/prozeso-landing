"use client";

import { Close } from "@radix-ui/react-dialog";
import { Menu, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
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
  const clientUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3001";

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
          <SheetTitle className="text-left body-strong-text">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            {t("mobileMenuDescription")}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 py-2">
            <Button className="flex-1" variant="secondary" asChild>
              <Close asChild>
                <LocalizedLink href={clientUrl} className="flex items-center">
                  <User className="mr-2 size-4" />{" "}
                  <span className="button-secondary-text">{t("signIn")}</span>
                </LocalizedLink>
              </Close>
            </Button>
            <Button asChild className="flex-1">
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
                  <div className="px-3 py-2 body-strong-text">{item.label}</div>
                ) : (
                  <div className="px-1 py-2">
                    <Close asChild>
                      <LocalizedLink
                        href={item.href ?? "#"}
                        className="block rounded-xl px-2 py-2 hover:bg-accent hover:text-accent-foreground body-text"
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
                            className="block rounded-xl px-3 py-2 hover:bg-accent hover:text-accent-foreground body-text"
                          >
                            <div className="body-text">{child.label}</div>
                            {child.description ? (
                              <div className="caption-text text-muted-foreground">
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
