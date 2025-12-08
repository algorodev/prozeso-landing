'use client'

import { Check } from 'lucide-react'
import { useAutomationFromParams } from './useAutomationFromParams'

export function AutomationExamples() {
  const { automation } = useAutomationFromParams()
  if (!automation || !automation.examples || automation.examples.length === 0) return null

  return (
    <section className='py-24 px-6 border-t border-border'>
      <div className='container mx-auto'>
        <h2 className='font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-12'>
          Real-world <span className='text-accent'>examples</span>
        </h2>
        <div className='grid md:grid-cols-2 gap-6'>
          {automation.examples.map((ex: any, idx: number) => (
            <div key={idx} className='rounded-3xl border border-border bg-card p-6 flex flex-col gap-3'>
              <h3 className='font-semibold text-lg'>{ex.title}</h3>
              <p className='text-sm text-muted-foreground leading-relaxed'>{ex.scenario}</p>
              {ex.result && (
                <div className='mt-2 inline-flex items-center gap-2 rounded-xl bg-chart-2/10 px-4 py-2 text-sm'>
                  <Check className='w-4 h-4 text-chart-2 shrink-0' />
                  <span>{ex.result}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
