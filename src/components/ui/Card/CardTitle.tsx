import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const CardTitle = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-title"
      className={cn("card-title", className)}
      {...props}
    />
  );
};

export default CardTitle;
