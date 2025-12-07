'use client'

import { Button } from '@/components/ui/Button'
import { LocalizedLink } from '@/i18n/LocalizedLink'
import { ArrowRight, Phone } from 'lucide-react'
import { useParams } from 'next/navigation'
import { VERTICALS } from '@/data/verticals'
import { useTranslations } from 'next-intl'

export function VerticalCTA() {
  const params = useParams<{ id: string }>()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const vertical = id ? VERTICALS[id as keyof typeof VERTICALS] : undefined
  const t = useTranslations()
  const name = (() => {
    if (!id) return vertical?.name ?? ''
    const key = `verticals.${id}.name`
    return t.has(key) ? (t(key) as string) : (vertical?.name ?? '')
  })()

  return (
    <section className='relative py-32 px-6 border-t border-border overflow-hidden'>
      <div className='container mx-auto text-center max-w-2xl relative z-10'>
        <h2 className='font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-balance'>
          {t.rich('verticals.page.cta.title', {
            primary: (chunks) => <span className='text-primary'>{chunks}</span>,
            secondary: () => <span className='text-secondary'>{name}</span>,
          })}
        </h2>
        <p className='text-lg text-muted-foreground mb-12 leading-relaxed'>
          {t.has('verticals.page.cta.subtitle')
            ? (t('verticals.page.cta.subtitle') as string)
            : 'Start with a free assessment tailored to your industry.'}
        </p>
        <div className='flex justify-center'>
          <Button asChild size='lg'>
	          <LocalizedLink href={`/start?vertical=${vertical?.slug}`}>
	          	<Phone className='w-5 h-5' />
	          	{t.has('verticals.page.cta.button') ? (t('verticals.page.cta.button') as string) : 'Start your free assessment'}
	          </LocalizedLink>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default VerticalCTA
