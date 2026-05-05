import { Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BlogHero from "@/components/Blog/BlogHero";
import { type Locale, locales } from "@/i18n/config";
import { buildBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";

type Props = {
  params: Promise<{ locale: string }>;
};

function normalizeLocale(raw: string): Locale {
  return (locales as readonly string[]).includes(raw)
    ? (raw as Locale)
    : locales[0];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/blog`;

  const title = "Blog";
  const description =
    locale === "es"
      ? "Ideas, guías y casos reales sobre automatización con IA para negocios de servicios."
      : "Ideas, guides, and real-world stories about AI automation for service businesses.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}/blog`]),
      ),
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const breadcrumb = buildBreadcrumbJsonLd([
    {
      name: locale === "es" ? "Inicio" : "Home",
      url: `${base}/${locale}/`,
    },
    {
      name: "Blog",
      url: `${base}/${locale}/blog`,
    },
  ]);

  const t = await getTranslations("blog");

  return (
    <main>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <BlogHero />
      <div className="container mx-auto max-w-[1280px] px-6 sm:px-8 pb-24">
        <div className="relative isolate overflow-hidden rounded-3xl border border-border/60 bg-muted/10 px-6 py-16 text-center sm:py-20">
          <span
            className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-25"
            style={{ background: "var(--brand-lavender)" }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 translate-x-1/3 translate-y-1/3 rounded-full blur-[100px] opacity-20"
            style={{ background: "var(--brand-cyan)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {t("empty.badge")}
            </div>
            <h2 className="font-sora text-2xl sm:text-3xl font-semibold tracking-tighter text-balance">
              {t("empty.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-balance">
              {t("empty.description")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
