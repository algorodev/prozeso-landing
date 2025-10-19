import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PhoneCall, ClipboardList, Rocket } from "lucide-react";

const items = [
	{
		icon: ClipboardList,
		title: "Quick introduction",
		desc: "Tell us what you’re looking for and what you want to achieve.",
	},
	{
		icon: PhoneCall,
		title: "Discovery call",
		desc: "We align on goals and sketch your personalized plan together.",
	},
	{
		icon: Rocket,
		title: "Your journey begins",
		desc: "We set everything up and guide you step by step.",
	},
];

export function Steps() {
	return (
		<section className="py-10">
			<div className="container mx-auto px-4 max-w-5xl">
				<div className="grid gap-4 md:grid-cols-3">
					{items.map(({ icon: Icon, title, desc }) => (
						<Card key={title} className="border">
							<CardHeader className="flex flex-row items-center gap-3">
								<div className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
									<Icon className="size-5" />
								</div>
								<CardTitle className="text-base sm:text-lg">
									{title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">{desc}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
