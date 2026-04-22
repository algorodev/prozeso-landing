import Image from "next/image";
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

export default function PostCard({ post, locale }: Props) {
  const date = formatDate(post.publishedAt, locale);

  return (
    <LocalizedLink
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-lavender), var(--brand-blue))",
              opacity: 0.35,
            }}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <h2 className="font-sora text-lg font-semibold leading-snug tracking-tight text-balance group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        {post.excerpt ? (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        ) : null}
        {date ? (
          <div className="mt-auto pt-2 text-xs text-muted-foreground">
            {date}
          </div>
        ) : null}
      </div>
    </LocalizedLink>
  );
}
