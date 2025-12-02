import type { ComponentProps } from "react";
import useFormField from "@/components/ui/Form/useFormField";
import { cn } from "@/lib/utils";

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
      className={cn("text-destructive caption-text", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export default FormMessage;
