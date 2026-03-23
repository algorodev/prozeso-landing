import { Overlay } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const DialogOverlay = ({
  className,
  ...props
}: ComponentProps<typeof Overlay>) => {
  return (
    <Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[70] bg-black/85",
        className,
      )}
      {...props}
    />
  );
};

export default DialogOverlay;
