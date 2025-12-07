import { Description } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const DialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof Description>) => {
  return (
    <Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
};

export default DialogDescription;
