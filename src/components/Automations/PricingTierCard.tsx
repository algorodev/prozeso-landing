"use client";

import { LocalizedLink } from '@/i18n/LocalizedLink'
import { Check, Minus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export type Tier = {
	id: "starter" | "growth" | "scale";
	name: string;
	badge: string | null;
	description: string;
	priceMonthly: number;
	priceYearly: number;
	ctaHref: string;
	features: string[];
	limitations: string[];
	popular?: boolean;
};

export default function PricingTierCard({
	tier,
	yearly,
}: {
	tier: Tier;
	yearly: boolean;
}) {
	const price = yearly ? tier.priceYearly : tier.priceMonthly;

	return (
		<Card className={`h-full ${tier.popular ? "ring-1 ring-[--accent]" : ""}`}>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-xl">{tier.name}</CardTitle>
					{tier.badge && (
						<Badge variant="secondary" className="rounded-lg">
							{tier.badge}
						</Badge>
					)}
				</div>
				<div className="mt-2 text-sm text-muted-foreground">
					{tier.description}
				</div>
				<div className="mt-4 flex items-baseline gap-1">
					<div className="text-4xl font-bold">€{price}</div>
					<div className="text-sm text-muted-foreground">
						/ {yearly ? "mo (billed yearly)" : "mo"}
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<ul className="space-y-2 text-sm">
					{tier.features.map((f) => (
						<li key={f} className="flex items-start gap-2">
							<Check className="mt-0.5 size-4 text-[--primary]" />
							<span>{f}</span>
						</li>
					))}
					{tier.limitations.length > 0 && (
						<li className="pt-2 text-muted-foreground">
							<div className="flex items-start gap-2">
								<Minus className="mt-0.5 size-4" />
								<span>Limitations:</span>
							</div>
							<ul className="mt-1 ml-6 list-disc space-y-1">
								{tier.limitations.map((l) => (
									<li key={l}>{l}</li>
								))}
							</ul>
						</li>
					)}
				</ul>
				<div className="mt-6">
					<Button
						asChild
						size="lg"
						variant={tier.id === "growth" ? "primary" : "accent"}
						className="w-full"
					>
						<LocalizedLink href={tier.ctaHref}>
							{tier.id === "scale" ? "Contact sales" : "Start free assessment"}
						</LocalizedLink>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
