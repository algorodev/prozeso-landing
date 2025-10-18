import { Sub } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";

const DropdownMenuSub = ({ ...props }: ComponentProps<typeof Sub>) => {
	return <Sub data-slot="dropdown-menu-sub" {...props} />;
};

export default DropdownMenuSub;
