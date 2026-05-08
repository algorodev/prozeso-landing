"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ElevenLabs } from "@/components/icons/ElevenLabs";
import { Google } from "@/components/icons/Google";
import { Hubspot } from "@/components/icons/Hubspot";
import { Microsoft } from "@/components/icons/Microsoft";
import { N8N } from "@/components/icons/N8N";
import { Notion } from "@/components/icons/Notion";
import { Odoo } from "@/components/icons/Odoo";
import { Slack } from "@/components/icons/Slack";
import { Twilio } from "@/components/icons/Twilio";

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
  {
    id: "hubspot",
    name: "HubSpot",
    icon: Hubspot,
    url: "https://www.hubspot.com",
  },
  {
    id: "notion",
    name: "Notion",
    icon: Notion,
    url: "https://www.notion.so",
  },
  {
    id: "odoo",
    name: "Odoo",
    icon: Odoo,
    url: "https://www.odoo.com",
  },
];

const iconSizeClass: Record<string, string> = {
  elevenlabs: "h-4 sm:h-6 [&>svg]:h-4 sm:[&>svg]:h-6 [&>svg]:w-auto",
  google:
    "h-7 sm:h-10 w-auto max-w-[100px] sm:max-w-[140px] [&>svg]:h-7 sm:[&>svg]:h-10 [&>svg]:w-auto",
  microsoft:
    "h-16 w-16 sm:h-32 sm:w-32 [&>svg]:h-16 [&>svg]:w-16 sm:[&>svg]:h-32 sm:[&>svg]:w-32",
  n8n: "h-5 sm:h-8 w-auto max-w-[70px] sm:max-w-[100px] [&>svg]:h-5 sm:[&>svg]:h-8 [&>svg]:w-auto",
  twilio:
    "h-5 sm:h-8 w-auto max-w-[80px] sm:max-w-[120px] [&>svg]:h-5 sm:[&>svg]:h-8 [&>svg]:w-auto",
  hubspot:
    "h-5 sm:h-8 w-auto max-w-[100px] sm:max-w-[140px] [&>svg]:h-5 sm:[&>svg]:h-8 [&>svg]:w-auto",
  notion: "h-7 sm:h-10 [&>svg]:h-7 sm:[&>svg]:h-10 [&>svg]:w-auto",
  odoo: "h-5 sm:h-8 w-auto max-w-[100px] sm:max-w-[140px] [&>svg]:h-5 sm:[&>svg]:h-8 [&>svg]:w-auto",
  default:
    "h-5 sm:h-7 w-auto max-w-[80px] sm:max-w-[120px] [&>svg]:h-5 sm:[&>svg]:h-7 [&>svg]:w-auto",
};

const PartnerIcon = ({ partner }: { partner: (typeof partners)[number] }) => {
  const Icon = partner.icon;
  const sizeClass = iconSizeClass[partner.id] || iconSizeClass.default;
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-all duration-300 opacity-70 hover:opacity-100 grayscale hover:grayscale-0 flex items-center justify-center shrink-0 px-4 sm:px-6 md:px-8"
      aria-label={`Visit ${partner.name} website`}
    >
      <div className={sizeClass}>
        <Icon />
      </div>
    </a>
  );
};

const Partnerships = () => {
  const t = useTranslations("home.partnerships");

  return (
    <section className="pt-10 pb-3 bg-background-lighter/30">
      <div className="container mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-3"
        >
          <p className="text-base text-foreground-muted max-w-2xl mx-auto font-normal">
            {t.rich("subtitle", {
              primary: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
              accent: (chunks) => (
                <span className="text-secondary">{chunks}</span>
              ),
            })}
          </p>
        </motion.div>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex items-center w-max"
          animate={{ x: ["0%", "-25%"] }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {Array.from({ length: 4 }, () => partners)
            .flat()
            .map((partner, idx) => (
              <PartnerIcon key={`${partner.id}-${idx}`} partner={partner} />
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;
