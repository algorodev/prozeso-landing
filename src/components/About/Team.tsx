"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

const members = [
  {
    key: "ceo",
    linkedin: "https://www.linkedin.com/in/cristian-guzman-marketing/",
  },
  {
    key: "cto",
    linkedin: "https://www.linkedin.com/in/algorodev/",
  },
  {
    key: "sales",
    linkedin: "https://www.linkedin.com/in/carlesvineta/",
  },
] as const;

const Team = () => {
  const t = useTranslations("about.team");

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-sora text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-foreground/70 text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-border bg-background p-8 text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-sora text-2xl font-semibold text-primary">
                  {t(`${member.key}.name`)
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </span>
              </div>
              <h3 className="font-sora text-xl font-semibold mb-1">
                {t(`${member.key}.name`)}
              </h3>
              <p className="text-primary text-sm font-medium mb-3">
                {t(`${member.key}.role`)}
              </p>
              <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                {t(`${member.key}.description`)}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors mt-auto"
              >
                <Linkedin className="w-4 h-4" />
                {t("linkedin")}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
