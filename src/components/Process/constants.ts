import type { LucideIcon } from "lucide-react";
import { Code2, Compass, Handshake, Rocket } from "lucide-react";

export type ProcessStage = {
  id: string;
  icon: LucideIcon;
  color: string;
};

export const STAGES: ProcessStage[] = [
  {
    id: "discovery",
    icon: Handshake,
    color: "var(--color-primary)",
  },
  {
    id: "design",
    icon: Compass,
    color: "var(--color-secondary)",
  },
  {
    id: "development",
    icon: Code2,
    color: "var(--color-accent-01)",
  },
  {
    id: "support",
    icon: Rocket,
    color: "var(--color-accent-02)",
  },
];
