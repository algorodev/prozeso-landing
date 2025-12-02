import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const CardDescription = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground body-text", className)}
      {...props}
    />
  );
};

export default CardDescription;
