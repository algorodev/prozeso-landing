"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface CallContextType {
  isCallActive: boolean;
  setIsCallActive: (active: boolean) => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider = ({ children }: { children: ReactNode }) => {
  const [isCallActive, setIsCallActive] = useState(false);

  return (
    <CallContext.Provider value={{ isCallActive, setIsCallActive }}>
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
