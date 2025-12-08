'use client'

import { useAutomationFromParams } from './useAutomationFromParams'

export function AutomationProblemSolution() {
  const { automation } = useAutomationFromParams()
  if (!automation) return null

  return (
    <section className='py-24 px-6 border-t border-border'>
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-2 gap-16'>
          <div>
            <p className='text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide'>The Problem</p>
            <p className='text-xl md:text-2xl leading-relaxed'>{automation.problem}</p>
          </div>
          <div>
            <p className='text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide'>The Solution</p>
            <p className='text-xl md:text-2xl leading-relaxed'>{automation.solution}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
