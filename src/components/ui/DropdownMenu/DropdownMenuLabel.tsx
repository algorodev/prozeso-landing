import { Label } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof Label> & {
  inset?: boolean;
}) => {
  return (
    <Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 caption-text data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
};

export default DropdownMenuLabel;
