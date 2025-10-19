"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { AutomationDetail } from "@/app/[locale]/automations/[id]/data";

export default function ProblemSolution({
	detail,
}: {
	detail: AutomationDetail;
}) {
	return (
		<section className="relative">
			<div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Problem</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							{detail.problem}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Solution</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							{detail.solution}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
