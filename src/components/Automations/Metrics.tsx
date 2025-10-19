"use client";

import { Card, CardContent } from "@/components/ui/Card";
import type { AutomationDetail } from "@/app/[locale]/automations/[id]/data";

export default function Metrics({ detail }: { detail: AutomationDetail }) {
	return (
		<section className="relative">
			<div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
				<h2 className="text-xl font-semibold">Metrics</h2>
				<div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
					{detail.metrics.map((m) => (
						<Card key={m.label}>
							<CardContent className="p-4 text-center">
								<div className="text-lg font-semibold">{m.kpi}</div>
								<div className="text-xs text-muted-foreground">{m.label}</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
