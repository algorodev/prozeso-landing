'use client';

import { useConversation } from "@elevenlabs/react";
import { PhoneCall } from 'lucide-react'
import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";

export const AgentFloatButton = () => {
  const t = useTranslations("elevenlabs");
  const conversation = useConversation();
  const [conversationStarted, setConversationStarted] = useState(false);

  const startConversation = async () => {
    await conversation.startSession({
      agentId: "agent_6901k81nj643eha96yghs2rn00vd",
      connectionType: "webrtc",
    });
    setConversationStarted(true);
  };

  const endConversation = async () => {
    await conversation.endSession();
    setConversationStarted(false);
  };

  const label = useMemo(() => (conversationStarted ? t("end") : t("start")), [conversationStarted, t]);

  return (
    <div
      className="group relative spinning-shadow flex items-center gap-2 rounded-full bg-white/95 px-2 py-2 shadow-xl ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md"
      role="complementary"
      aria-label="Voice chat control"
    >
      <Button
        onClick={conversationStarted ? endConversation : startConversation}
        className={`rounded-full bg-black px-5 text-white hover:bg-neutral-900 focus-visible:ring-2 focus-visible:ring-black/40 active:scale-95 transition will-change-transform shadow-lg shadow-black/10 ${conversationStarted ? "ring-2 ring-emerald-400/50" : ""}`}
        size="md"
      >
        <PhoneCall className="size-5" />
        <span className="text-[13px] font-semibold tracking-wide uppercase hidden md:block">
          {label}
        </span>
      </Button>
    </div>
  );
};
