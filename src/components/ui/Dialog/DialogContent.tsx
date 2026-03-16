import { Content } from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type { ComponentProps } from "react";
import DialogClose from "@/components/ui/Dialog/DialogClose";
import DialogOverlay from "@/components/ui/Dialog/DialogOverlay";
import DialogPortal from "@/components/ui/Dialog/DialogPortal";
import { cn } from "@/lib/utils";

const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: ComponentProps<typeof Content> & {
  showCloseButton?: boolean;
}) => {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <Content
        data-slot="dialog-content"
        className="fixed inset-0 z-[70] overflow-y-auto"
        {...props}
      >
        <div className="flex min-h-full items-center justify-center py-16 px-4">
          <div
            className={cn(
              "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
              className,
            )}
          >
            {children}
            {showCloseButton && (
              <DialogClose
                data-slot="dialog-close"
                className="cursor-pointer data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              >
                <XIcon />
                <span className="sr-only">Close</span>
              </DialogClose>
            )}
          </div>
        </div>
      </Content>
    </DialogPortal>
  );
};

export default DialogContent;
