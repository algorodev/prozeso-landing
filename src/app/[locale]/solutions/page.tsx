import type { Metadata } from "next";
import SolutionsGrid from "@/components/Solutions/SolutionsGrid";
import SolutionsHero from "@/components/Solutions/SolutionsHero";
import { locales } from "@/i18n/config";
import { buildBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/solutions`;

  const title = locale === "es" ? "El catálogo modular" : "The modular catalog";

  const description =
    locale === "es"
      ? "13 áreas funcionales y cientos de automatizaciones documentadas. Empezamos por la pieza donde más sangra tu empresa, ampliamos cuando lo demuestra."
      : "13 functional areas and hundreds of documented automations. We start with the piece where your company bleeds the most, and expand when results back it up.";

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

export default async function AutomationsSuitePage({ params }: Props) {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const breadcrumb = buildBreadcrumbJsonLd([
    {
      name: locale === "es" ? "Inicio" : "Home",
      url: `${base}/${locale}/`,
    },
    {
      name: locale === "es" ? "Soluciones" : "Solutions",
      url: `${base}/${locale}/solutions`,
    },
  ]);

  return (
    <main>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <SolutionsHero />
      <SolutionsGrid />
    </main>
  );
}
