import type { Metadata } from 'next'
import CoreAutomations from '@/components/Home/CoreAutomations'
import Impact from '@/components/Home/Impact'
import IndustryDirectAccess from '@/components/Home/IndustryDirectAccess'
import FinalCTA from '@/components/Home/FinalCTA'
import Hero from '@/components/Home/Hero'
import Understanding from '@/components/Home/Understanding'
import { locales } from '@/i18n/config'

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params

	const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

	return {
		alternates: {
			canonical: `${base}/${locale}/`,
			languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}/`])),
		},
	}
}

export default function Home() {
	return (
		<div>
			<Hero/>
			<Understanding/>
			<Impact/>
			<IndustryDirectAccess/>
			<CoreAutomations/>
			<FinalCTA/>
		</div>
	)
}
