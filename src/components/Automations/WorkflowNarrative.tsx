"use client";

import { useTranslations } from 'next-intl'
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, HelpCircle, Rocket } from "lucide-react";

type Block = {
	id: "problem" | "solution" | "results";
	title: string;
	icon: ReactNode;
	copy: ReactNode;
};

export default function WorkflowNarrative({ automationId }: { automationId: string}) {
	const [active, setActive] = useState<Block["id"]>("problem");
	const refs = useRef<Record<string, HTMLElement | null>>({});
	const activeRef = useRef<Block["id"]>("problem");
	const lastScrollY = useRef(0);
	const t = useTranslations("automations.detail");
	const tId = useTranslations(`automations.${automationId}`);

	useEffect(() => {
		activeRef.current = active;
	}, [active]);

	useEffect(() => {
		let raf = 0;
		const ids: Block["id"][] = ["problem", "solution", "results"];
		const PRE_TRIGGER = 180;
		const STICK_THRESHOLD = 20;

		const measure = () => {
			const vh = window.innerHeight;

			const y = window.scrollY || window.pageYOffset || 0;
			const dir = y > lastScrollY.current ? 1 : y < lastScrollY.current ? -1 : 0;
			lastScrollY.current = y;

			const rects = ids.reduce((acc, id) => {
				const el = refs.current[id];
				acc[id] = el ? el.getBoundingClientRect() : null;
				return acc;
			}, {} as Record<Block["id"], DOMRect | null>);

			const visibleOf = (id: Block["id"]) => {
				const rect = rects[id];
				if (!rect) return 0;
				const visibleTop = Math.max(rect.top, 0);
				const visibleBottom = Math.min(rect.bottom, vh - PRE_TRIGGER);
				return Math.max(0, visibleBottom - visibleTop);
			};

			const currentId = activeRef.current;
			const currentVisible = visibleOf(currentId);
			const currentIndex = ids.indexOf(currentId);

			let newActive = currentId;
			if (currentVisible <= STICK_THRESHOLD) {
				if (dir >= 0) {
					const nextIndex = Math.min(currentIndex + 1, ids.length - 1);
					if (nextIndex !== currentIndex) {
						const nextId = ids[nextIndex];
						if (visibleOf(nextId) > 0) newActive = nextId;
					}
				} else {
					const prevIndex = Math.max(currentIndex - 1, 0);
					if (prevIndex !== currentIndex) {
						const prevId = ids[prevIndex];
						if (visibleOf(prevId) > 0) newActive = prevId;
					}
				}
			}

			if (newActive && newActive !== activeRef.current) {
				activeRef.current = newActive;
				setActive(newActive);
			}
		};

		const onScroll = () => {
			if (!raf) raf = window.requestAnimationFrame(() => {
				raf = 0;
				measure();
			});
		};

		measure();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	}, []);

	const blocks: Block[] = [
		{
			id: "problem",
			title: t('problemTitle'),
			icon: <HelpCircle className="size-5" aria-hidden />,
			copy: tId("problem")
				.split("\n")
				.map((part, i) => (
					<Fragment key={i}>
						{i > 0 && (
							<>
								<br />
								<br />
							</>
						)}
						{part}
					</Fragment>
				)),
		},
		{
			id: "solution",
			title: t('solutionTitle'),
			icon: <ArrowRight className="size-5" aria-hidden />,
			copy: tId("problem")
				.split("\n")
				.map((part, i) => (
					<Fragment key={i}>
						{i > 0 && (
							<>
								<br />
								<br />
							</>
						)}
						{part}
					</Fragment>
				)),
		},
		{
			id: "results",
			title: t('resultsTitle'),
			icon: <Rocket className="size-5" aria-hidden />,
			copy: tId("results")
				.split("\n")
				.map((part, i) => (
					<Fragment key={i}>
						{i > 0 && (
							<>
								<br />
								<br />
							</>
						)}
						{part}
					</Fragment>
				)),
		},
	];

	return (
		<section aria-labelledby="workflow-journey" className="relative mx-auto max-w-7xl px-4 py-16">
			<div className="grid gap-12 md:grid-cols-[280px,1fr]">
				<header className="md:sticky md:top-24 self-start bg-background z-[30]">
					<h2 id="workflow-journey" className="text-2xl font-semibold text-foreground">
						How Prozeso fixes it—step by step
					</h2>
					<ul className="mt-6 space-y-4">
 					{blocks.map((b) => {
 						const title = b.id === "problem" ? t("problemTitle") : b.id === "solution" ? t("solutionTitle") : t("resultsTitle");
 						return (
 							<li key={b.id} className="flex items-center gap-3">
                 <span
 	                className={[
 		                "grid size-8 place-items-center rounded-full border-2 border-border",
 		                active === b.id ? "bg-primary/10 border-primary text-primary" : "bg-transparent border-muted-foreground/20 text-muted-foreground",
 	                ].join(" ")}
 	                aria-hidden
                 >
                   {b.icon}
                 </span>
 								<span className={active === b.id ? "font-medium text-foreground" : "text-muted-foreground"}>
                   {title}
                 </span>
 							</li>
 						)
 					})}
					</ul>
				</header>
				<div className="relative pl-2">
					<div aria-hidden className="absolute left-7 top-0 hidden h-full md:block">
						<div className="ml-3 h-full w-px bg-muted-foreground/20" />
					</div>
					<div className="space-y-20">
						{blocks.map((b) => (
 						<section
 							key={b.id}
 							id={b.id}
 							ref={(el) => { refs.current[b.id] = el }}
 							className="relative scroll-mt-28 pl-0 md:pl-10"
							>
								<div
									aria-hidden
									className={[
										"hidden md:block absolute left-0 top-1.5 size-6 rounded-full border bg-background",
										active === b.id ? "border-primary ring-4 ring-primary/15" : "border-muted-foreground/20",
									].join(" ")}
								/>
								<h3 className="text-xl font-semibold">
									{b.id === "problem"
										? t("problemTitle")
										: b.id === "solution"
										? t("solutionTitle")
										: t("resultsTitle")}
								</h3>
								<div className="prose prose-neutral mt-4 max-w-none text-foreground/90">
									{(() => {
										const raw = tId.raw(b.id) ?? undefined;
										if (raw) {
											return raw.split("\n").map((p: string, idx: number) => (
												<p key={idx} className={idx === 0 ? undefined : "mt-3"}>{p}</p>
											));
										}
										return b.copy;
									})()}
								</div>
								{b.id === "results" && (
									<div className="mt-8">
										<p className="text-sm text-muted-foreground flex items-center gap-3">
											<CheckCircle2 className="size-5" aria-hidden />
											{tId('resultSummary')}
										</p>
									</div>
								)}
							</section>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
