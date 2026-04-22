import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import type { BlogPostSummary } from "@/lib/notion/types";

type Props = {
  post: BlogPostSummary;
  locale: Locale;
};

function formatDate(iso: string | null, locale: Locale): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export default async function PostHeader({ post, locale }: Props) {
  const t = await getTranslations("blog");
  const date = formatDate(post.publishedAt, locale);

  return (
    <header className="container mx-auto max-w-3xl px-6 sm:px-8 pt-8 sm:pt-12">
      <LocalizedLink
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        {t("backToList")}
      </LocalizedLink>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mt-4 font-sora text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance">
        {post.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        {post.author ? <span>{post.author}</span> : null}
        {post.author && date ? (
          <span aria-hidden="true" className="opacity-50">
            ·
          </span>
        ) : null}
        {date ? (
          <time dateTime={post.publishedAt ?? undefined}>{date}</time>
        ) : null}
      </div>

      {post.coverUrl ? (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      ) : null}
    </header>
  );
}
