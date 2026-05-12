"use client";

import { Button, type ButtonProps } from "@prospector-automations/components";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { CALENDAR_URL } from "./constants";

type BookCallButtonProps = Pick<ButtonProps, "size" | "variant"> & {
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
