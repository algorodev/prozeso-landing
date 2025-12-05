import { Button } from '@/components/ui/Button'
import { LocalizedLink } from '@/i18n/LocalizedLink'

const IndustryDirectAccess = () => {
	return (
		<section className='py-24 px-6 border-t border-border'>
			<div className='container mx-auto'>
				<h2 className='font-sora text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-6 text-balance'>
					Built for your <span className='text-secondary'>industry</span>
				</h2>
				<p className='text-lg text-muted-foreground mb-12 max-w-xl font-normal'>
					Tailored solutions for service businesses.
				</p>

				<div className='flex flex-wrap gap-3'>
					{[
						{ name: 'Hair & Beauty', href: '/verticals/hair-and-beauty' },
						{ name: 'Restaurants', href: '/verticals/restaurants' },
						{ name: 'Clinics & Health', href: '/verticals/clinics-and-health' },
						{ name: 'Hotels', href: '/verticals/hotels' },
						{ name: 'Real Estate', href: '/verticals/real-estate' },
					].map((vertical) => (
						<Button key={vertical.href} asChild variant='outline'>
							<LocalizedLink href={vertical.href}>
								{vertical.name}
							</LocalizedLink>
						</Button>
					))}
				</div>
			</div>
		</section>
	)
}

export default IndustryDirectAccess
