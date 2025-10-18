import { Item } from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const AccordionItem = ({
	className,
	...props
}: ComponentProps<typeof Item>) => {
	return (
		<Item
			data-slot="accordion-item"
			className={cn("border-b last:border-b-0", className)}
			{...props}
		/>
	);
};

export default AccordionItem;
