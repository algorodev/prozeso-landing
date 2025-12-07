import { Close } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

const DialogClose = ({ ...props }: ComponentProps<typeof Close>) => {
  return <Close data-slot="dialog-close" {...props} />;
};

export default DialogClose;
