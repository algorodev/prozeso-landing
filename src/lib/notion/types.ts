import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type NotionLocale = "es" | "en";

export type RichText = PageObjectResponse extends {
  properties: infer P;
}
  ? P extends Record<string, unknown>
    ? unknown
    : never
  : never;

export type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string | null;
  tags: string[];
  publishedAt: string | null;
  author: string | null;
  language: NotionLocale;
  translationKey: string | null;
};

export type BlogPost = BlogPostSummary & {
  blocks: NotionBlock[];
};

export type NotionBlock = BlockObjectResponse & {
  children?: NotionBlock[];
};
