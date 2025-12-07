import { Trigger } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

const DialogTrigger = ({ ...props }: ComponentProps<typeof Trigger>) => {
  return <Trigger data-slot="dialog-trigger" {...props} />;
};

export default DialogTrigger;
