import type { Metadata } from "next";
import TermsAndConditions from "@/components/Legal/TermsAndConditions";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/legal/terms`;

  const title = "Terms & Conditions";
  const description =
    "Read the Terms and Conditions for using Prozeso services, including acceptable use, limitations of liability, and governing law.";
  const keywords = [
    "terms",
    "terms and conditions",
    "service terms",
    "acceptable use",
    "limitations of liability",
    "user obligations",
    "governing law",
    "agreement",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}/legal/terms`])),
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
          alt: "Prozeso Terms & Conditions",
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

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-dvh w-full">
      <TermsAndConditions />
    </main>
  );
}
