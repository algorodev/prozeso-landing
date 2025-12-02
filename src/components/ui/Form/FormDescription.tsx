import type { ComponentProps } from "react";
import useFormField from "@/components/ui/Form/useFormField";
import { cn } from "@/lib/utils";

function FormDescription({ className, ...props }: ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground caption-text", className)}
      {...props}
    />
  );
}

export default FormDescription;
