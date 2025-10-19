import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60 active:scale-[.99]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,_var(--color-primary)_80%,_black)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,_var(--color-secondary)_92%,_black)]",
        accent:
          "bg-accent text-accent-foreground hover:bg-[color-mix(in_oklch,_var(--color-accent)_85%,_black)]",
        subtle:
          "bg-[color-mix(in_oklch,_var(--color-foreground)_6%,_transparent)] text-foreground hover:bg-[color-mix(in_oklch,_var(--color-foreground)_10%,_transparent)]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-[color-mix(in_oklch,_var(--color-foreground)_8%,_transparent)]",
        ghost:
          "bg-transparent text-foreground hover:bg-[color-mix(in_oklch,_var(--color-foreground)_8%,_transparent)]",
        destructive:
          "bg-destructive text-[oklch(0.985_0.005_250)] hover:bg-[color-mix(in_oklch,_var(--color-destructive)_85%,_black)]",
        success:
          "bg-[oklch(0.66_0.18_150)] text-[oklch(0.985_0.005_250)] hover:bg-[oklch(0.62_0.18_150)]",
        warning:
          "bg-[oklch(0.83_0.18_70)] text-[oklch(0.22_0.02_250)] hover:bg-[oklch(0.79_0.18_70)]",
        info: "bg-[oklch(0.70_0.14_210)] text-[oklch(0.985_0.005_250)] hover:bg-[oklch(0.66_0.14_210)]",
        link: "text-accent underline-offset-4 hover:underline bg-transparent",
        inverse:
          "bg-white text-primary hover:bg-[color-mix(in_oklch,_white_90%,_black)] dark:bg-[oklch(0.97_0.01_250)] dark:text-primary",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
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
