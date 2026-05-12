"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  titleId?: string;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  titleId,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-12 lg:mb-16", className)}>
      <motion.h2
        id={titleId}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="font-sora text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tighter text-balance wrap-break-word max-w-4xl mx-auto mb-6"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="body-md text-foreground-subtle max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
