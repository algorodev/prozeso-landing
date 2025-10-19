import {
	BarChart3,
	CalendarCheck2,
	Database,
	Mail,
	MessageSquare,
	ShoppingCart,
	Zap,
} from "lucide-react";

export type Automation = {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	categories: (
		| "CRM"
		| "E-commerce"
		| "Marketing"
		| "Ops"
		| "Finance"
		| "Support"
	)[];
	integrations: string[];
	estTimeSaved: string;
	roi: "High" | "Medium" | "Low";
	href: string;
};

export const AUTOMATIONS: Automation[] = [
	{
		id: "lead-enrichment",
		title: "Lead enrichment & routing",
		description:
			"Enrich new leads from forms or ads and auto-route them to the right owner with SLAs.",
		icon: Zap,
		categories: ["CRM", "Marketing"],
		integrations: ["HubSpot", "Google Sheets", "Resend"],
		estTimeSaved: "6h/week",
		roi: "High",
		href: "/automations/lead-enrichment",
	},
	{
		id: "abandoned-cart",
		title: "Abandoned cart recovery",
		description:
			"Detect checkout drop-offs and trigger personalized emails or SMS with live inventory checks.",
		icon: ShoppingCart,
		categories: ["E-commerce", "Marketing"],
		integrations: ["Stripe", "Shopify", "Resend"],
		estTimeSaved: "3h/week",
		roi: "High",
		href: "/automations/abandoned-cart",
	},
	{
		id: "weekly-reporting",
		title: "Automated weekly reporting",
		description:
			"Aggregate KPIs and deliver PDF/CSV reports to stakeholders automatically every Monday at 9am.",
		icon: BarChart3,
		categories: ["Ops", "Finance"],
		integrations: ["PostgreSQL", "BigQuery", "Google Drive"],
		estTimeSaved: "8h/week",
		roi: "Medium",
		href: "/automations/weekly-reporting",
	},
	{
		id: "inbox-triage",
		title: "Customer inbox triage",
		description:
			"Classify, prioritize, and route inbound messages automatically. Acknowledge and tag important ones.",
		icon: Mail,
		categories: ["Support", "Ops"],
		integrations: ["Gmail", "Zendesk"],
		estTimeSaved: "5h/week",
		roi: "Medium",
		href: "/automations/inbox-triage",
	},
	{
		id: "billing-sync",
		title: "Billing → CRM sync",
		description:
			"Mirror invoices, payments, and status from billing into CRM with retries and notifications.",
		icon: Database,
		categories: ["Finance", "CRM"],
		integrations: ["Stripe", "HubSpot"],
		estTimeSaved: "4h/week",
		roi: "High",
		href: "/automations/billing-sync",
	},
	{
		id: "calendar-booking",
		title: "Calendar booking follow-ups",
		description:
			"Send reminders, collect meeting notes, and create follow-up tasks automatically post-meeting.",
		icon: CalendarCheck2,
		categories: ["Ops", "Marketing"],
		integrations: ["Google Calendar", "Resend", "Notion"],
		estTimeSaved: "2h/week",
		roi: "Low",
		href: "/automations/calendar-followups",
	},
	{
		id: "slack-alerts",
		title: "Slack anomaly alerts",
		description:
			"Monitor key metrics and alert the right Slack channels when unusual spikes or drops occur.",
		icon: MessageSquare,
		categories: ["Ops"],
		integrations: ["Slack", "PostgreSQL"],
		estTimeSaved: "—",
		roi: "Medium",
		href: "/automations/slack-alerts",
	},
];

export const ALL_CATEGORIES = [
	"CRM",
	"E-commerce",
	"Marketing",
	"Ops",
	"Finance",
	"Support",
] as const;

export const SORTS = ["Popularity", "ROI", "Newest"] as const;

export type SortKey = (typeof SORTS)[number];

export function scoreROI(roi: Automation["roi"]) {
	return roi === "High" ? 3 : roi === "Medium" ? 2 : 1;
}
