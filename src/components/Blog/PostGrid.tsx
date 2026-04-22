import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { BlogPostSummary } from "@/lib/notion/types";
import PostCard from "./PostCard";

type Props = {
  posts: BlogPostSummary[];
  locale: Locale;
};

export default async function PostGrid({ posts, locale }: Props) {
  const t = await getTranslations("blog");

  if (posts.length === 0) {
    return (
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
    );
  }

  return (
    <div className="container mx-auto max-w-[1280px] px-6 sm:px-8 pb-24">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  );
}
