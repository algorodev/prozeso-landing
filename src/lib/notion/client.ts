import "server-only";

import { Client } from "@notionhq/client";

const token = process.env.NOTION_TOKEN;

export const notion = new Client({
  auth: token,
});

export const BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID ?? "";

export function isNotionConfigured(): boolean {
  return Boolean(token && BLOG_DATABASE_ID);
}
