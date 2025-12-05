const Impact = () => {
	return (
		<section className="py-24 px-6">
			<div className="container mx-auto">
				<h2 className="font-sora text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6 text-balance">
					Conversations that
					<br />
					generate <span className="text-accent">real impact</span>
				</h2>
				<p className="text-lg text-muted-foreground mb-16 max-w-xl font-normal">
					We optimize every call and every interaction with natural voice AI.
				</p>

				<div className="grid md:grid-cols-3 gap-6">
					{[
						{
							number: "20",
							suffix: "%",
							title: "Incremental billing",
							description:
								"Direct revenue recovery by answering calls and messages that used to go unanswered, without hiring more staff.",
							quote:
								"In a dealership network, the system recovers unattended customers generating additional billing increase.",
							color: "accent",
						},
						{
							number: "10",
							suffix: "x",
							title: "Return on investment",
							description:
								"The project pays for itself in weeks thanks to operational savings, process automation, and recovered billing.",
							quote:
								"In a restaurant chain, the system cost is offset just with bookings managed outside business hours.",
							color: "secondary",
						},
						{
							number: "72",
							suffix: "%",
							title: "Resource savings",
							description:
								"Significant reduction in operational load thanks to complete automation of calls, messages, and bookings.",
							quote:
								"In a group of 15 salons, an AI agent handled over 5000 calls in a month, freeing up team time.",
							color: "primary",
						},
					].map((metric, idx) => (
						<div
							key={idx}
							className={`bg-card rounded-3xl p-8 flex flex-col justify-between min-h-[400px] border border-border transition-all ${
								metric.color === "primary"
									? "hover:border-primary/40"
									: metric.color === "secondary"
										? "hover:border-secondary/40"
										: "hover:border-accent/40"
							}`}
						>
							<div className="mb-auto">
								<div className="flex items-baseline">
                      <span
	                      className={`text-8xl md:text-9xl font-extralight tracking-tighter ${
		                      metric.color === "primary"
			                      ? "text-primary/40"
			                      : metric.color === "secondary"
				                      ? "text-secondary/40"
				                      : "text-accent/40"
	                      }`}
                      >
                        {metric.number}
                      </span>
									<span
										className={`text-4xl md:text-5xl font-extralight ml-1 ${
											metric.color === "primary"
												? "text-primary/40"
												: metric.color === "secondary"
													? "text-secondary/40"
													: "text-accent/40"
										}`}
									>
                        {metric.suffix}
                      </span>
								</div>
							</div>

							<div className="space-y-4">
								<h3 className="font-sora font-semibold text-xl">{metric.title}</h3>
								<p className="text-sm text-muted-foreground leading-relaxed font-normal">{metric.description}</p>

								<div
									className={`border-l-2 pl-4 mt-6 ${
										metric.color === "primary"
											? "border-primary/40"
											: metric.color === "secondary"
												? "border-secondary/40"
												: "border-accent/40"
									}`}
								>
									<p className="text-xs text-muted-foreground italic leading-relaxed font-normal">{metric.quote}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Impact
