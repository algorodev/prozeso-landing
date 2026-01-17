"use client";

import { AgentFloatButton } from "@/components/AgentFloatButton";
import { useCall } from "@/components/CallContext";
import { HangUpButton } from "@/components/HangUpButton";
import { VoiceReactiveOverlay } from "@/components/VoiceReactiveOverlay";

export const CallManager = () => {
  const { isCallActive, setIsCallActive, callStartTime } = useCall();

  const handleHangUp = () => {
    setIsCallActive(false);
    const event = new CustomEvent("hangup-call");
    window.dispatchEvent(event);
  };

  return (
    <>
      {!isCallActive && (
        <div className="fixed bottom-6 right-6 z-50">
          <AgentFloatButton />
        </div>
      )}
      {isCallActive && (
        <>
          <VoiceReactiveOverlay isActive={isCallActive} onHangUp={handleHangUp} />
          <HangUpButton onHangUp={handleHangUp} callStartTime={callStartTime} />
        </>
      )}
    </>
  );
};
