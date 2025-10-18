import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { type ReactNode } from 'react';
import { locales, type Locale } from '@/i18n/config';

export const dynamic = 'force-static';

export type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	if (!locales.includes(locale)) notFound();

	const messages = (await import(`@/messages/${locale}.json`)).default;

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
