import { cn } from "@/lib/utils";
import { ComponentProps, createContext, useId } from "react";

type FormItemContextValue = {
	id: string;
};

export const FormItemContext = createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

function FormItem({ className, ...props }: ComponentProps<"div">) {
	const id = useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn("grid gap-2", className)}
				{...props}
			/>
		</FormItemContext.Provider>
	);
}

export default FormItem;
