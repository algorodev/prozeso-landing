import { useConversation } from "@elevenlabs/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export const ElevenlabsDemo = () => {
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

  return (
    <div className="flex justify-center">
      <Button
        onClick={conversationStarted ? endConversation : startConversation}
      >
        {conversationStarted ? t("end") : t("start")}
      </Button>
    </div>
  );
};
