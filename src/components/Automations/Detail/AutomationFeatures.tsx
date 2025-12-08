'use client'

import { useAutomationFromParams } from './useAutomationFromParams'

export function AutomationFeatures() {
  const { automation } = useAutomationFromParams()
  if (!automation || !automation.features?.length) return null

  return (
    <section className='py-24 px-6 bg-card'>
      <div className='container mx-auto'>
        <h2 className='font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-12'>Core features</h2>
        <div className='grid md:grid-cols-2 gap-x-16 gap-y-10'>
          {automation.features.map((feature: any, idx: number) => (
            <div key={idx}>
              <h3 className='font-bold mb-2'>{feature.title}</h3>
              <p className='text-muted-foreground leading-relaxed'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
