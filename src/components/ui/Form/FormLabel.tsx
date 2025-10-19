import useFormField from "@/components/Ui/Form/useFormField";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Root } from "@radix-ui/react-label";

function FormLabel({ className, ...props }: ComponentProps<typeof Root>) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot="form-label"
			data-error={!!error}
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
}

export default FormLabel;
