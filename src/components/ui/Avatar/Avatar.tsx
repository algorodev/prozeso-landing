import { Root } from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const Avatar = ({ className, ...props }: ComponentProps<typeof Root>) => {
  return (
    <Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
};

export default Avatar;
