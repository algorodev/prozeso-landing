'use client'

import { useParams } from 'next/navigation'
import { VERTICALS } from '@/data/verticals'

export function VerticalJourney() {
  const params = useParams<{ id: string }>()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const vertical = id ? VERTICALS[id as keyof typeof VERTICALS] : undefined
  const customer = vertical?.journey.customer ?? ''
  const steps = vertical?.journey.steps ?? []

  return (
    <section className='py-24 px-6'>
      <div className='container mx-auto'>
        <h2 className='font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-left'>
          Meet <span className='text-accent'>{customer}</span>
        </h2>
        <p className='text-left text-muted-foreground mb-16'>A day in the life with Prozeso:</p>
        <div className='space-y-0'>
          {steps.map((step, idx) => (
            <div key={idx} className='flex gap-6'>
              <div className='flex flex-col items-center'>
                <div className='w-10 h-10 rounded-full border-2 border-chart-2 text-chart-2 flex items-center justify-center flex-shrink-0 bg-background'>
                  <span className='text-sm font-bold'>{idx + 1}</span>
                </div>
                {idx < steps.length - 1 && <div className='w-px h-full bg-chart-2 min-h-[60px]' />}
              </div>
              <div className='pb-8'>
                <h3 className='font-bold text-base mb-2'>{step.stage}</h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VerticalJourney
