'use client'

import { useAutomationFromParams } from './useAutomationFromParams'

export function AutomationPoweredBy() {
  const { automation } = useAutomationFromParams()
  if (!automation || !automation.tools?.length) return null

  return (
    <section className='py-16 px-6 border-t border-border'>
      <div className='container mx-auto'>
        <div className='flex flex-wrap items-center gap-3'>
          <span className='text-sm text-muted-foreground mr-2'>Powered by</span>
          {automation.tools.map((tool: string) => (
            <span
              key={tool}
              className='text-sm px-4 py-2 rounded-full border bg-accent/10 text-accent border-accent/20'
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
