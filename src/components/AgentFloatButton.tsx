"use client";

import { useConversation } from "@elevenlabs/react";
import { PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AUTOMATIONS_DETAILS } from "@/data/automations";
import { VERTICALS } from "@/data/verticals";

const normalizeKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const buildNavMap = (): Record<string, string> => {
  const map: Record<string, string> = {
    home: "/",
    assessment: "/start",
    automations: "/automations",
  };

  try {
    for (const a of AUTOMATIONS_DETAILS as any[]) {
      const slug: string | undefined = a?.slug;
      if (!slug) continue;
      const key = normalizeKey(slug);
      map[key] = `/automations/${slug}`;
      if (a?.name) {
        map[normalizeKey(a.name)] = `/automations/${slug}`;
      }
    }
  } catch {}

  try {
    const entries = Object.entries(VERTICALS as Record<string, any>);
    for (const [slug, v] of entries) {
      const key = normalizeKey(slug);
      map[key] = `/verticals/${slug}`;
      if (v?.name) {
        map[normalizeKey(v.name)] = `/verticals/${slug}`;
      }
    }
  } catch {}

  return map;
};

const NAV_MAP: Record<string, string> = buildNavMap();

export const AgentFloatButton = () => {
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
  };

  const endConversation = async () => {
    await conversation.endSession();
    setConversationStarted(false);
  };

  return (
    <Button
      onClick={conversationStarted ? endConversation : startConversation}
      variant="primary"
      className={`rounded-full w-12 h-12 ${conversationStarted ? "ring-2 ring-emerald-400/50" : ""}`}
      size="md"
    >
      <PhoneCall className="size-5" />
    </Button>
  );
};
