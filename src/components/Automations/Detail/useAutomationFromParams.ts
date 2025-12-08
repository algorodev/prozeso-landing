'use client'

import { useParams } from 'next/navigation'
import { AUTOMATIONS_DETAILS } from '@/data/automations'

export function useAutomationFromParams() {
  const params = useParams<{ id: string }>()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const automation = AUTOMATIONS_DETAILS.find((a) => a.slug === id)
  return { automation, id }
}
