"use client"

import { Button } from '@/components/ui/Button'
import { CATEGORIES } from '@/data/automations'
import { Input } from '@/components/ui/Input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function AutomationsFilter({
  category,
  onCategoryChange,
  query,
  onQueryChange,
}: {
  category: string
  onCategoryChange: (value: string) => void
  query: string
  onQueryChange: (value: string) => void
}) {
  const t = useTranslations('automations.page.filter')
  const tc = useTranslations('automations.categories')
  const current = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[0]
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col md:flex-row gap-3 items-center md:justify-end'>
        <div className='w-full md:w-auto'>
          <span className='sr-only' id='category-label'>{t('categoryLabel')}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
	            <Button
	            variant="ghost"
	            className='border border-border rounded-md w-full md:w-auto'
	            >
	            {tc.has(current.id) ? tc(current.id) : current?.label}
	            <ChevronDown className='ml-1 size-4 opacity-70'/>
	            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='min-w-[--radix-dropdown-menu-trigger-width]'>
              <DropdownMenuRadioGroup value={category} onValueChange={onCategoryChange}>
                {CATEGORIES.map((c) => (
                  <DropdownMenuRadioItem key={c.id} value={c.id}>
                    {tc.has(c.id) ? tc(c.id) : c.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <label className='w-full md:max-w-md'>
          <span className='sr-only'>{t('searchAria')}</span>
          <Input
            type='text'
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchAria')}
            className='h-10'
          />
        </label>
      </div>
    </div>
  )
}
