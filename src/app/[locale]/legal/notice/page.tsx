import type { Metadata } from "next";
import LegalNotice from "@/components/Legal/LegalNotice";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/legal/notice`;

  const title = locale === "es" ? "Aviso Legal" : "Legal Notice";
  const description =
    locale === "es"
      ? "Información legal sobre Prozeso, titular del sitio web, conforme a la Ley 34/2002 (LSSI-CE), condiciones de uso, propiedad intelectual y legislación aplicable."
      : "Legal information about Prozeso, website owner, in compliance with Spanish Law 34/2002 (LSSI-CE), use conditions, intellectual property, and governing law.";
  const keywords =
    locale === "es"
      ? [
          "aviso legal",
          "LSSI-CE",
          "ley 34/2002",
          "titular del sitio",
          "condiciones de uso",
          "propiedad intelectual",
          "legislación aplicable",
          "jurisdicción",
        ]
      : [
          "legal notice",
          "LSSI-CE",
          "law 34/2002",
          "website owner",
          "use conditions",
          "intellectual property",
          "governing law",
          "jurisdiction",
        ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}/legal/notice`]),
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
          alt: title,
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

export default function LegalNoticePage() {
  return (
    <main className="mx-auto min-h-dvh w-full">
      <LegalNotice />
    </main>
  );
}
