'use client'

import { Button } from '@/components/ui/Button'
import { LocalizedLink } from '@/i18n/LocalizedLink'
import { ArrowRight, Phone } from 'lucide-react'
import { useAutomationFromParams } from './useAutomationFromParams'

export function AutomationCTA() {
  const { automation } = useAutomationFromParams()
  if (!automation) return null

  return (
    <section className='relative py-32 px-6 border-t border-border overflow-hidden bg-background text-foreground'>
      <div className='container mx-auto text-center max-w-2xl relative z-10'>
        <h2 className='font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-balance'>
          Ready to get <span className='text-primary'>started</span>?
        </h2>
        <p className='text-lg text-muted-foreground mb-12 leading-relaxed'>
          See how {automation.name} can transform your business. Free assessment, no credit card required.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild size='lg'>
            <LocalizedLink href='/start'>
              <Phone className='w-5 h-5' />
              Talk to us
            </LocalizedLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
