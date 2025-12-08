'use client'

import Logo from '@/components/Logo'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { DesktopNav } from '@/components/DesktopNav'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { MobileNav } from '@/components/MobileNav'
import { Button } from '@/components/ui/Button'
import type { Locale } from '@/i18n/config'
import { LocalizedLink } from '@/i18n/LocalizedLink'

type NavChild = {
	label: string;
	href: string;
	description?: string;
};

type NavItem = {
	label: string;
	href?: string;
	children?: NavChild[];
};

export const Header = () => {
	const t = useTranslations('header')
	const v = useTranslations('solutions.verticals')
	const pathname = usePathname()
	const locale = useLocale()

	const clientUrl =
		process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3001'
	const verticals: { id: 'beauty' | 'restaurants' | 'clinics' | 'hotels' | 'realEstate'; href: string }[] = [
		{ id: 'beauty', href: '/verticals/hair-and-beauty' },
		{ id: 'restaurants', href: '/verticals/restaurants' },
		{ id: 'clinics', href: '/verticals/clinics-and-health' },
		{ id: 'hotels', href: '/verticals/hotels' },
		{ id: 'realEstate', href: '/verticals/real-estate' },
	]

	const navItems: NavItem[] = [
		{ label: t('nav.automations'), href: '/automations' },
		{
			label: t('nav.solutions'),
			children: verticals.map((vert) => ({
				label: v(`${vert.id}.title`),
				href: vert.href,
			})),
		},
	]

	return (
		<header
			className='sticky top-0 z-[60] w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b'
			suppressHydrationWarning
		>
			<div className='mx-auto flex h-16 max-w-screen-2xl items-center gap-3 px-3 sm:px-4'>
				<div className='md:hidden'>
					<MobileNav nav={navItems}/>
				</div>
				<div className='flex items-center'>
					<LocalizedLink
						href='/'
						className='flex items-center gap-2'
					>
						<Logo />
					</LocalizedLink>
				</div>
				<nav className='hidden md:flex items-center gap-1 ml-2'>
					{navItems.map((item) => (
						<DesktopNav key={item.label} item={item} activePath={pathname}/>
					))}
				</nav>
				<div className='flex-1'/>
				<div className='flex items-center gap-1'>
					<LocaleSwitcher current={locale as Locale}/>
					<div className='hidden sm:flex items-center gap-2'>
						<Button variant='ghost'>
							<Link href={clientUrl as Route} target='_blank'>
								{t('signIn')}
							</Link>
						</Button>
						<Button asChild>
							<LocalizedLink href='/start'>{t('cta')}</LocalizedLink>
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}
