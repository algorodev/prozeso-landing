import { Content } from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const TabsContent = ({
  className,
  ...props
}: ComponentProps<typeof Content>) => {
  return (
    <Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
};

export default TabsContent;
