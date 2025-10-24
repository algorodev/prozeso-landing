import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { type Locale, locales } from "@/i18n/config";
import { AgentFloatButton } from "@/components/AgentFloatButton";

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
  const t = await getTranslations({ locale, namespace: "header" });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        {children}
        <Footer />
        <div className="fixed bottom-6 right-6 z-50">
          <AgentFloatButton />
        </div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
