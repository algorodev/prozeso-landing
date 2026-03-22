import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  BriefcaseBusiness,
  CalendarCheck,
  HeadsetIcon,
  Landmark,
  Megaphone,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

export type AreaNode = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  x: number;
  y: number;
  primary: boolean;
  startIndex: number;
};

export const AREAS: AreaNode[] = [
  // Primary — spread horizontally, sides at mid-height
  {
    id: "bookings",
    label: "Bookings",
    icon: CalendarCheck,
    color: "var(--color-primary)",
    x: 7,
    y: 52,
    primary: true,
    startIndex: 1,
  },
  {
    id: "sales",
    label: "Sales",
    icon: TrendingUp,
    color: "var(--color-secondary)",
    x: 20,
    y: 25,
    primary: false,
    startIndex: 9,
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    color: "var(--color-secondary)",
    x: 43,
    y: 10,
    primary: true,
    startIndex: 21,
  },
  {
    id: "operations",
    label: "Operations",
    icon: Settings,
    color: "var(--color-chart-2)",
    x: 62,
    y: 52,
    primary: true,
    startIndex: 33,
  },
  {
    id: "finance",
    label: "Finance",
    icon: Landmark,
    color: "var(--color-accent)",
    x: 92,
    y: 42,
    primary: true,
    startIndex: 13,
  },
  {
    id: "customerSuccess",
    label: "Customer Success",
    icon: HeadsetIcon,
    color: "var(--color-primary)",
    x: 32,
    y: 78,
    primary: true,
    startIndex: 25,
  },
  // Secondary — positioned outside the primary cluster
  {
    id: "management",
    label: "Management",
    icon: BriefcaseBusiness,
    color: "var(--color-accent)",
    x: 40,
    y: 40,
    primary: false,
    startIndex: 5,
  },
  {
    id: "hr",
    label: "HR & Recruitment",
    icon: Users,
    color: "var(--color-accent)",
    x: 75,
    y: 15,
    primary: false,
    startIndex: 29,
  },
  {
    id: "stock",
    label: "Stock",
    icon: Boxes,
    color: "var(--color-chart-2)",
    x: 70,
    y: 78,
    primary: false,
    startIndex: 17,
  },
];

export const PRIMARIES = AREAS.filter((a) => a.primary);
export const SECONDARIES = AREAS.filter((a) => !a.primary);

/* ─── Connections — arranged so no lines cross ─── */
export const CONNECTIONS: [string, string][] = [
  // Primary chain
  ["sales", "marketing"],
  ["sales", "customerSuccess"],
  ["finance", "operations"],
  ["bookings", "customerSuccess"],
  ["operations", "customerSuccess"],
  ["operations", "stock"],
  // Secondary → nearest primaries
  ["management", "hr"],
  ["management", "customerSuccess"],
  ["hr", "operations"],
  ["stock", "finance"],
];

/* ─── Dashed connections (white, no gradient) ─── */
export const DASHED_CONNECTIONS: [string, string][] = [
  ["bookings", "sales"],
  ["hr", "marketing"],
  ["hr", "finance"],
  ["management", "marketing"],
  ["management", "operations"],
  ["management", "sales"],
  ["customerSuccess", "stock"],
];

export function getPos(id: string) {
  const a = AREAS.find((a) => a.id === id);
  return a ? { x: a.x, y: a.y } : { x: 50, y: 50 };
}

export function getColor(id: string) {
  const a = AREAS.find((a) => a.id === id);
  return a?.color ?? "var(--color-muted)";
}
