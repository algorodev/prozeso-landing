"use client";

import type { VariantProps } from "class-variance-authority";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import type { buttonVariants } from "@/components/ui/Button/constants";
import { CALENDAR_URL } from "./constants";

type BookCallButtonProps = VariantProps<typeof buttonVariants> & {
  showIcon?: boolean;
  className?: string;
};

export function BookCallButton({
  showIcon = true,
  size = "lg",
  variant = "outline",
  className,
}: BookCallButtonProps) {
  const tc = useTranslations("common.cta");

  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={CALENDAR_URL} target="_blank" rel="noreferrer">
        {showIcon && <Phone className="mr-1 size-5" />}
        {tc("bookCall")}
      </a>
    </Button>
  );
}
