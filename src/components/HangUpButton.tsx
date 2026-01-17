"use client";

import { PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HangUpButtonProps {
  onHangUp: () => void;
}

export const HangUpButton = ({ onHangUp }: HangUpButtonProps) => {
  return (
    <Button
      onClick={onHangUp}
      variant="destructive"
      className="rounded-full w-12 h-12 fixed bottom-6 right-6 z-50 shadow-lg"
      size="md"
      aria-label="End call"
    >
      <PhoneOff className="size-5" />
    </Button>
  );
};
