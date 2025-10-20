"use client";

import { useTranslations } from "next-intl";

export function Hero() {
	const t = useTranslations("start.hero");

	return (
		<section className="pt-20 pb-10">
			<div className="container mx-auto px-4 max-w-4xl text-center">
				<h1 className="text-4xl/tight md:text-5xl font-semibold tracking-tight">
					{t("title")}
				</h1>
				<p className="mt-4 text-balance text-muted-foreground">
					{t("subtitle")}
				</p>
			</div>
		</section>
	);
}
