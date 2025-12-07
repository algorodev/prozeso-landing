'use client'

import { Button } from '@/components/ui/Button'
import { LocalizedLink } from '@/i18n/LocalizedLink'
import { motion } from 'framer-motion'

const IndustryDirectAccess = () => {
	return (
		<section className='py-24 px-6 border-t border-border'>
			<div className='container mx-auto'>
				<motion.h2
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2 }}
					transition={{ duration: 0.6 }}
					className='font-sora text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6 text-balance'
				>
					Built for your <span className='text-secondary'>industry</span>
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2 }}
					transition={{ delay: 0.05, duration: 0.6 }}
					className='text-lg text-muted-foreground mb-12 max-w-xl font-normal'
				>
					Tailored solutions for service businesses.
				</motion.p>

				<motion.div
					initial='hidden'
					whileInView='show'
					viewport={{ amount: 0.2 }}
					variants={{ hidden: { opacity: 1 }, show: { transition: { staggerChildren: 0.06 } } }}
					className='flex flex-wrap gap-3'
				>
					{[
						{ name: 'Hair & Beauty', href: '/verticals/hair-and-beauty' },
						{ name: 'Restaurants', href: '/verticals/restaurants' },
						{ name: 'Clinics & Health', href: '/verticals/clinics-and-health' },
						{ name: 'Hotels', href: '/verticals/hotels' },
						{ name: 'Real Estate', href: '/verticals/real-estate' },
					].map((vertical) => (
						<motion.div
							key={vertical.href}
							variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
						>
							<Button asChild variant='outline'>
								<LocalizedLink href={vertical.href}>
									{vertical.name}
								</LocalizedLink>
							</Button>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}

export default IndustryDirectAccess
