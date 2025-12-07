'use client'

import { useParams } from 'next/navigation'
import { VERTICALS } from '@/data/verticals'

export function VerticalImpact() {
  const params = useParams<{ id: string }>()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const vertical = id ? VERTICALS[id as keyof typeof VERTICALS] : undefined
  const name = vertical?.name ?? ''
  const metrics = vertical?.metrics ?? []

  return (
    <section className='py-24 px-6'>
      <div className='container mx-auto'>
        <h2 className='font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-balance'>
          Impact for <span className='text-secondary'>{name}</span>
        </h2>
        <p className='text-lg text-muted-foreground mb-16 max-w-xl'>Real results from businesses like yours.</p>
        <div className='grid md:grid-cols-3 gap-6'>
          {metrics.map((metric, idx) => {
            const colors = ['border-chart-2', 'border-accent', 'border-primary']
            const textColors = ['text-chart-2', 'text-accent', 'text-primary']
            return (
              <div
                key={idx}
                className={`bg-card rounded-3xl p-8 flex flex-col justify-between min-h-[350px] border-l-4 ${colors[idx % colors.length]}`}
              >
                <div className='mb-auto'>
                  <div className='flex items-baseline'>
                    <span
                      className={`text-7xl md:text-8xl font-extralight tracking-tighter ${textColors[idx % textColors.length]}`}
                    >
                      {metric.stat}
                    </span>
                    {metric.suffix && (
                      <span className={`text-3xl md:text-4xl font-extralight ml-1 ${textColors[idx % textColors.length]}`}>
                        {metric.suffix}
                      </span>
                    )}
                  </div>
                </div>
                <div className='space-y-4'>
                  <p className='text-sm text-muted-foreground leading-relaxed'>{metric.description}</p>
                  {metric.quote && (
                    <div className={`border-l-2 pl-4 ${colors[idx % colors.length]}`}>
                      <p className='text-xs text-muted-foreground italic leading-relaxed'>{metric.quote}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default VerticalImpact
