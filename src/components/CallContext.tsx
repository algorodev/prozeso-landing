"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface CallContextType {
  isCallActive: boolean;
  setIsCallActive: (active: boolean) => void;
  isCalling: boolean;
  setIsCalling: (calling: boolean) => void;
  callStartTime: number | null;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider = ({ children }: { children: ReactNode }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [callStartTime, setCallStartTime] = useState<number | null>(null);

  const handleSetIsCallActive = (active: boolean) => {
    setIsCallActive(active);
    if (active) {
      setCallStartTime(Date.now());
    } else {
      setCallStartTime(null);
      setIsCalling(false);
    }
  };

  return (
    <CallContext.Provider
      value={{
        isCallActive,
        setIsCallActive: handleSetIsCallActive,
        isCalling,
        setIsCalling,
        callStartTime,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error("useCall must be used within a CallProvider");
  }
  return context;
};
