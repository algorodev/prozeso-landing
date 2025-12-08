'use client'

import { Button } from '@/components/ui/Button'
import { LocalizedLink } from '@/i18n/LocalizedLink'
import { ArrowRight, Phone } from 'lucide-react'
import { useAutomationFromParams } from './useAutomationFromParams'
import AutomationHeroBackground from '@/components/Automations/AutomationHeroBackground'

export function AutomationHeroSection() {
  const { automation } = useAutomationFromParams()
  if (!automation) return null

  return (
    <section className='relative isolate min-h-[80vh] flex items-center justify-center px-6 pt-16 overflow-hidden'>
      <AutomationHeroBackground />
      <div className='relative z-10 text-center max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center'>
        <div className='text-left'>
          <p className='text-sm font-medium text-primary mb-6 tracking-wide uppercase border-b-2 border-primary inline-block pb-1'>
            {automation.name}
          </p>
          <h1 className='font-heading text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[0.95] text-balance mb-8'>
            {automation.headline}
          </h1>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed'>
            {automation.subheading}
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Button asChild size='lg'>
              <LocalizedLink href='/start'>
                <Phone className='w-5 h-5' />
                Talk to us
              </LocalizedLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
