"use client";

import { motion } from "framer-motion";
import { Brain, Mic, Network } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { LayerCard, type Palette } from "./LayerCard";
import { TrustCallout } from "./TrustCallout";

const LAYERS = [
  { id: "input", icon: Mic },
  { id: "orchestration", icon: Network },
  { id: "intelligence", icon: Brain },
] as const;

const PALETTE: readonly Palette[] = [
  {
    var: "var(--color-lavender)",
    icon: "text-lavender/60",
    tagBg: "bg-lavender/10",
    tagText: "text-lavender",
    tagBorder: "border-lavender/20",
    hoverShadow: "hover:shadow-lavender/5",
  },
  {
    var: "var(--color-blue)",
    icon: "text-blue/60",
    tagBg: "bg-blue/10",
    tagText: "text-blue",
    tagBorder: "border-blue/20",
    hoverShadow: "hover:shadow-blue/5",
  },
  {
    var: "var(--color-cyan)",
    icon: "text-cyan/60",
    tagBg: "bg-cyan/10",
    tagText: "text-cyan",
    tagBorder: "border-cyan/20",
    hoverShadow: "hover:shadow-cyan/5",
  },
];

const Understanding = () => {
  const t = useTranslations("home.understanding");

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1280px]">
        <SectionHeader
          title={t.rich("title", {
            highlight: (chunks) => (
              <span className="text-primary">{chunks}</span>
            ),
            br: () => <br />,
          })}
          subtitle={t("subtitle")}
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          variants={{
            hidden: { opacity: 1 },
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid md:grid-cols-3 gap-6"
        >
          {LAYERS.map((layer, index) => (
            <LayerCard
              key={layer.id}
              variant={index}
              palette={PALETTE[index]}
              icon={layer.icon}
              tag={t(`items.${layer.id}.tag`)}
              title={t(`items.${layer.id}.title`)}
              description={t(`items.${layer.id}.desc`)}
            />
          ))}
        </motion.div>

        <TrustCallout />
      </div>
    </section>
  );
};

export default Understanding;
