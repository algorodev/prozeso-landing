"use client";

import { useConversation } from "@elevenlabs/react";
import { PhoneCall } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from 'next/navigation'
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

const NAV_MAP: Record<string, string> = {
	home: "/",
	verticals: "/solutions",
	assessment: "/start",
	receptionist_ai: "/automations/receptionist-in-a-box",
	appointment_reminder: "/automations/appointment-reminders-smart-reschedule",
	missed_call_auto_callback: "/automations/missed-call-auto-callback",
}

export const AgentFloatButton = () => {
  const t = useTranslations("elevenlabs");
  const conversation = useConversation();
  const locale = useLocale();
	const router = useRouter();
  const [conversationStarted, setConversationStarted] = useState(false);

  const startConversation = async () => {
    await conversation.startSession({
      agentId:
        locale === "en"
          ? "agent_6001k8tzxv0redg84r1s9m3c0gqd"
          : "agent_7501k8bnshvgf6xvrx74z17s5042",
      connectionType: "webrtc",
			clientTools: {
				navigateTo: async ({target}) => {
					const path = NAV_MAP[target] || "/";
					if (!path) {
						console.warn("[Agent navigateTo] Unknown target:", target);
						return;
					}
					router.push(`/${locale}${path}`);
				},
				finishCall: async () => {
					await endConversation();
				}
			}
    });
    setConversationStarted(true);
  };

  const endConversation = async () => {
    await conversation.endSession();
    setConversationStarted(false);
  };

  const label = useMemo(
    () => (conversationStarted ? t("end") : t("start")),
    [conversationStarted, t],
  );

  return (
    <div className="group relative spinning-shadow flex items-center rounded-full bg-transparent px-1 py-1 ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
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
