"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ElevenLabs } from "@/components/icons/ElevenLabs";
import { Slack } from "@/components/icons/Slack";
import { Twilio } from "@/components/icons/Twilio";
import { Google } from "@/components/icons/Google";
import { Microsoft } from "@/components/icons/Microsoft";
import { N8N } from "@/components/icons/N8N";

const Partnerships = () => {
  const t = useTranslations("home.partnerships");
  const partners = [
    {
      id: "elevenlabs",
      name: "ElevenLabs",
      icon: ElevenLabs,
      url: "https://elevenlabs.io",
    },
    {
      id: "google",
      name: "Google",
      icon: Google,
      url: "https://www.google.com",
    },
    {
      id: "microsoft",
      name: "Microsoft",
      icon: Microsoft,
      url: "https://www.microsoft.com",
    },
    {
      id: "n8n",
      name: "N8N",
      icon: N8N,
      url: "https://n8n.io",
    },
    {
      id: "slack",
      name: "Slack",
      icon: Slack,
      url: "https://slack.com",
    },
    {
      id: "twilio",
      name: "Twilio",
      icon: Twilio,
      url: "https://www.twilio.com",
    },
  ];

  return (
    <section className="pt-16 pb-10 px-6 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-normal">
            {t.rich("subtitle", {
              primary: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
              accent: (chunks) => (
                <span className="text-accent">{chunks}</span>
              ),
            })}
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          variants={{
            hidden: { opacity: 1 },
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="w-full mx-auto flex items-center justify-center gap-6 md:gap-8 lg:gap-10 flex-wrap"
        >
          {partners.map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={partner.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
                className="group flex items-center justify-center"
              >
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 opacity-70 hover:opacity-100 grayscale hover:grayscale-0 flex items-center justify-center"
                  aria-label={`Visit ${partner.name} website`}
                >
                  {partner.id === "elevenlabs" ? (
                    <div className="h-6 [&>svg]:h-6 [&>svg]:w-auto">
                      <Icon />
                    </div>
                  ) : partner.id === "google" ? (
                    <div className="h-10 w-auto max-w-[140px] [&>svg]:h-10 [&>svg]:w-auto">
                      <Icon />
                    </div>
                  ) : partner.id === "microsoft" ? (
                    <div className="h-32 w-32 [&>svg]:h-32 [&>svg]:w-32">
                      <Icon />
                    </div>
                  ) : partner.id === "n8n" ? (
                    <div className="h-8 w-auto max-w-[100px] [&>svg]:h-8 [&>svg]:w-auto">
                      <Icon />
                    </div>
                  ) : partner.id === "twilio" ? (
                    <div className="h-8 w-auto max-w-[120px] [&>svg]:h-8 [&>svg]:w-auto">
                      <Icon />
                    </div>
                  ) : (
                    <div className="ml-3 h-7 w-auto max-w-[120px] [&>svg]:h-7 [&>svg]:w-auto">
                      <Icon />
                    </div>
                  )}
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;
