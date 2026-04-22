import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotionRenderer } from "@/components/Blog/NotionRenderer";
import PostHeader from "@/components/Blog/PostHeader";
import { type Locale, locales } from "@/i18n/config";
import { getAllPublishedSlugs, getPostBySlug } from "@/lib/notion/posts";
import { buildBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function normalizeLocale(raw: string): Locale {
  return (locales as readonly string[]).includes(raw)
    ? (raw as Locale)
    : locales[0];
}

export async function generateStaticParams() {
  const entries = await getAllPublishedSlugs();
  return entries.map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = normalizeLocale(raw);

  const post = await getPostBySlug(locale, slug);
  if (!post) return {};

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      url,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      images: post.coverUrl ? [{ url: post.coverUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverUrl ? [post.coverUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = normalizeLocale(raw);

  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const breadcrumb = buildBreadcrumbJsonLd([
    {
      name: locale === "es" ? "Inicio" : "Home",
      url: `${base}/${locale}/`,
    },
    { name: "Blog", url: `${base}/${locale}/blog` },
    { name: post.title, url: `${base}/${locale}/blog/${slug}` },
  ]);

  return (
    <main className="pb-24">
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <PostHeader post={post} locale={locale} />
      <article className="container mx-auto max-w-3xl px-6 sm:px-8 pt-10">
        <NotionRenderer blocks={post.blocks} />
      </article>
    </main>
  );
}
