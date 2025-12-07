import { Portal } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

const DialogPortal = ({ ...props }: ComponentProps<typeof Portal>) => {
  return <Portal data-slot="dialog-portal" {...props} />;
};

export default DialogPortal;
