'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

const FinalCTA = () => {
	return (
		<section className='relative py-32 px-6 border-t border-border overflow-hidden bg-background text-foreground'>
			<div className='container mx-auto text-center max-w-2xl relative z-10'>
				<motion.h2
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2 }}
					transition={{ duration: 0.6 }}
					className='font-sora text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-balance'
				>
					Ready to <span className='text-primary'>automate</span>?
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2 }}
					transition={{ delay: 0.05, duration: 0.6 }}
					className='text-lg text-foreground/70 mb-12 leading-relaxed'
				>
					Start your free assessment today. See exactly which automations will transform your business.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2 }}
					transition={{ delay: 0.1, duration: 0.5 }}
				>
					<Button size='lg'>
						<Phone className='w-5 h-5'/>
						Start Now
					</Button>
				</motion.div>
			</div>
		</section>
	)
}

export default FinalCTA
