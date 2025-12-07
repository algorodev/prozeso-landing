'use client'

import AutomationsBackground from '@/components/Automations/AutomationsBackground'

export default function AutomationsHero() {
	return (
		<section className='relative isolate overflow-hidden flex items-center py-32 sm:py-40'>
			<AutomationsBackground/>
			<div className='container mx-auto px-6 sm:px-8 relative z-10'>
				<div className='mx-auto text-center max-w-4xl'>
					<h1 className='hero-title mb-6 text-balance'>
						<span className='text-primary'>Automations</span> Library
					</h1>
					<p className='hero-subtitle text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
						AI-powered workflows designed for service businesses. Mix and match to create your perfect automation stack.
					</p>
				</div>
			</div>
		</section>
	)
}
