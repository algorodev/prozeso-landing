import { Title } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const SheetTitle = ({ className, ...props }: ComponentProps<typeof Title>) => {
  return (
    <Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
};

export default SheetTitle;
