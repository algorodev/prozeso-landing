'use client'

import { useParams } from 'next/navigation'
import { VERTICALS } from '@/data/verticals'

export function VerticalFaqs() {
  const params = useParams<{ id: string }>()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const vertical = id ? VERTICALS[id as keyof typeof VERTICALS] : undefined
  const faqs = vertical?.faqs ?? []

  return (
    <section className='py-24 px-6'>
      <div className='container mx-auto'>
        <h2 className='font-heading text-3xl md:text-4xl font-semibold tracking-tight mb-16 text-left'>
          <span className='text-secondary'>Common</span> questions
        </h2>
        <div className='space-y-8'>
          {faqs.map((faq, idx) => (
            <div key={idx} className='pb-8 border-b border-border last:border-0'>
              <h3 className='font-bold mb-3'>{faq.question}</h3>
              <p className='text-muted-foreground leading-relaxed'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VerticalFaqs
