import { ArrowLeft, SearchX } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui";
import { defaultLocale, type Locale } from "@/i18n/config";

export default async function NotFound() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as Locale) ?? defaultLocale;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const t = (key: string) => {
    const keys = key.split(".");
    let value: Record<string, unknown> = messages;
    for (const k of keys) {
      value = value[k] as Record<string, unknown>;
    }
    return value as unknown as string;
  };

  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="dark"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Suspense>
          <Header />
        </Suspense>
        <main className="relative isolate flex min-h-[70vh] items-center">
          <title>{`${t("notFound.title")} | Prozeso`}</title>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_bottom,theme(colors.border/15)_1px,transparent_1px),linear-gradient(to_right,theme(colors.border/15)_1px,transparent_1px)] [background-size:3rem_3rem] [mask-image:radial-gradient(40rem_40rem_at_50%_0%,black,transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 top-10 size-40 rounded-full bg-primary/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 bottom-10 size-40 rounded-full bg-secondary/15 blur-3xl"
          />
          <div className="relative mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-full border border-border/50 bg-background/60 px-3 py-1 body-sm text-foreground-muted shadow-sm backdrop-blur">
                <SearchX className="mr-2 size-3.5 text-primary" />
                <span>{t("notFound.badge")}</span>
              </div>
              <h1 className="text-balance display-xl">{t("notFound.title")}</h1>
              <p className="mt-4 text-pretty body-md leading-7 text-foreground-subtle sm:text-lg">
                {t("notFound.description")}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                  <Link href={`/${locale}`}>
                    <ArrowLeft className="mr-2 size-5" />
                    {t("notFound.cta")}
                  </Link>
                </Button>
              </div>
              <div className="mt-10 w-full">
                <div className="mx-auto w-full max-w-xl rounded-xl border border-border/60 bg-gradient-to-b from-background/60 to-background/30 p-5 shadow-sm">
                  <div className="flex justify-center items-center gap-3 body-md text-foreground-subtle">
                    <span className="inline-flex size-6 items-center justify-center bg-background/70 body-sm font-semibold text-foreground/80">
                      404
                    </span>
                    <p className="text-left body-md">{t("notFound.hint")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
