'use client'

import { Button } from '@/components/ui/Button'
import { LocalizedLink } from '@/i18n/LocalizedLink'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const IndustryDirectAccess = () => {
	const t = useTranslations('home.industryDirectAccess')
	const v = useTranslations('solutions.verticals')

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
					{t.rich('title', {
						highlight: (chunks) => <span className='text-secondary'>{chunks}</span>,
					})}
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2 }}
					transition={{ delay: 0.05, duration: 0.6 }}
					className='text-lg text-muted-foreground mb-12 max-w-xl font-normal'
				>
					{t('subtitle')}
				</motion.p>
				<motion.div
					initial='hidden'
					whileInView='show'
					viewport={{ amount: 0.2 }}
					variants={{ hidden: { opacity: 1 }, show: { transition: { staggerChildren: 0.06 } } }}
					className='flex flex-wrap gap-3'
				>
					{[
						{ id: 'beauty', href: '/verticals/hair-and-beauty' },
						{ id: 'restaurants', href: '/verticals/restaurants' },
						{ id: 'clinics', href: '/verticals/clinics-and-health' },
						{ id: 'hotels', href: '/verticals/hotels' },
						{ id: 'realEstate', href: '/verticals/real-estate' },
					].map((vertical) => (
						<motion.div
							key={vertical.href}
							variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
						>
							<Button asChild variant='outline'>
								<LocalizedLink href={vertical.href}>
									{v(`${vertical.id}.title`)}
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
