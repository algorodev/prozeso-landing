import { LocalizedLink } from '@/i18n/LocalizedLink'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import { notFound } from 'next/navigation'
import { type ReactNode } from 'react'
import { locales, type Locale } from '@/i18n/config'
import { Header } from '@/components/Header'

export const dynamic = 'force-static'

export type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	if (!locales.includes(locale)) notFound()

	const messages = (await import(`@/messages/${locale}.json`)).default

	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
		>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<Header
					nav={[
						{ label: 'Automations', href: '/automations' },
						{ label: 'Demo', href: '/demo' },
					]}
					cta={{ label: 'Get started', href: '/start' }}
					logo={
						<LocalizedLink
							href='/'
							className='flex items-center gap-2 font-semibold'
						>
								<span className='rounded-2xl bg-primary/10 px-2 py-1'>
									Prospector
								</span>
						</LocalizedLink>
					}
				/>
				{children}
			</NextIntlClientProvider>
		</ThemeProvider>
	)
}
