import { locales } from '@/i18n/config'
import { Metadata } from 'next'

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
		<h1>Hola que tal</h1>
	)
}
