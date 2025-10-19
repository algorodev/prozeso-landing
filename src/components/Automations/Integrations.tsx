"use client";

import { Badge } from "@/components/ui/Badge";
import type { AutomationDetail } from "@/app/[locale]/automations/[id]/data";

export default function Integrations({ detail }: { detail: AutomationDetail }) {
	return (
		<section className="relative">
			<div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
				<h2 className="text-xl font-semibold">Integrations & stack</h2>
				<div className="mt-4 flex flex-wrap gap-2">
					{detail.stack.map((t) => (
						<Badge key={t} variant="secondary" className="rounded-lg">
							{t}
						</Badge>
					))}
				</div>
			</div>
		</section>
	);
}
