"use client";

import { motion } from "framer-motion";
import { Clock, TrendingDown, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ComponentType } from "react";
import { STATS, type Stat } from "@/app/[locale]/automations/[id]/data";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

export default function StatsMetric({
  automationId,
}: {
  automationId: string;
}) {
  const stats = STATS[automationId];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <h2 className="section-title">Metrics</h2>
        <TooltipProvider>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((s, i) => (
              <MetricCard
                key={s.id}
                stat={s}
                automationId={automationId}
                index={i}
              />
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}

function MetricCard({
  stat,
  index,
  automationId,
}: {
  stat: Stat;
  index: number;
  automationId: string;
}) {
  const pct = stat.target
    ? Math.min(100, Math.round((stat.value / stat.target) * 100))
    : 100;
  const t = useTranslations(`automations.${automationId}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: "easeOut" }}
    >
      <Card className="relative overflow-hidden rounded-2xl border-[0.5px]">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className="rounded-xl px-2.5 py-1 caption-text"
            >
              {t(stat.label)}
            </Badge>
            <DirectionTag dir={stat.direction} />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-4">
            <Ring value={pct} palette={stat.palette} icon={stat.icon} />
            <div className="min-w-0">
              <div className="flex items-baseline gap-1">
                <MetricValue value={stat.value} suffix={stat.suffix} />
              </div>
            </div>
          </div>
          {stat.spark && (
            <>
              <Separator className="my-3" />
              <SparkBars data={stat.spark} palette={stat.palette} />
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function DirectionTag({ dir }: { dir?: Stat["direction"] }) {
  const map = {
    up: { label: "up", Icon: TrendingUp },
    down: { label: "down", Icon: TrendingDown },
    neutral: { label: "neutral", Icon: Clock },
  } as const;

  const entry = dir ? map[dir] : undefined;
  if (!entry) return null;
  const Icon = entry.Icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-foreground/80",
            dir === "up" && "bg-primary/10",
            dir === "down" && "bg-destructive/10",
            dir === "neutral" && "bg-muted/60",
          )}
        >
          <Icon className="size-3.5" />
        </div>
      </TooltipTrigger>
      <TooltipContent>{entry.label}</TooltipContent>
    </Tooltip>
  );
}

function MetricValue({ value, suffix }: { value: number; suffix?: string }) {
  return (
    <div className="tracking-tight">
      <span className="stats-text tabular-nums">{value}</span>
      {suffix ? (
        <span className="ml-1 caption-text text-muted-foreground">{suffix}</span>
      ) : null}
    </div>
  );
}

function Ring({
  value,
  palette = "primary",
  icon,
}: {
  value: number;
  palette?: Stat["palette"];
  icon: ComponentType<{ className?: string }>;
}) {
  const angle = Math.round((value / 100) * 360);
  const tint =
    palette === "primary"
      ? "var(--primary)"
      : palette === "accent"
        ? "var(--accent)"
        : "var(--muted-foreground)";
  const Icon = icon;

  return (
    <div className="relative grid place-items-center">
      <div
        className="size-16 rounded-full"
        style={{
          background: `conic-gradient(${tint} ${angle}deg, hsl(var(--border)) ${angle}deg)`,
        }}
      />
      <div className="absolute size-12 rounded-full bg-background grid place-items-center border" />
      <div className="absolute grid place-items-center text-muted-foreground">
        <Icon className="size-6" />
      </div>
    </div>
  );
}

function SparkBars({
  data,
  palette = "primary",
}: {
  data: number[];
  palette?: Stat["palette"];
}) {
  const tint =
    palette === "primary"
      ? "var(--primary)"
      : palette === "accent"
        ? "var(--accent)"
        : "var(--muted)";
  return (
    <div className="flex h-10 justify-center items-end gap-1">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: v }}
          transition={{
            delay: i * 0.03,
            type: "spring",
            stiffness: 200,
            damping: 18,
          }}
          className="w-2 origin-bottom rounded-sm"
          style={{
            height: `${Math.max(0.1, v) * 100}%`,
            backgroundColor: tint,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}
