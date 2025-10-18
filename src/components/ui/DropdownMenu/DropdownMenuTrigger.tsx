import { Trigger } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";

const DropdownMenuTrigger = ({ ...props }: ComponentProps<typeof Trigger>) => {
	return <Trigger data-slot="dropdown-menu-trigger" {...props} />;
};

export default DropdownMenuTrigger;
