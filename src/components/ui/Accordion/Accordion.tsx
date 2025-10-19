"use client";

import { Root } from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";

const Accordion = ({ ...props }: ComponentProps<typeof Root>) => {
  return <Root data-slot="accordion" {...props} />;
};

export default Accordion;
