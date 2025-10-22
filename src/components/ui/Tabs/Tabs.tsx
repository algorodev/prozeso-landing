"use client";

import { Root } from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const Tabs = ({ className, ...props }: ComponentProps<typeof Root>) => {
  return (
    <Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
};

export default Tabs;
