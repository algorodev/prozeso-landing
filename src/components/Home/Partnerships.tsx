"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ElevenLabs } from "@/components/icons/ElevenLabs";
import { Slack } from "@/components/icons/Slack";
import { Twilio } from "@/components/icons/Twilio";

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
    <section className="py-16 px-6 bg-muted/30">
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
          className="w-fit mx-auto flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20"
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
                  className="transition-all duration-300 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 flex items-center justify-center"
                  aria-label={`Visit ${partner.name} website`}
                >
                  {partner.id === "elevenlabs" ? (
                    <div className="h-7 [&>svg]:h-full [&>svg]:w-auto">
                      <Icon />
                    </div>
                  ) : partner.id === "twilio" ? (
                    <div className="h-12 [&>svg]:h-full [&>svg]:w-auto">
                      <Icon />
                    </div>
                  ) : (
                    <div className="h-12 [&>svg]:h-full [&>svg]:w-auto">
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
