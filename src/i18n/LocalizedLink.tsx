"use client";

import type { Route } from "next";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { ComponentProps, ReactNode } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
	href: string;
	children: ReactNode;
};

function LocalizedLink({ children, href, ...rest }: Props) {
	const locale = useLocale();

	const normalized = href.startsWith("/") ? href : `/${href}`;
	const alreadyPrefixed = /^\/[a-z]{2}(?:\/|$)/i.test(normalized);

	const localizedHref = alreadyPrefixed
		? normalized
		: `/${locale}${normalized}`;

	return (
		<Link {...rest} href={localizedHref as Route}>
			{children}
		</Link>
	);
}

export default LocalizedLink;
