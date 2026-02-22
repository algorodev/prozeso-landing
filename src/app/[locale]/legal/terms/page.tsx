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

  const title =
    locale === "es" ? "Términos y condiciones" : "Terms & Conditions";
  const description =
    locale === "es"
      ? "Lee los Términos y Condiciones de uso de los servicios de Prozeso, incluyendo uso aceptable, limitaciones de responsabilidad y ley aplicable."
      : "Read the Terms and Conditions for using Prozeso services, including acceptable use, limitations of liability, and governing law.";
  const keywords =
    locale === "es"
      ? [
          "términos",
          "términos y condiciones",
          "condiciones del servicio",
          "uso aceptable",
          "limitaciones de responsabilidad",
          "obligaciones del usuario",
          "ley aplicable",
          "acuerdo",
        ]
      : [
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
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}/legal/terms`]),
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

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-dvh w-full">
      <TermsAndConditions />
    </main>
  );
}
