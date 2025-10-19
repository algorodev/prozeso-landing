"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/Accordion";

export default function FAQ() {
	return (
		<section aria-labelledby="pricing-faq">
			<h2 id="pricing-faq" className="text-xl font-semibold">
				FAQs
			</h2>
			<Accordion type="single" collapsible className="mt-4">
				<AccordionItem value="billing">
					<AccordionTrigger>How does billing work?</AccordionTrigger>
					<AccordionContent>
						Choose monthly or yearly. Yearly billing includes a discount (~20%).
						You can upgrade or downgrade any time; changes prorate on the next
						invoice.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="overages">
					<AccordionTrigger>
						What happens if we exceed task limits?
					</AccordionTrigger>
					<AccordionContent>
						We&apos;ll send alerts as you approach limits. Light overages are
						pooled; sustained spikes may require a plan change. We never
						hard-stop critical automations without notice.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="security">
					<AccordionTrigger>Do you offer SSO and DPAs?</AccordionTrigger>
					<AccordionContent>
						Yes — SSO (SAML / OIDC) and DPA / data residency options are
						available on the Scale plan. Contact us for security reviews.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="cancellation">
					<AccordionTrigger>Can we cancel any time?</AccordionTrigger>
					<AccordionContent>
						Yes. Monthly plans cancel at the next renewal; yearly plans can be
						set to not renew. You can export your data at any time.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	);
}
