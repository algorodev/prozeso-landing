"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useCallback } from "react";
import { CardDecoration } from "./CardDecoration";

export type Palette = {
  var: string;
  icon: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  hoverShadow: string;
};

type Props = {
  variant: number;
  palette: Palette;
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
};

export const LayerCard = ({
  variant,
  palette,
  icon: Icon,
  tag,
  title,
  description,
}: Props) => {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`,
    );
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      onMouseMove={handleMouseMove}
      className="h-full"
    >
      <div
        className="group relative rounded-2xl p-px overflow-hidden h-full"
        style={{ background: "var(--color-border-subtle)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
          style={{
            background: `radial-gradient(circle 150px at var(--mouse-x, -9999px) var(--mouse-y, -9999px), ${palette.var}, transparent)`,
          }}
        />
        <div
          className={`relative z-10 w-full rounded-[15px] bg-background p-6 md:p-8 transition-all hover:shadow-lg ${palette.hoverShadow} overflow-hidden h-full flex flex-col`}
        >
          <CardDecoration variant={variant} color={palette.var} />

          <span
            className={`relative inline-block w-fit px-3 py-1 mb-4 rounded-full text-xs font-medium border ${palette.tagBg} ${palette.tagText} ${palette.tagBorder}`}
          >
            {tag}
          </span>
          <Icon
            className={`relative w-10 h-10 mb-4 ${palette.icon}`}
            strokeWidth={1.5}
          />
          <h3 className="relative font-sora font-semibold text-xl tracking-tight mb-2 leading-snug">
            {title}
          </h3>
          <p className="relative text-sm text-foreground-subtle leading-relaxed font-normal">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
