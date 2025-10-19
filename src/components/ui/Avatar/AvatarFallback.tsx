import { Fallback } from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const AvatarFallback = ({
  className,
  ...props
}: ComponentProps<typeof Fallback>) => {
  return (
    <Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
};

export default AvatarFallback;
