import type { Metadata } from "next";
import BlogHero from "@/components/Blog/BlogHero";
import PostGrid from "@/components/Blog/PostGrid";
import { type Locale, locales } from "@/i18n/config";
import { getPosts } from "@/lib/notion/posts";
import { buildBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";

export const revalidate = 3600;

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

  const title = locale === "es" ? "Blog" : "Blog";
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

  const posts = await getPosts(locale);

  return (
    <main>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <BlogHero />
      <PostGrid posts={posts} locale={locale} />
    </main>
  );
}
