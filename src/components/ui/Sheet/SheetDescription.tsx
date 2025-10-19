import { Description } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const SheetDescription = ({
  className,
  ...props
}: ComponentProps<typeof Description>) => {
  return (
    <Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
};

export default SheetDescription;
