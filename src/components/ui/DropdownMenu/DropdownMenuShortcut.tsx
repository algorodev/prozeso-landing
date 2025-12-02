import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const DropdownMenuShortcut = ({
  className,
  ...props
}: ComponentProps<"span">) => {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto caption-text tracking-widest",
        className,
      )}
      {...props}
    />
  );
};

export default DropdownMenuShortcut;
