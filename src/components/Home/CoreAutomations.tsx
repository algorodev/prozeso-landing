'use client'

import { Button } from '@/components/ui/Button'
import { LocalizedLink } from '@/i18n/LocalizedLink'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const CoreAutomations = () => {
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
					Core <span className='text-chart-2'>automations</span>
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2 }}
					transition={{ delay: 0.05, duration: 0.6 }}
					className='text-lg text-muted-foreground mb-12 max-w-xl font-normal'
				>
					AI-powered workflows that work while you sleep.
				</motion.p>
				<motion.div
					initial='hidden'
					whileInView='show'
					viewport={{ amount: 0.2 }}
					variants={{ hidden: { opacity: 1 }, show: { transition: { staggerChildren: 0.08 } } }}
					className='grid md:grid-cols-3 gap-6'
				>
					{[
						{
							title: 'AI Receptionist',
							description: 'Answers calls 24/7, books appointments, handles FAQs in any language.',
							href: '/automations/receptionist-in-a-box',
						},
						{
							title: 'Smart Reminders',
							description: 'SMS/WhatsApp reminders that auto-reschedule when customers need flexibility.',
							href: '/automations/appointment-reminders-smart-reschedule',
						},
						{
							title: 'Missed Call Callback',
							description: 'Never lose a call again. AI calls back automatically to book the appointment.',
							href: '/automations/missed-call-auto-callback',
						},
					].map((automation, idx) => (
						<motion.div
							key={idx}
							variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
						>
							<LocalizedLink href={automation.href}>
								<div
									className='group h-full p-6 rounded-2xl border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer'>
									<h3 className='font-sora text-lg font-semibold mb-3 group-hover:text-primary transition-colors'>
										{automation.title}
									</h3>
									<p className='text-sm text-muted-foreground leading-relaxed mb-6 font-normal'>
										{automation.description}
									</p>
									<span
										className='text-sm font-medium flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors'>
                        Learn more <ArrowRight className='w-4 h-4'/>
                      </span>
								</div>
							</LocalizedLink>
						</motion.div>
					))}
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2 }}
					transition={{ delay: 0.05, duration: 0.6 }}
					className='mt-12 text-center'
				>
					<Button asChild variant='outline'>
						<LocalizedLink href='/automations'>
							View all automations
						</LocalizedLink>
					</Button>
				</motion.div>
			</div>
		</section>
	)
}

export default CoreAutomations
