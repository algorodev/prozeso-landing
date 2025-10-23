import { CalendarClock, PhoneForwarded, PhoneMissed } from "lucide-react";
import type { ComponentType } from "react";

export type Automation = {
  id: string;
  icon: ComponentType<{ className?: string }>;
};

export const AUTOMATIONS: Automation[] = [
  {
    id: "receptionist-in-a-box",
    icon: PhoneForwarded,
  },
  {
    id: "missed-call-auto-callback",
    icon: PhoneMissed,
  },
  {
    id: "appointment-reminders-smart-reschedule",
    icon: CalendarClock,
  },
];

export const ALL_CATEGORIES = [
	"bookings",
	"communication",
	"automation",
	"calls",
	"leadRecovery",
	"scheduling",
	"clientRetention",
] as const;

export const SORTS = ["Popularity", "ROI", "Newest"] as const;

export type SortKey = (typeof SORTS)[number];
