'use client'

import HeroBackground from '@/components/Home/HeroBackground'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { LocalizedLink } from '@/i18n/LocalizedLink'

const Hero = () => {
	const t = useTranslations('hero')

	return (
		<section className='relative isolate min-h-dvh-minus-header overflow-hidden flex items-center'>
			<HeroBackground/>
			<div className='relative mx-auto max-w-7xl py-20 px-6 sm:px-8'>
				<div className='flex'>
					<div className='text-center lg:text-left lg:w-2/3'>
						<motion.h1
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ amount: 0.2 }}
							transition={{ delay: 0.05, duration: 0.6 }}
							className='hero-title'
						>
							{t.rich('title', {
								primary: (chunks) => (
									<span className='text-primary'>{chunks}</span>
								),
								secondary: (chunks) => (
									<span className='text-secondary'>{chunks}</span>
								),
							})}
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ amount: 0.2 }}
							transition={{ delay: 0.12, duration: 0.6 }}
							className='mt-6 text-balance hero-subtitle text-muted-foreground'
						>
							{t('subtitle')}
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ amount: 0.2 }}
							transition={{ delay: 0.2, duration: 0.6 }}
							className='mt-6 flex justify-center items-center gap-3 lg:justify-start'
						>
							<Button asChild size='lg'>
								<LocalizedLink href='/start'>
									<Phone className='mr-1 size-5'/>
									{t('ctaPrimary')}
								</LocalizedLink>
							</Button>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ amount: 0.2 }}
							transition={{ delay: 0.28, duration: 0.6 }}
							className='mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 caption-text text-muted-foreground lg:justify-start'
						>
							<span>{t('trialBadges.freeTrial')}</span>
							<span className='h-1 w-1 rounded-full bg-border'/>
							<span>{t('trialBadges.noCreditCard')}</span>
							<span className='h-1 w-1 rounded-full bg-border'/>
							<span>{t('trialBadges.cancelAnytime')}</span>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
