"use client";

import { Root } from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

const Sheet = ({ ...props }: ComponentProps<typeof Root>) => {
  return <Root data-slot="sheet" {...props} />;
};

export default Sheet;
