import { locales } from '@/i18n/config'
import { Metadata } from 'next'
import Hero from '@/components/Home/Hero'
import Benefits from '@/components/Home/Benefits'
import StatsSection from '@/components/Home/StatsSection'
import HowItWorks from '@/components/Home/HowItWorks'
import Testimonials from '@/components/Home/Testimonials'
import FinalCTA from '@/components/Home/FinalCTA'

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;

	const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

	return {
		alternates: {
			canonical: `${base}/${locale}/`,
			languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}/`]))
		},
		title: locale === 'es' ? 'Prospector' : 'Prospector',
		description: locale === 'es' ? 'Organice flujos de trabajo en minutos' : 'Orchestrate workflows in minutes',
	}
}

export default function Home() {
	return (
		<div>
			<Hero />
			<Benefits />
			<StatsSection />
			<HowItWorks />
			<Testimonials />
			<FinalCTA />
		</div>
	)
}
