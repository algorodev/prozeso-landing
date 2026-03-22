"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import AreaDetailDialog from "./AreaDetailDialog";
import AreaDetailDialogLegacy from "./AreaDetailDialogLegacy";
import {
  CONNECTIONS,
  DASHED_CONNECTIONS,
  getColor,
  getPos,
  PRIMARIES,
  SECONDARIES,
} from "./constants";

const BubbleDiagram = () => {
  const t = useTranslations("home.automationSuite");
  const searchParams = useSearchParams();
  const useLegacy = searchParams.get("dialog") === "legacy";
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("0");

  const ALL_CONNECTIONS = [...CONNECTIONS, ...DASHED_CONNECTIONS];

  const connectedTo = (id: string) =>
    ALL_CONNECTIONS.filter(([a, b]) => a === id || b === id).flatMap(
      ([a, b]) => (a === id ? [b] : [a]),
    );

  const isConnectionHighlighted = (a: string, b: string) =>
    hovered !== null && (a === hovered || b === hovered);

  return (
    <section className="relative w-full py-16 md:py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-[1280px]">
        {/* Section header */}
        <div className="mb-10 lg:mb-16">
          <motion.h2
            className="font-sora text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6 text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-xl font-normal"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ delay: 0.05, duration: 0.6 }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Diagram container — horizontal */}
        <motion.div
          className="relative mx-auto aspect-[1] sm:aspect-[20/7] max-w-[1280px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* SVG connections layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              {CONNECTIONS.map(([a, b]) => (
                <linearGradient
                  key={`grad-${a}-${b}`}
                  id={`grad-${a}-${b}`}
                  gradientUnits="userSpaceOnUse"
                  x1={getPos(a).x}
                  y1={getPos(a).y}
                  x2={getPos(b).x}
                  y2={getPos(b).y}
                >
                  <stop offset="0%" stopColor={getColor(a)} />
                  <stop offset="100%" stopColor={getColor(b)} />
                </linearGradient>
              ))}
            </defs>

            {CONNECTIONS.map(([a, b]) => {
              const from = getPos(a);
              const to = getPos(b);
              const highlighted = isConnectionHighlighted(a, b);
              return (
                <motion.line
                  key={`line-${a}-${b}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={`url(#grad-${a}-${b})`}
                  strokeWidth={highlighted ? 0.3 : 0.15}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  animate={{
                    opacity: highlighted ? 0.5 : hovered ? 0.08 : 0.2,
                    strokeWidth: highlighted ? 0.3 : 0.15,
                  }}
                />
              );
            })}

            {/* Dashed connections */}
            {DASHED_CONNECTIONS.map(([a, b]) => {
              const from = getPos(a);
              const to = getPos(b);
              const highlighted = isConnectionHighlighted(a, b);
              return (
                <motion.line
                  key={`dashed-${a}-${b}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="white"
                  strokeWidth={highlighted ? 0.2 : 0.1}
                  pathLength={100}
                  strokeDasharray="3 3.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.15 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  animate={{
                    opacity: highlighted ? 0.35 : hovered ? 0.04 : 0.12,
                    strokeWidth: highlighted ? 0.2 : 0.1,
                  }}
                />
              );
            })}
          </svg>

          {/* Secondary dots (3) */}
          {SECONDARIES.map((dot, i) => {
            const isDotHovered = hovered === dot.id;
            const isConnected =
              hovered !== null && connectedTo(hovered).includes(dot.id);
            const dimmed = hovered !== null && !isDotHovered && !isConnected;

            return (
              <motion.div
                key={dot.id}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 + 0.08 * i }}
                animate={{
                  opacity: dimmed ? 0.25 : 1,
                  scale: isDotHovered ? 1.3 : 1,
                }}
                onMouseEnter={() => setHovered(dot.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelectedArea(dot.id)}
              >
                <div className="relative flex flex-col items-center cursor-pointer">
                  {/* Dot glow */}
                  <div
                    className="absolute -inset-2 rounded-full blur-lg transition-opacity duration-300"
                    style={{
                      backgroundColor: dot.color,
                      opacity: isDotHovered ? 0.12 : 0.04,
                    }}
                  />
                  {/* Dot circle with icon */}
                  <div
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 sm:h-12 sm:w-12 md:h-14 md:w-14"
                    style={{
                      borderColor: isDotHovered
                        ? dot.color
                        : `color-mix(in srgb, ${dot.color} 30%, transparent)`,
                      backgroundColor: `color-mix(in srgb, ${dot.color} 5%, var(--color-background))`,
                      boxShadow: isDotHovered
                        ? `0 0 10px color-mix(in srgb, ${dot.color} 10%, transparent), 0 0 20px color-mix(in srgb, ${dot.color} 4%, transparent)`
                        : `0 0 6px color-mix(in srgb, ${dot.color} 4%, transparent)`,
                    }}
                  >
                    <dot.icon
                      className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 transition-opacity duration-300"
                      style={{
                        color: dot.color,
                        opacity: isDotHovered ? 1 : 0.7,
                      }}
                      strokeWidth={1.5}
                    />
                  </div>
                  {/* Tooltip label — only on hover */}
                  <AnimatePresence>
                    {isDotHovered && (
                      <motion.span
                        className="absolute left-1/2 -translate-x-1/2 -top-3 -translate-y-full whitespace-nowrap rounded-md bg-background/90 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[11px] font-medium sm:text-xs"
                        style={{ color: dot.color }}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                      >
                        {t(`areas.${dot.id}.name`)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}

          {/* Primary bubbles (6) */}
          {PRIMARIES.map((bubble, i) => {
            const isHovered = hovered === bubble.id;
            const isConnected =
              hovered !== null && connectedTo(hovered).includes(bubble.id);
            const dimmed = hovered !== null && !isHovered && !isConnected;

            return (
              <motion.div
                key={bubble.id}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 * i,
                  type: "spring",
                  stiffness: 200,
                }}
                animate={{
                  scale: isHovered ? 1.08 : dimmed ? 0.95 : 1,
                  opacity: dimmed ? 0.35 : 1,
                }}
                onMouseEnter={() => setHovered(bubble.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelectedArea(bubble.id)}
              >
                <div className="group relative flex flex-col items-center gap-2 cursor-pointer">
                  {/* Glow background */}
                  <div
                    className="absolute -inset-3 rounded-full blur-xl transition-opacity duration-300"
                    style={{
                      backgroundColor: bubble.color,
                      opacity: isHovered ? 0.08 : 0.03,
                    }}
                  />

                  {/* Bubble circle */}
                  <div
                    className="relative flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 sm:h-18 sm:w-18 md:h-22 md:w-22"
                    style={{
                      borderColor: isHovered
                        ? bubble.color
                        : `color-mix(in srgb, ${bubble.color} 30%, transparent)`,
                      backgroundColor: `color-mix(in srgb, ${bubble.color} 5%, var(--color-background))`,
                      boxShadow: isHovered
                        ? `0 0 12px color-mix(in srgb, ${bubble.color} 12%, transparent), 0 0 24px color-mix(in srgb, ${bubble.color} 5%, transparent)`
                        : `0 0 6px color-mix(in srgb, ${bubble.color} 4%, transparent)`,
                    }}
                  >
                    <bubble.icon
                      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 transition-opacity duration-300"
                      style={{
                        color: bubble.color,
                        opacity: isHovered ? 1 : 0.7,
                      }}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className="text-xs font-medium transition-colors duration-300 sm:text-sm whitespace-nowrap"
                    style={{
                      color: isHovered
                        ? bubble.color
                        : "var(--color-muted-foreground)",
                    }}
                  >
                    {t(`areas.${bubble.id}.name`)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View all button */}
        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <LocalizedLink href="/solutions">
              {t("viewAll")}
              <ArrowRight className="ml-1 size-4" />
            </LocalizedLink>
          </Button>
        </div>
      </div>

      {useLegacy ? (
        <AreaDetailDialogLegacy
          selectedArea={selectedArea}
          onClose={() => setSelectedArea(null)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      ) : (
        <AreaDetailDialog
          selectedArea={selectedArea}
          onClose={() => setSelectedArea(null)}
        />
      )}
    </section>
  );
};

export default BubbleDiagram;
