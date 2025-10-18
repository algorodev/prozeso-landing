import { Content } from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const AccordionContent = ({
	className,
	children,
	...props
}: ComponentProps<typeof Content>) => {
	return (
		<Content
			data-slot="accordion-content"
			className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
			{...props}
		>
			<div className={cn("pt-0 pb-4", className)}>{children}</div>
		</Content>
	);
};

export default AccordionContent;
