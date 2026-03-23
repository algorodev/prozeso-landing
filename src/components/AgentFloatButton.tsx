"use client";

import { useConversation } from "@elevenlabs/react";
import { PhoneCall } from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useCall } from "@/components/CallContext";

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
        agentId: "agent_3601kgm49jhgf9w83qvbxjkq5xjq",
        connectionType: "webrtc",
        overrides: {
          agent: {
            firstMessage:
              locale === "es"
                ? "Hola, soy MarIA, la asistente virtual de Prozeso, ¿En que puedo ayudarte?"
                : "Hi, I am MarIA, the virtual agent of Prozeso, how can I help you?",
          },
        },
        dynamicVariables: {
          language: locale,
        },
        clientTools: {
          landingNavigateTo: async ({ url }: { url: string }) => {
            try {
              const allowedDomains = [
                "prozeso.com",
                "calendly.com",
                "app.prozeso.com",
              ];

              const urlObj = new URL(url);
              const isAllowed = allowedDomains.some(
                (domain) =>
                  urlObj.hostname === domain ||
                  urlObj.hostname.endsWith(domain),
              );

              if (!isAllowed) {
                console.warn(
                  `[landingNavigateTo] Blocked non-allowed domain: ${url}`,
                );
                return;
              }

              if (
                urlObj.hostname.includes("calendly.com") ||
                urlObj.hostname.includes("app.prozeso.com")
              ) {
                window.open(url, "_blank", "noopener noreferrer");
                return;
              }

              if (urlObj.hostname.includes("prozeso.com")) {
                const path = urlObj.pathname;
                router.push(path as Route);
                return;
              }
            } catch (error) {
              console.error(
                `[landingNavigateTo] Error parsing URL: ${url}`,
                error,
              );
            }
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
      type="button"
      onClick={startConversation}
      disabled={isCalling}
      className="flex items-center bg-[#004D45]/20 backdrop-blur-sm p-1.5 rounded-full border border-(--brand-cyan)/40 shadow-lg hover:bg-[#004D45]/30 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      aria-label={t("label")}
    >
      <div className="rounded-full w-9 h-9 bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
        {isCalling ? (
          <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
        ) : (
          <PhoneCall className="size-4" />
        )}
      </div>
      <span className="text-sm font-semibold text-foreground whitespace-nowrap px-3">
        {isCalling ? t("calling") : t("text")}
      </span>
    </button>
  );
};
