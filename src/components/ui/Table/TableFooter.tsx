import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const TableFooter = ({ className, ...props }: ComponentProps<"tfoot">) => {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				"bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
				className,
			)}
			{...props}
		/>
	);
};

export default TableFooter;
