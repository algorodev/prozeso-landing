import useFormField from "@/components/Ui/Form/useFormField";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

function FormDescription({ className, ...props }: ComponentProps<"p">) {
	const { formDescriptionId } = useFormField();

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export default FormDescription;
