import { LocalizedLink } from '@/i18n/LocalizedLink'
import VerticalHero from '@/components/Verticals/VerticalHero'
import VerticalReality from '@/components/Verticals/VerticalReality'
import VerticalImpact from '@/components/Verticals/VerticalImpact'
import VerticalAutomations from '@/components/Verticals/VerticalAutomations'
import VerticalJourney from '@/components/Verticals/VerticalJourney'
import VerticalFaqs from '@/components/Verticals/VerticalFaqs'
import VerticalCTA from '@/components/Verticals/VerticalCTA'
import { getTranslations } from 'next-intl/server'

type Props = {
	params: Promise<{id: string}>
}

export default async function VerticalPage({ params }: Props) {
    const { id } = await params
    const t = await getTranslations('verticals.page')

	const ALLOWED_VERTICAL_IDS = [
		'clinics-and-health',
		'hair-and-beauty',
		'hotels',
		'restaurants',
		'real-estate',
	] as const

 if (!id || !ALLOWED_VERTICAL_IDS.includes(id as (typeof ALLOWED_VERTICAL_IDS)[number])) {
        return (
            <div className='mx-auto max-w-3xl px-6 py-16'>
                <h1 className='page-title text-balance'>{t('notFound.title')}</h1>
                <p className='mt-2 body-text text-muted-foreground'>
                    {t('notFound.subtitle', { id })}
                </p>
                <LocalizedLink
                    href='/verticals'
                    className='mt-6 inline-flex rounded-xl bg-accent px-4 py-2 text-accent-foreground button-primary-text'
                >
                    {t('notFound.back')}
                </LocalizedLink>
            </div>
        )
    }

	return (
		<main>
			<VerticalHero />
			<VerticalReality />
			<VerticalImpact />
			<VerticalAutomations />
			<VerticalJourney />
			<VerticalFaqs />
			<VerticalCTA />
		</main>
	)
}
