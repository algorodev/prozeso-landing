import { Root } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";

const DropdownMenu = ({ ...props }: ComponentProps<typeof Root>) => {
  return <Root data-slot="dropdown-menu" {...props} />;
};

export default DropdownMenu;
