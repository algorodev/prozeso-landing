import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60 active:scale-[.99] cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground hover:bg-[color-mix(in_oklch,_var(--color-accent)_92%,_white)] button-primary-text",
        secondary:
          "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,_var(--color-primary)_85%,_black)] button-primary-text",
        destructive:
          "bg-destructive text-[oklch(0.985_0.005_250)] hover:bg-[color-mix(in_oklch,_var(--color-destructive)_85%,_black)] button-primary-text",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-[color-mix(in_oklch,_var(--color-foreground)_8%,_transparent)] button-secondary-text",
        ghost:
          "bg-transparent text-foreground hover:bg-[color-mix(in_oklch,_var(--color-foreground)_8%,_transparent)] button-secondary-text",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5",
        icon: "h-10 w-10",
      },
      radius: {
        md: "rounded-xl",
        lg: "rounded-2xl",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      radius: "md",
    },
  },
);
