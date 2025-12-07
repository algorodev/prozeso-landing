'use client'

import { Calendar, MessageSquare, Shield, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const Understanding = () => {
	return (
		<section className='py-24 px-6'>
			<div className='container mx-auto'>
				<motion.h2
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2 }}
					transition={{ duration: 0.6 }}
					className='font-sora text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6 text-balance'
				>
					From understanding to
					<br/>
					<span className='text-primary'>intelligent automation</span>
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2 }}
					transition={{ delay: 0.05, duration: 0.6 }}
					className='text-lg text-muted-foreground mb-16 max-w-xl font-normal'
				>
					How we transform data into real impact.
				</motion.p>
				<motion.div
					initial='hidden'
					whileInView='show'
					viewport={{ amount: 0.2 }}
					variants={{
						hidden: { opacity: 1 },
						show: {
							transition: { staggerChildren: 0.08 },
						},
					}}
					className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'
				>
					{[
						{
							icon: MessageSquare,
							title: 'Turn conversations into real knowledge',
							description:
								'Analyze calls and messages to detect patterns. Understand what happens and where value is lost.',
							tag: 'Analysis',
							tagColor: 'accent',
						},
						{
							icon: TrendingUp,
							title: 'Transform data into actionable decisions',
							description:
								'Visualize key metrics and detect time, quality, and money leaks. Drive efficiency and profitability.',
							tag: 'Reporting',
							tagColor: 'accent',
						},
						{
							icon: Calendar,
							title: 'Scale efficiency with conversational AI',
							description: 'Automate calls, information, and bookings to free up time and increase sales 24/7.',
							tag: 'Automation',
							tagColor: 'accent',
						},
						{
							icon: Shield,
							title: 'GDPR compliant with enterprise security',
							description:
								'End-to-end encrypted infrastructure to keep your business and your customers\' data private.',
							tag: 'Security',
							tagColor: 'accent',
						},
					].map((feature, idx) => {
						const Icon = feature.icon
						return (
							<motion.div
								key={idx}
								variants={{
									hidden: { opacity: 0, y: 20 },
									show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
								}}
								className='group flex flex-col h-full'
							>
								<div
									className={`transition-all duration-300 bg-card border border-transparent hover:border-accent rounded-2xl aspect-[4/3] flex items-center justify-center mb-6 relative overflow-hidden`}
								>
									<div
										className='w-20 h-20 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-125'>
										<Icon className='w-10 h-10 text-white' strokeWidth={1.5}/>
									</div>
								</div>
								<h3 className='font-sora font-semibold text-lg mb-2 leading-snug'>{feature.title}</h3>
								<p className='text-sm text-muted-foreground mb-4 leading-relaxed font-normal'>
									{feature.description}
								</p>
								<span
									className='inline-block w-fit mt-auto px-3 py-1 rounded-full text-xs font-medium border bg-accent/10 text-accent border-accent/20'
								>
                  {feature.tag}
                </span>
							</motion.div>
						)
					})}
				</motion.div>
			</div>
		</section>
	)
}

export default Understanding
