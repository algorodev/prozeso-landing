import { Trigger } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

const SheetTrigger = ({ ...props }: ComponentProps<typeof Trigger>) => {
  return <Trigger data-slot="sheet-trigger" {...props} />;
};

export default SheetTrigger;
