'use client'

import { CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/Dialog'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmailSentDialog({ open, onOpenChange }: Props) {
  const t = useTranslations('start.assessment')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className='flex items-start gap-3'>
          <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-primary' aria-hidden />
          <div>
            <DialogTitle className='body-strong-text'>{t('success.title')}</DialogTitle>
            <DialogDescription className='body-text text-muted-foreground mt-1'>
              {t('success.body')}
            </DialogDescription>
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <DialogClose asChild>
            <Button type='button'>OK</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EmailSentDialog
