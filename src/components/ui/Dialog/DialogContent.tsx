import { Content } from "@radix-ui/react-dialog";
import { ChevronsRightLeft } from "lucide-react";
import type { ComponentProps } from "react";
import DialogClose from "@/components/ui/Dialog/DialogClose";
import DialogOverlay from "@/components/ui/Dialog/DialogOverlay";
import DialogPortal from "@/components/ui/Dialog/DialogPortal";
import { cn } from "@/lib/utils";

const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  closeButtonOutside = false,
  ...props
}: ComponentProps<typeof Content> & {
  showCloseButton?: boolean;
  closeButtonOutside?: boolean;
}) => {
  const closeButton = showCloseButton && (
    <DialogClose
      data-slot="dialog-close"
      className={cn(
        "cursor-pointer data-[state=open]:bg-accent data-[state=open]:text-muted-foreground flex items-center justify-center size-10 rounded-md border border-border opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6 p-2",
        closeButtonOutside && "bg-background opacity-100",
      )}
    >
      <ChevronsRightLeft className="-rotate-45" />
      <span className="sr-only">Close</span>
    </DialogClose>
  );

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <Content
        data-slot="dialog-content"
        className="fixed inset-0 z-[70] overflow-y-auto"
        {...props}
      >
        <DialogClose asChild>
          <div
            className={cn(
              "flex min-h-full justify-center px-4 cursor-default",
              closeButtonOutside
                ? "items-start pt-8 pb-16"
                : "items-center py-16",
            )}
          >
            {closeButtonOutside ? (
              /* biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: click stopPropagation prevents backdrop close from reaching inner content */
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-end gap-2"
              >
                {closeButton}
                <div
                  className={cn(
                    "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative grid w-full gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
                    className,
                  )}
                >
                  {children}
                </div>
              </div>
            ) : (
              /* biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: click stopPropagation prevents backdrop close from reaching inner content */
              <div
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative grid w-full gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
                  className,
                )}
              >
                {children}
                {!closeButtonOutside && closeButton}
              </div>
            )}
          </div>
        </DialogClose>
      </Content>
    </DialogPortal>
  );
};

export default DialogContent;
