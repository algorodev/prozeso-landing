import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  BriefcaseBusiness,
  CalendarCheck,
  HeadsetIcon,
  Landmark,
  LifeBuoy,
  Lightbulb,
  Megaphone,
  Scale,
  Server,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

export type AreaNode = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  startIndex: number;
};

export const AREAS: AreaNode[] = [
  {
    id: "customerService",
    label: "Customer Service",
    icon: LifeBuoy,
    color: "var(--color-primary)",
    startIndex: 1,
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: CalendarCheck,
    color: "var(--color-primary)",
    startIndex: 2,
  },
  {
    id: "customerSuccess",
    label: "Customer Success",
    icon: HeadsetIcon,
    color: "var(--color-primary)",
    startIndex: 5,
  },
  {
    id: "sales",
    label: "Sales",
    icon: TrendingUp,
    color: "var(--color-secondary)",
    startIndex: 9,
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    color: "var(--color-secondary)",
    startIndex: 13,
  },
  {
    id: "product",
    label: "Product",
    icon: Lightbulb,
    color: "var(--color-secondary)",
    startIndex: 1,
  },
  {
    id: "operations",
    label: "Operations",
    icon: Settings,
    color: "var(--color-chart-2)",
    startIndex: 17,
  },
  {
    id: "stock",
    label: "Inventory",
    icon: Boxes,
    color: "var(--color-chart-2)",
    startIndex: 21,
  },
  {
    id: "it",
    label: "IT",
    icon: Server,
    color: "var(--color-chart-2)",
    startIndex: 1,
  },
  {
    id: "finance",
    label: "Finance",
    icon: Landmark,
    color: "var(--color-accent)",
    startIndex: 25,
  },
  {
    id: "hr",
    label: "HR & Recruitment",
    icon: Users,
    color: "var(--color-accent)",
    startIndex: 29,
  },
  {
    id: "legal",
    label: "Legal",
    icon: Scale,
    color: "var(--color-accent)",
    startIndex: 1,
  },
  {
    id: "management",
    label: "Management",
    icon: BriefcaseBusiness,
    color: "var(--color-accent)",
    startIndex: 1,
  },
];

export type ColorGroup = {
  id: string;
  color: string;
  areaIds: string[];
};

export const COLOR_GROUPS: ColorGroup[] = [
  {
    id: "clientFacing",
    color: "var(--color-primary)",
    areaIds: ["customerService", "bookings", "customerSuccess"],
  },
  {
    id: "revenueGrowth",
    color: "var(--color-secondary)",
    areaIds: ["sales", "marketing", "product"],
  },
  {
    id: "backendOps",
    color: "var(--color-chart-2)",
    areaIds: ["operations", "stock", "it"],
  },
  {
    id: "corporateSupport",
    color: "var(--color-accent)",
    areaIds: ["finance", "hr", "legal", "management"],
  },
];
