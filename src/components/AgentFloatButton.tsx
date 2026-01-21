"use client";

import { useConversation } from "@elevenlabs/react";
import { PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react"
import { useCall } from "@/components/CallContext";

const normalizeKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const NAV_MAP: Record<string, string> = {
  home: "/",
  assessment: "/start",
  automations: "/automations",
  useCases: "/use-cases",
};

export const AgentFloatButton = () => {
  const conversation = useConversation();
  const locale = useLocale();
  const router = useRouter();
  const [conversationStarted, setConversationStarted] = useState(false);
  const { setIsCallActive, isCalling, setIsCalling } = useCall();

  const endConversation = useCallback(async () => {
    await conversation.endSession();
    setConversationStarted(false);
    setIsCallActive(false);
    setIsCalling(false);
  }, [conversation, setIsCallActive, setIsCalling]);

  const startConversation = async () => {
    setIsCalling(true);
    try {
      await conversation.startSession({
        agentId:
          locale === "en"
            ? "agent_6001k8tzxv0redg84r1s9m3c0gqd"
            : "agent_7501k8bnshvgf6xvrx74z17s5042",
        connectionType: "webrtc",
        clientTools: {
          navigateTo: async ({ target }) => {
            const key = normalizeKey(String(target || ""));
            const path = NAV_MAP[key] || "/";
            if (!path) {
              console.warn("[Agent navigateTo] Unknown target:", target);
              return;
            }
            router.push(`/${locale}${path}`);
          },
          finishCall: async () => {
            await endConversation();
          },
        },
      });
      
      setConversationStarted(true);
      setIsCallActive(true);
      setIsCalling(false);
    } catch (error) {
      console.error("Error starting conversation:", error);
      setIsCalling(false);
      setIsCallActive(false);
    }
  };

  useEffect(() => {
    const handleHangUp = () => {
      if (conversationStarted) {
        endConversation();
      }
    };

    window.addEventListener("hangup-call", handleHangUp);
    return () => window.removeEventListener("hangup-call", handleHangUp);
  }, [conversationStarted, endConversation]);

  const t = useTranslations("common.agentButton");

  if (conversationStarted) {
    return <div style={{ display: "none" }} />;
  }

  return (
    <button
      onClick={startConversation}
      disabled={isCalling}
      className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border shadow-lg hover:bg-white/90 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      aria-label={t("label")}
    >
      <div className="rounded-full w-9 h-9 bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
        {isCalling ? (
          <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
        ) : (
          <PhoneCall className="size-4" />
        )}
      </div>
      <span className="text-sm font-medium text-black whitespace-nowrap">
        {isCalling ? t("calling") : t("text")}
      </span>
    </button>
  );
};
