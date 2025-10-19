"use client";

import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/i18n/LocalizedLink";

export function HeroDemo() {
	return (
		<section className="pt-20 pb-10 md:pt-24 md:pb-12">
			<div className="container mx-auto px-4 text-center max-w-3xl">
				<h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
					See the platform in action
				</h1>
				<p className="mt-4 text-muted-foreground">
					A quick walkthrough to understand the flow — from discovery to booking
					and follow-up.
				</p>
				<div className="mt-8 flex items-center justify-center gap-3">
					<Button size="lg" asChild>
						<LocalizedLink href="/start">
							Start your free assessment
						</LocalizedLink>
					</Button>
				</div>
			</div>
		</section>
	);
}
