import type { Metadata } from "next";
import SolutionsGrid from "@/components/Solutions/SolutionsGrid";
import SolutionsHero from "@/components/Solutions/SolutionsHero";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/solutions`;

  const title =
    locale === "es" ? "Soluciones por Sector" : "Industry Solutions";

  const description =
    locale === "es"
      ? "Automatizaciones con IA diseñadas para negocios de servicios. Restaurantes, clínicas, hoteles, inmobiliarias y más."
      : "AI-powered automations designed for service businesses. Restaurants, clinics, hotels, real estate, and more.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}/solutions`]),
      ),
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function AutomationsSuitePage() {
  return (
    <main>
      <SolutionsHero />
      <SolutionsGrid />
    </main>
  );
}
