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
        <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-10 text-center">
          <p className="text-muted-foreground">{t("empty")}</p>
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
