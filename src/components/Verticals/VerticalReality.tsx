'use client'

import { Check, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { VERTICALS } from '@/data/verticals'
import { useTranslations } from 'next-intl'

export function VerticalReality() {
  const params = useParams<{ id: string }>()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const vertical = id ? VERTICALS[id as keyof typeof VERTICALS] : undefined
  const problems = vertical?.problems ?? []
  const solution = vertical?.solution ?? []
  const t = useTranslations()

  return (
    <section className='py-24 px-6 border-t border-border'>
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-2 gap-16'>
          <div>
            <h2 className='font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-8'>
              {t.rich('verticals.page.reality.leftTitle', {
                muted: (chunks) => <span className='text-muted-foreground/50'>{chunks}</span>,
              })}
            </h2>
            <div className='space-y-4'>
              {problems.map((problem, idx) => (
                <div key={idx} className='space-y-3'>
                  <h3 className='font-bold text-lg'>
                    {id && t.has(`verticals.${id}.problems.${idx}.title`)
                      ? (t(`verticals.${id}.problems.${idx}.title`) as string)
                      : problem.title}
                  </h3>
                  <ul className='space-y-2'>
                    {problem.items.map((item, i) => (
                      <li key={i} className='flex items-start gap-3 text-muted-foreground'>
                        <div className='w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center mt-1 flex-shrink-0'>
                          <X className='w-3 h-3 text-red-500' />
                        </div>
                        <span className='text-sm leading-relaxed'>
                          {id && t.has(`verticals.${id}.problems.${idx}.items.${i}`)
                            ? (t(`verticals.${id}.problems.${idx}.items.${i}`) as string)
                            : item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className='font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-8'>
              {t.rich('verticals.page.reality.rightTitle', {
                brand: (chunks) => <span className='text-primary'>{chunks}</span>,
              })}
            </h2>
            <div className='space-y-4'>
              {solution.map((item, idx) => (
                <div key={idx} className='flex items-start gap-4'>
                  <div className='w-6 h-6 rounded-full bg-chart-2/20 flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <Check className='w-4 h-4 text-chart-2' />
                  </div>
                  <div>
                    <h3 className='font-bold text-base mb-1'>
                      {id && t.has(`verticals.${id}.solution.${idx}.title`)
                        ? (t(`verticals.${id}.solution.${idx}.title`) as string)
                        : item.title}
                    </h3>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                      {id && t.has(`verticals.${id}.solution.${idx}.description`)
                        ? (t(`verticals.${id}.solution.${idx}.description`) as string)
                        : item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VerticalReality
