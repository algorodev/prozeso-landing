'use client'

import { ArrowUpRight } from 'lucide-react'
import { LocalizedLink } from '@/i18n/LocalizedLink'
import { useAutomationFromParams } from './useAutomationFromParams'

export function AutomationBestFor() {
  const { automation } = useAutomationFromParams()
  if (!automation || !automation.verticals?.length) return null

  return (
    <section className='py-24 px-6'>
      <div className='container mx-auto'>
        <h2 className='font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-8'>
          Best <span className='text-primary'>for</span>
        </h2>
        <div className='flex flex-wrap gap-3'>
          {automation.verticals.map((vertical: any) => (
            <LocalizedLink
              key={vertical.slug}
              href={`/verticals/${vertical.slug}`}
              className='group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-primary hover:bg-primary hover:text-white transition-all text-sm font-medium'
            >
              {vertical.name}
              <ArrowUpRight className='w-4 h-4 opacity-50 group-hover:opacity-100' />
            </LocalizedLink>
          ))}
        </div>
      </div>
    </section>
  )
}
