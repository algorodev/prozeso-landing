import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";

const DropdownMenuRadioGroup = ({
	...props
}: ComponentProps<typeof RadioGroup>) => {
	return <RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
};

export default DropdownMenuRadioGroup;
