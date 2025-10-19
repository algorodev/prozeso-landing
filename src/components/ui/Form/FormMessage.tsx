import useFormField from "@/components/Ui/Form/useFormField";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

function FormMessage({ className, ...props }: ComponentProps<"p">) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : props.children;

	if (!body) {
		return null;
	}

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-destructive text-sm", className)}
			{...props}
		>
			{body}
		</p>
	);
}

export default FormMessage;
