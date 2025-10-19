"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, TrendingUp, Workflow } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const StatsBlock = () => {
	const stats = [
		{
			icon: Workflow,
			value: "120+",
			label: "Active client automations",
			desc: "Each workflow tailored and monitored for performance.",
		},
		{
			icon: TrendingUp,
			value: "3.2M+",
			label: "Tasks executed monthly",
			desc: "Reliably processed across all connected platforms.",
		},
		{
			icon: Clock,
			value: "12,000h",
			label: "Hours saved per year",
			desc: "Through reduced manual input and automated reporting.",
		},
		{
			icon: CheckCircle2,
			value: "99.97%",
			label: "Execution success rate",
			desc: "Proactive monitoring ensures uptime and reliability.",
		},
	];

	return (
		<section className="relative overflow-x-clip">
			<div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.5 }}
					className="mx-auto max-w-3xl text-center"
				>
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
						Real results from real automation
					</h2>
					<p className="mt-3 text-muted-foreground">
						Our clients transform operations by automating what used to take
						hours into tasks that run while they sleep.
					</p>
				</motion.div>
				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.3 }}
					variants={{
						hidden: { opacity: 0 },
						show: { opacity: 1, transition: { staggerChildren: 0.08 } },
					}}
					className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
				>
					{stats.map(({ icon: Icon, value, label, desc }) => (
						<motion.div
							key={label}
							variants={{
								hidden: { opacity: 0, y: 12 },
								show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
							}}
						>
							<Card className="h-full border-none bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-lg transition-shadow">
								<CardHeader className="flex flex-row items-center gap-3">
									<div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
										<Icon className="size-5" />
									</div>
									<CardTitle className="text-2xl font-bold">{value}</CardTitle>
								</CardHeader>
								<CardContent className="pt-0 text-sm">
									<p className="font-medium">{label}</p>
									<p className="text-muted-foreground mt-1">{desc}</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}

export default StatsBlock;
