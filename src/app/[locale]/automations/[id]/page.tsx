import { AutomationHeroSection } from '@/components/Automations/Detail/AutomationHeroSection'
import { AutomationProblemSolution } from '@/components/Automations/Detail/AutomationProblemSolution'
import { AutomationMetrics } from '@/components/Automations/Detail/AutomationMetrics'
import { AutomationOutcomes } from '@/components/Automations/Detail/AutomationOutcomes'
import { AutomationFeatures } from '@/components/Automations/Detail/AutomationFeatures'
import { AutomationExamples } from '@/components/Automations/Detail/AutomationExamples'
import { AutomationPoweredBy } from '@/components/Automations/Detail/AutomationPoweredBy'
import { AutomationBestFor } from '@/components/Automations/Detail/AutomationBestFor'
import { AutomationCTA } from '@/components/Automations/Detail/AutomationCTA'
import { LocalizedLink } from '@/i18n/LocalizedLink'
import type { Metadata } from 'next'
import { AUTOMATIONS_DETAILS } from '@/data/automations'

type Props = {
	params: Promise<{ id: string; }>
}

const ALLOWED_AUTOMATION_IDS = [
	'receptionist-ai',
	'missed-call-auto-callback',
	'appointment-reminder',
	'smart-pre-check-in',
	'no-show-recovery-fee-capture',
	'smart-waitlist-cancellation-filler',
	'abandoned-booking-follow-up',
	'reactivation-recalls',
	'review-booster',
	'billing-and-invoice',
	'in-stay-concierge-upsell',
	'group-event-inquiry-handler',
	'portal-lead-qualification-routing',
	'viewing-follow-up-offer-collector',
	'tenant-onboarding-docs-collection'
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params
	const automation = AUTOMATIONS_DETAILS.find((a) => a.slug === id)

	if (!automation) {
		return {
			title: 'Automation not found',
			description: `We couldn't find an automation with id "${id}".`,
		}
	}

	const baseTitle = automation.name || automation.headline || 'Automation'
	const title = `${baseTitle} · Prozeso Automations`
	const description = automation.description || automation.subheading || automation.problem || ''

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			url: `/automations/${id}`,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
		},
	}
}

export default async function AutomationDetailPage({ params }: Props) {
	const { id } = await params

	if (!id || !(ALLOWED_AUTOMATION_IDS as readonly string[]).includes(id)) {
		return (
			<div className='mx-auto max-w-3xl px-6 py-16'>
				<h1 className='page-title text-balance'>Automation not found</h1>
				<p className='mt-2 body-text text-muted-foreground'>
					We couldn't find an automation with id "{id}".
				</p>
				<LocalizedLink
					href='/automations'
					className='mt-6 inline-flex rounded-xl bg-accent px-4 py-2 text-accent-foreground button-primary-text'
				>
					Back to catalog
				</LocalizedLink>
			</div>
		)
	}

	return (
		<main>
			<AutomationHeroSection/>
			<AutomationProblemSolution/>
			<AutomationMetrics/>
			<AutomationOutcomes/>
			<AutomationFeatures/>
			<AutomationExamples/>
			<AutomationPoweredBy/>
			<AutomationBestFor/>
			<AutomationCTA/>
		</main>
	)
}
