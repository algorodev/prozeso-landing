import type { Root } from "@radix-ui/react-label";
import type { ComponentProps } from "react";
import useFormField from "@/components/ui/Form/useFormField";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

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
