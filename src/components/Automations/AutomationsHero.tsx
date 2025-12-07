'use client'

import AutomationsBackground from '@/components/Automations/AutomationsBackground'
import { useTranslations } from 'next-intl'

export default function AutomationsHero() {
	const t = useTranslations('automations.page.hero')
	return (
		<section className='relative isolate overflow-hidden flex items-center py-32 sm:py-40'>
			<AutomationsBackground/>
			<div className='container mx-auto px-6 sm:px-8 relative z-10'>
				<div className='mx-auto text-center max-w-4xl'>
					<h1 className='hero-title mb-6 text-balance'>
						{t.rich('title', {
							primary: (chunks) => <span className='text-primary'>{chunks}</span>,
						})}
					</h1>
					<p className='hero-subtitle text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
						{t('subtitle')}
					</p>
				</div>
			</div>
		</section>
	)
}
