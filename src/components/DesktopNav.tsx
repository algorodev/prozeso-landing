"use client";

import { ChevronDown } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  item: NavItem;
  activePath: string | null;
};

export const DesktopNav = ({ item, activePath }: Props) => {
  const isActive =
    item.href && activePath ? activePath.startsWith(item.href) : false;

  if (!item.children?.length) {
    return (
      <Button asChild variant={isActive ? "default" : "ghost"}>
        <LocalizedLink href={item.href ?? "#"} className="px-3">
          {item.label}
        </LocalizedLink>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isActive ? "default" : "ghost"}
          className="min-w-0"
        >
          {item.label}
          <ChevronDown className="ml-1 size-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[--radix-dropdown-menu-trigger-width] min-w-0 sm:min-w-52"
      >
        {item.children.map((child) => (
          <DropdownMenuItem key={child.href} asChild>
            <LocalizedLink href={child.href}>
              <span className="body-md leading-tight">{child.label}</span>
            </LocalizedLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
