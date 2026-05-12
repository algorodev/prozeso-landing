"use client";

import { PhoneOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

interface HangUpButtonProps {
  onHangUp: () => void;
  callStartTime: number | null;
}

export const HangUpButton = ({
  onHangUp,
  callStartTime,
}: HangUpButtonProps) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!callStartTime) {
      setElapsedSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [callStartTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
      <div className="text-sm font-medium text-black bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-lg">
        {formatTime(elapsedSeconds)}
      </div>
      <Button
        onClick={onHangUp}
        variant="destructive"
        className="rounded-full w-12 h-12 shadow-lg"
        size="icon"
        aria-label="End call"
      >
        <PhoneOff className="size-5" />
      </Button>
    </div>
  );
};
