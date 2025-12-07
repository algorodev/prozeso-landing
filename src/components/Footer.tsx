'use client'

import logoBlanco from '@/assets/logo-blanco.svg'
import { LocalizedLink } from '@/i18n/LocalizedLink'
import { Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Footer = () => {
	const t = useTranslations('footer')
	const h = useTranslations('header')
	const year = new Date().getFullYear()

	return (
		<footer className='py-16 px-6 border-t border-border'>
			<div className='container mx-auto'>
				<div className='flex flex-col md:flex-row justify-between items-start gap-12'>
					<div className='space-y-4'>
						<LocalizedLink href='/' className='flex items-center gap-2 font-bold text-lg tracking-tight'>
							<Image
								src={logoBlanco}
								width={120}
								alt={h('logoAlt')}
							/>
						</LocalizedLink>
						<p className='text-sm text-muted-foreground max-w-xs'>
							{t('tagline')}
						</p>
					</div>
					<div className='flex gap-16'>
						<div>
							<h4 className='font-medium text-sm mb-4'>{t('sections.product')}</h4>
							<ul className='space-y-3 text-sm'>
								<li>
									<LocalizedLink
										href='/automations'
										className='text-muted-foreground hover:text-foreground transition-colors'
									>
										{t('links.automations')}
									</LocalizedLink>
								</li>
								<li>
									<LocalizedLink href='/start'
									               className='text-muted-foreground hover:text-foreground transition-colors'>
										{t('links.assessment')}
									</LocalizedLink>
								</li>
							</ul>
						</div>
						<div>
							<h4 className='font-medium text-sm mb-4'>{t('sections.company')}</h4>
							<ul className='space-y-3 text-sm'>
								<li>
									<LocalizedLink href='/legal/terms'
									               className='text-muted-foreground hover:text-foreground transition-colors'>
										{t('links.terms')}
									</LocalizedLink>
								</li>
								<li>
									<LocalizedLink href='/legal/privacy'
									               className='text-muted-foreground hover:text-foreground transition-colors'>
										{t('links.privacy')}
									</LocalizedLink>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div
					className='mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground'>
					<p>{t('rights', { year })}</p>
					<div className='flex gap-6'>
						<a href='https://instagram.com/prozeso.ai' className='hover:text-foreground transition-colors'
						   target='_blank'>
							<Instagram className='w-5 h-5'/>
						</a>
						<a href='https://linkedin.com/prozeso' className='hover:text-foreground transition-colors' target='_blank'>
							<Linkedin className='w-5 h-5'/>
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
