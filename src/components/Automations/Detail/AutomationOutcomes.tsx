'use client'

import { Check } from 'lucide-react'
import { useAutomationFromParams } from './useAutomationFromParams'
import { useTranslations } from 'next-intl'

export function AutomationOutcomes() {
  const { automation, id } = useAutomationFromParams()
  if (!automation || !automation.outcomes?.length) return null
  const t = useTranslations(`automations.details.${id}`)
  const tc = useTranslations('automations.details.common')

  return (
    <section className='py-24 px-6 border-t border-border'>
      <div className='container mx-auto'>
        <h2 className='font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-12'>
          {tc.rich('whatYouGet', {
            primary: (chunks) => <span className='text-primary'>{chunks}</span>,
          })}
        </h2>
        <div className='space-y-5'>
          {automation.outcomes.map((outcome: string, idx: number) => (
            <div key={idx} className='flex items-start gap-4'>
              <div className='w-6 h-6 rounded-full bg-chart-2/20 flex items-center justify-center flex-shrink-0 mt-0.5'>
                <Check className='w-4 h-4 text-chart-2' />
              </div>
              <p className='text-lg'>{t(`outcomes.${idx}`, { default: outcome })}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
