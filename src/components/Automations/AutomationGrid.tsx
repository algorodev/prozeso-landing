"use client";

import { Card, CardContent } from "@/components/ui/Card";
import type { Automation } from "@/app/[locale]/automations/data";
import AutomationCard from "./AutomationCard";

const AutomationGrid = ({ items }: { items: Automation[] }) => {
	return (
		<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{items.map((a) => (
				<AutomationCard key={a.id} a={a} />
			))}
			{items.length === 0 && (
				<Card className="col-span-full">
					<CardContent className="p-6 text-sm text-muted-foreground">
						No automations match your filters.
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default AutomationGrid;
