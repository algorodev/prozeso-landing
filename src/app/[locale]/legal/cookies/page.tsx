import type { Metadata } from "next";
import CookiesPolicy from "@/components/Legal/CookiesPolicy";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/legal/cookies`;

  const title = "Cookies Policy";
  const description =
    "Understand how Prozeso uses cookies and similar technologies, what data they collect, and how you can manage your preferences.";
  const keywords = [
    "cookies policy",
    "cookie preferences",
    "tracking technologies",
    "analytics cookies",
    "essential cookies",
    "GDPR",
    "ePrivacy",
    "consent management",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}/legal/cookies`]),
      ),
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Prozeso Cookies Policy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default function CookiesPage() {
  return (
    <main className="mx-auto min-h-dvh w-full">
      <CookiesPolicy />
    </main>
  );
}
