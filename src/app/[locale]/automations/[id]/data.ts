import { CheckCircle, Clock, PhoneIncoming, TrendingDown, TrendingUp, Zap } from 'lucide-react'
import { type ComponentType } from 'react'

export type Stat = {
	id: string;
	label: string;
	value: number;
	suffix: string;
	target: number;
	direction: "up" | "down" | "neutral";
	palette: "primary" | "accent" | "muted";
	spark: number[];
	icon: ComponentType<{ className?: string }>;
};

const receptionistInABox: Stat[] = [
	{
		id: "timeSaved",
		label: "metrics.timeSaved",
		value: 10,
		suffix: "h/mo",
		target: 10,
		direction: "up",
		palette: "accent",
		spark: [0.25, 0.35, 0.45, 0.6, 0.7, 0.85, 1],
		icon: Clock,
	},
	{
		id: "bookingLift",
		label: "metrics.bookings",
		value: 35,
		suffix: "%",
		target: 45,
		direction: "up",
		palette: "accent",
		spark: [0.1, 0.22, 0.3, 0.38, 0.42, 0.5, 0.6],
		icon: TrendingUp,
	},
	{
		id: "noShowCut",
		label: "metrics.noShows",
		value: 30,
		suffix: "%",
		target: 30,
		direction: "down",
		palette: "accent",
		spark: [0.85, 0.78, 0.7, 0.6, 0.55, 0.5, 0.45],
		icon: TrendingDown,
	},
	{
		id: "confirmBoost",
		label: "metrics.confirmedBookings",
		value: 180,
		suffix: "%",
		target: 180,
		direction: "up",
		palette: "accent",
		spark: [0.2, 0.3, 0.45, 0.7, 0.9, 1, 1.05],
		icon: CheckCircle,
	},
];
const missedCallAutoCallback: Stat[] = [
	{
		id: "timeSaved",
		label: "metrics.timeSaved",
		value: 20,
		suffix: "h/mo",
		target: 20,
		direction: "up",
		palette: "accent",
		spark: [0.2, 0.35, 0.45, 0.6, 0.7, 0.85, 1],
		icon: Clock,
	},
	{
		id: "callsRecovered",
		label: "metrics.callsRecovered",
		value: 25,
		suffix: "%",
		target: 35,
		direction: "up",
		palette: "accent",
		spark: [0.1, 0.18, 0.25, 0.32, 0.4, 0.48, 0.55],
		icon: PhoneIncoming,
	},
	{
		id: "roiLift",
		label: "metrics.revenueLift",
		value: 20,
		suffix: "%",
		target: 35,
		direction: "up",
		palette: "accent",
		spark: [0.15, 0.25, 0.3, 0.4, 0.5, 0.55, 0.6],
		icon: TrendingUp,
	},
	{
		id: "efficiencyBoost",
		label: "metrics.efficiency",
		value: 40,
		suffix: "%",
		target: 50,
		direction: "up",
		palette: "accent",
		spark: [0.3, 0.4, 0.55, 0.65, 0.75, 0.9, 1],
		icon: Zap,
	},
];
const appointmentRemindersSmartReschedule: Stat[] = [
	{
		id: "timeSaved",
		label: "metrics.timeSaved",
		value: 8,
		suffix: "h/mo",
		target: 10,
		direction: "up",
		palette: "accent",
		spark: [0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
		icon: Clock,
	},
	{
		id: "bookingLift",
		label: "metrics.bookings",
		value: 35,
		suffix: "%",
		target: 45,
		direction: "up",
		palette: "accent",
		spark: [0.1, 0.2, 0.35, 0.42, 0.38, 0.5, 0.6],
		icon: TrendingUp,
	},
	{
		id: "noShowCut",
		label: "metrics.noShows",
		value: 40,
		suffix: "%",
		target: 40,
		direction: "down",
		palette: "accent",
		spark: [0.9, 0.8, 0.7, 0.6, 0.55, 0.5, 0.45],
		icon: TrendingDown,
	},
	{
		id: "cancelCut",
		label: "metrics.cancellations",
		value: 20,
		suffix: "%",
		target: 20,
		direction: "down",
		palette: "accent",
		spark: [0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3],
		icon: Zap,
	},
];

export const STATS: Record<string, Stat[]> = {
	"appointment-reminders-smart-reschedule": appointmentRemindersSmartReschedule,
	"missed-call-auto-callback": missedCallAutoCallback,
	"receptionist-in-a-box": receptionistInABox,
};
