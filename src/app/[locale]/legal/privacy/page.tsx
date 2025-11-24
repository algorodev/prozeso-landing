import type { Metadata } from "next";
import PrivacyPolicy from "@/components/Legal/PrivacyPolicy";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/legal/privacy`;

  const title = "Privacy Policy";
  const description =
    "Learn how Prozeso collects, uses, stores, and shares your personal data, and review your rights and choices.";
  const keywords = [
    "privacy policy",
    "data protection",
    "personal data",
    "data processing",
    "GDPR compliance",
    "user rights",
    "data retention",
    "security",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}/legal/privacy`])),
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
          alt: "Prozeso Privacy Policy",
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

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-dvh w-full">
      <PrivacyPolicy />
    </main>
  );
}
