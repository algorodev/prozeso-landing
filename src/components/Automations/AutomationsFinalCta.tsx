"use client"

import { Button } from '@/components/ui/Button'
import { LocalizedLink } from '@/i18n/LocalizedLink'
import { ArrowRight, Phone } from 'lucide-react'

export default function AutomationsFinalCta() {
  return (
    <section className='relative py-24 px-6 border-t border-border overflow-hidden'>
      <div className='container mx-auto text-center max-w-2xl relative z-10'>
        <h2 className='font-sora text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-balance'>
          Need <span className='text-primary'>guidance</span>?
        </h2>
        <p className='text-lg text-foreground/70 mb-12 leading-relaxed'>
          Our AI-powered assessment will recommend the automations that deliver the most impact for your business.
        </p>
        <Button asChild size='lg'>
	        <LocalizedLink href='/start'>
		        <Phone className='w-5 h-5'/>
		        Start free assessment
	        </LocalizedLink>
        </Button>
      </div>
    </section>
  )
}
