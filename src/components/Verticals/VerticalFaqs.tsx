'use client'

import { useParams } from 'next/navigation'
import { VERTICALS } from '@/data/verticals'
import { useTranslations } from 'next-intl'

export function VerticalFaqs() {
  const params = useParams<{ id: string }>()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const vertical = id ? VERTICALS[id as keyof typeof VERTICALS] : undefined
  const faqs = vertical?.faqs ?? []
  const t = useTranslations()

  return (
    <section className='py-24 px-6'>
      <div className='container mx-auto'>
        <h2 className='font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-16 text-left'>
          {t.rich('verticals.page.faqs.title', {
            secondary: (chunks) => <span className='text-secondary'>{chunks}</span>,
          })}
        </h2>
        <div className='space-y-8'>
          {faqs.map((faq, idx) => (
            <div key={idx} className='pb-8 border-b border-border last:border-0'>
              <h3 className='font-bold mb-3'>
                {id && t.has(`verticals.${id}.faqs.${idx}.question`)
                  ? (t(`verticals.${id}.faqs.${idx}.question`) as string)
                  : faq.question}
              </h3>
              <p className='text-muted-foreground leading-relaxed'>
                {id && t.has(`verticals.${id}.faqs.${idx}.answer`)
                  ? (t(`verticals.${id}.faqs.${idx}.answer`) as string)
                  : faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VerticalFaqs
