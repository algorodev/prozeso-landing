import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { type Locale, locales } from "@/i18n/config";
import { LocalizedLink } from "@/i18n/LocalizedLink";

export const dynamic = "force-dynamic";

export type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((l) => ({ locale: l }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;

  const locale = (locales as readonly string[]).includes(rawLocale)
    ? (rawLocale as Locale)
    : locales[0];

  if (!locales.includes(locale)) notFound();

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header
          nav={[
            { label: "Automations", href: "/automations" },
            { label: "Demo", href: "/demo" },
          ]}
          cta={{ label: "Get started", href: "/start" }}
          logo={
            <LocalizedLink
              href="/"
              className="flex items-center gap-2 font-semibold"
            >
              <span className="rounded-2xl bg-primary/10 px-2 py-1">
                Prospector
              </span>
            </LocalizedLink>
          }
        />
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
