import type { MetadataRoute } from "next";

function normalizeBaseUrl(url: string) {
  return url.replace(/\/$/, "");
}

const rawBase = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteUrl = normalizeBaseUrl(rawBase);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
