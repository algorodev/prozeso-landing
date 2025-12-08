'use client'

import { useAutomationFromParams } from './useAutomationFromParams'
import { useTranslations } from 'next-intl'

export function AutomationMetrics() {
  const { automation, id } = useAutomationFromParams()
  if (!automation || !automation.metrics?.length) return null
  const t = useTranslations(`automations.details.${id}`)

  return (
    <section className='py-24 px-6'>
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-3 gap-6'>
          {automation.metrics.map((metric: any, idx: number) => {
            const colors = ['text-chart-2', 'text-accent', 'text-primary']
            const bgColors = ['bg-chart-2/5', 'bg-accent/5', 'bg-primary/5']
            return (
              <div key={idx} className={`${bgColors[idx % bgColors.length]} rounded-3xl p-8 text-center`}>
                <div className='flex items-baseline justify-center mb-4'>
                  <span className={`text-7xl md:text-8xl font-extralight tracking-tighter ${colors[idx % colors.length]}`}>
                    {metric.stat}
                  </span>
                  {metric.suffix && (
                    <span className={`text-3xl md:text-4xl font-extralight ml-1 ${colors[idx % colors.length]}`}>
                      {metric.suffix}
                    </span>
                  )}
                </div>
                <p className='text-sm text-muted-foreground'>{t(`metrics.${idx}.description`, { default: metric.description })}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
