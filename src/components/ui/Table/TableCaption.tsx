import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const TableCaption = ({ className, ...props }: ComponentProps<"caption">) => {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 caption-text", className)}
      {...props}
    />
  );
};

export default TableCaption;
