import type { MetadataRoute } from "next";
import { AUTOMATIONS_DETAILS } from "@/data/automations";
import { VERTICALS } from "@/data/verticals";
import { locales } from "@/i18n/config";

function normalizeBaseUrl(url: string) {
  return url.replace(/\/$/, "");
}

const rawBase = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const siteUrl = normalizeBaseUrl(rawBase);

const paths = [
  "",
  "/about",
  "/automations",
  "/use-cases",
  "/start",
  "/solutions",
  "/legal/cookies",
  "/legal/privacy",
  "/legal/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const items: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    const languages: Record<string, string> = Object.fromEntries(
      locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
    );

    for (const l of locales) {
      const url = `${siteUrl}/${l}${path}`;
      items.push({
        url,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : 0.6,
        alternates: {
          languages,
        },
      });
    }
  }

  const verticalIds = Object.keys(VERTICALS ?? {});
  for (const id of verticalIds) {
    const path = `/verticals/${id}`;
    const languages: Record<string, string> = Object.fromEntries(
      locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
    );

    for (const l of locales) {
      const url = `${siteUrl}/${l}${path}`;
      items.push({
        url,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages,
        },
      });
    }
  }

  for (const { slug } of AUTOMATIONS_DETAILS) {
    const path = `/automations/${slug}`;
    const languages: Record<string, string> = Object.fromEntries(
      locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
    );

    for (const l of locales) {
      const url = `${siteUrl}/${l}${path}`;
      items.push({
        url,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages,
        },
      });
    }
  }

  return items;
}
