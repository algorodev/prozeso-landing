"use client";

import { Root } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

const Dialog = ({ ...props }: ComponentProps<typeof Root>) => {
  return <Root data-slot="dialog" {...props} />;
};

export default Dialog;
