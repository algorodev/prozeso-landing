"use client";

import { useState } from "react";
import PricingTierCard, {
	type Tier,
} from "./PricingTierCard";
import ComparisonTable from "./ComparisonTable";
import FAQ from "./FAQ";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";

export default function PricingSection({
	automationId,
}: {
	automationId: string;
}) {
	const [yearly, setYearly] = useState(true);

	const tiers: Tier[] = [
		{
			id: "starter",
			name: "Starter",
			badge: null,
			description:
				"Get your first workflow for this automation live with monitoring.",
			priceMonthly: 39,
			priceYearly: 29,
			ctaHref: `/start?automation=${automationId}&plan=starter`,
			features: [
				"1 active workflow",
				"1,000 tasks / month",
				"Live dashboard",
				"Email support",
			],
			limitations: ["No SSO", "No on-call alerts"],
			popular: false,
		},
		{
			id: "growth",
			name: "Growth",
			badge: "Most popular",
			description: "Scale this automation with alerts and SLAs.",
			priceMonthly: 129,
			priceYearly: 99,
			ctaHref: `/start?automation=${automationId}&plan=growth`,
			features: [
				"Up to 5 active workflows",
				"10,000 tasks / month",
				"Live dashboard & logs",
				"Slack / Email alerts",
				"Runbook reviews",
				"Priority support (24h)",
			],
			limitations: ["No SSO", "No VPC peering"],
			popular: true,
		},
		{
			id: "scale",
			name: "Scale",
			badge: "For teams",
			description:
				"Advanced security, SLAs, and higher volumes for this automation.",
			priceMonthly: 349,
			priceYearly: 279,
			ctaHref: `/start?automation=${automationId}&plan=scale`,
			features: [
				"Unlimited workflows",
				"75,000 tasks / month",
				"Custom metrics & traces",
				"On-call alerts & rota",
				"SSO (SAML / OIDC)",
				"DPA & data residency options",
				"Priority support (4h)",
			],
			limitations: [],
			popular: false,
		},
	];

	return (
		<section aria-labelledby="pricing" className="relative">
			<div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16">
				<div className="mb-6">
					<h2
						id="pricing"
						className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
					>
						Pricing for this automation
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Start small, scale as your usage grows. Switch plans any time.
					</p>
					<div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-muted p-1 ring-1 ring-border">
						<Button
							variant={yearly ? "ghost" : "inverse"}
							size="sm"
							className="rounded-lg"
							onClick={() => setYearly(false)}
						>
							Monthly
						</Button>
						<Button
							variant={yearly ? "inverse" : "ghost"}
							size="sm"
							className="rounded-lg"
							onClick={() => setYearly(true)}
						>
							Yearly
							<Badge variant="secondary" className="ml-2">
								Save ~20%
							</Badge>
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{tiers.map((tier) => (
						<PricingTierCard key={tier.id} tier={tier} yearly={yearly} />
					))}
				</div>
				<p className="mt-6 text-xs text-muted-foreground">
					Prices in EUR. Taxes may apply.
				</p>

				<Separator className="my-10" />
				<ComparisonTable />
				<Separator className="my-10" />
				<FAQ />
			</div>
		</section>
	);
}
