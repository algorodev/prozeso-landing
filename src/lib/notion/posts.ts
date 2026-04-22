import "server-only";

import type {
  PageObjectResponse,
  QueryDataSourceParameters,
} from "@notionhq/client/build/src/api-endpoints";
import { fetchBlockChildren } from "./blocks";
import { BLOG_DATABASE_ID, isNotionConfigured, notion } from "./client";
import type { BlogPost, BlogPostSummary, NotionLocale } from "./types";

type RichTextItem = {
  plain_text: string;
};

let cachedDataSourceId: string | null = null;

async function resolveDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId;

  const db = await notion.databases.retrieve({
    database_id: BLOG_DATABASE_ID,
  });

  if (!("data_sources" in db) || db.data_sources.length === 0) {
    throw new Error(
      "The configured Notion database has no data sources. Make sure the integration has access and the database is not empty.",
    );
  }

  cachedDataSourceId = db.data_sources[0].id;
  return cachedDataSourceId;
}

function plainText(items: RichTextItem[] | undefined): string {
  if (!items) return "";
  return items.map((i) => i.plain_text).join("");
}

function readSelect(page: PageObjectResponse, key: string): string | null {
  const prop = page.properties[key];
  if (!prop || prop.type !== "select") return null;
  return prop.select?.name ?? null;
}

function readMultiSelect(page: PageObjectResponse, key: string): string[] {
  const prop = page.properties[key];
  if (!prop || prop.type !== "multi_select") return [];
  return prop.multi_select.map((t) => t.name);
}

function readTitle(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (!prop || prop.type !== "title") return "";
  return plainText(prop.title);
}

function readRichText(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (!prop || prop.type !== "rich_text") return "";
  return plainText(prop.rich_text);
}

function readDate(page: PageObjectResponse, key: string): string | null {
  const prop = page.properties[key];
  if (!prop || prop.type !== "date") return null;
  return prop.date?.start ?? null;
}

function readCover(page: PageObjectResponse, key: string): string | null {
  const prop = page.properties[key];
  if (prop && prop.type === "files" && prop.files.length > 0) {
    const file = prop.files[0];
    if (file.type === "external") return file.external.url;
    if (file.type === "file") return file.file.url;
  }
  if (page.cover) {
    if (page.cover.type === "external") return page.cover.external.url;
    if (page.cover.type === "file") return page.cover.file.url;
  }
  return null;
}

function mapPageToSummary(page: PageObjectResponse): BlogPostSummary | null {
  const language = readSelect(page, "Language") as NotionLocale | null;
  const slug = readRichText(page, "Slug").trim();
  const title = readTitle(page, "Title");

  if (!language || !slug || !title) return null;
  if (language !== "es" && language !== "en") return null;

  return {
    id: page.id,
    slug,
    title,
    excerpt: readRichText(page, "Excerpt"),
    coverUrl: readCover(page, "Cover"),
    tags: readMultiSelect(page, "Tags"),
    publishedAt: readDate(page, "PublishedAt"),
    author: readRichText(page, "Author") || null,
    language,
    translationKey: readRichText(page, "TranslationKey") || null,
  };
}

function buildFilter(
  locale: NotionLocale,
): QueryDataSourceParameters["filter"] {
  return {
    and: [
      { property: "Status", select: { equals: "Published" } },
      { property: "Language", select: { equals: locale } },
    ],
  };
}

export async function getPosts(
  locale: NotionLocale,
): Promise<BlogPostSummary[]> {
  if (!isNotionConfigured()) return [];

  try {
    const dataSourceId = await resolveDataSourceId();

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: buildFilter(locale),
      sorts: [{ property: "PublishedAt", direction: "descending" }],
      page_size: 100,
    });

    const pages = response.results.filter(
      (p): p is PageObjectResponse =>
        "properties" in p && (p as PageObjectResponse).object === "page",
    );

    return pages
      .map(mapPageToSummary)
      .filter((p): p is BlogPostSummary => p !== null);
  } catch (error) {
    console.warn("[notion] getPosts failed:", error);
    return [];
  }
}

export async function getPostBySlug(
  locale: NotionLocale,
  slug: string,
): Promise<BlogPost | null> {
  if (!isNotionConfigured()) return null;

  try {
    const dataSourceId = await resolveDataSourceId();

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          { property: "Status", select: { equals: "Published" } },
          { property: "Language", select: { equals: locale } },
          { property: "Slug", rich_text: { equals: slug } },
        ],
      },
      page_size: 1,
    });

    const page = response.results.find(
      (p): p is PageObjectResponse =>
        "properties" in p && (p as PageObjectResponse).object === "page",
    );
    if (!page) return null;

    const summary = mapPageToSummary(page);
    if (!summary) return null;

    const blocks = await fetchBlockChildren(page.id);

    return { ...summary, blocks };
  } catch (error) {
    console.warn("[notion] getPostBySlug failed:", error);
    return null;
  }
}

export async function getAllPublishedSlugs(): Promise<
  Array<{ locale: NotionLocale; slug: string }>
> {
  if (!isNotionConfigured()) return [];

  const out: Array<{ locale: NotionLocale; slug: string }> = [];

  for (const locale of ["es", "en"] as const) {
    const posts = await getPosts(locale);
    for (const p of posts) {
      out.push({ locale, slug: p.slug });
    }
  }

  return out;
}
