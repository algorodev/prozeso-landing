import type { Metadata } from "next";
import type { ReactNode } from "react";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
  children: ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/use-cases/report`;

  const title =
    locale === "es"
      ? "Tu informe de automatización personalizado"
      : "Your Personalized Automation Report";
  const description =
    locale === "es"
      ? "Consulta tu informe personalizado con recomendaciones de automatización basadas en las necesidades de tu negocio."
      : "View your personalized report with automation recommendations tailored to your business needs.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}/use-cases/report`]),
      ),
    },
    openGraph: {
      type: "website",
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

export default function ReportLayout({ children }: Props) {
  return children;
}
