'use client'

import { LocalizedLink } from '@/i18n/LocalizedLink'
import { ArrowRight } from 'lucide-react'
import { type ComponentType } from 'react'

export type AutomationItem = {
	id: string
	title: string
	description: string
	verticals: string[]
	icon: ComponentType<{ className?: string; strokeWidth?: number }>
	metrics?: string[]
}

export default function AutomationCard({ automation }: { automation: AutomationItem }) {
	const Icon = automation.icon

	return (
		<LocalizedLink key={automation.id} href={`/automations/${automation.id}`}>
			<div
				className='group cursor-pointer rounded-2xl border-2 border-border p-4 transition-all hover:border-primary hover:scale-[1.05] relative overflow-hidden'>
				<div
					className='flex items-center mb-5'
				>
					<div
						className='w-16 h-16 rounded-2xl bg-secondary backdrop-blur-sm flex items-center justify-center relative z-10'>
						<Icon className='w-8 h-8 text-foreground' strokeWidth={1.5}/>
					</div>
				</div>
				<h3 className='card-title text-lg! mb-2 group-hover:text-primary transition-colors'>
					{automation.title}
				</h3>
				<p className='card-subtitle text-muted-foreground mb-4 leading-relaxed line-clamp-2'>
					{automation.description}
				</p>
				{automation.metrics && automation.metrics.length > 0 && (
					<div className='mb-4 flex flex-col gap-2'>
						{automation.metrics.slice(0, 3).map((m) => (
							<span
								key={m}
								className='w-fit text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 truncate max-w-full'
								title={m}
							>
                {m}
              </span>
						))}
					</div>
				)}
				<div className='flex flex-wrap gap-1.5 mb-4'>
					{automation.verticals.slice(0, 2).map((vertical) => (
						<span
							key={vertical}
							className='text-xs px-2.5 py-1 rounded-full bg-lavender/10 text-lavender border border-lavender/20'
						>
              {vertical}
            </span>
					))}
					{automation.verticals.length > 2 && (
						<span className='text-xs px-2.5 py-1 rounded-full bg-cyan/10 text-cyan border border-cyan/20'>
              +{automation.verticals.length - 2}
            </span>
					)}
				</div>
				<span
					className='text-sm font-medium flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors'>
          Learn more <ArrowRight className='w-4 h-4'/>
        </span>
			</div>
		</LocalizedLink>
	)
}
