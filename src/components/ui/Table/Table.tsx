"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const Table = ({ className, ...props }: ComponentProps<"table">) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom body-text", className)}
        {...props}
      />
    </div>
  );
};

export default Table;
