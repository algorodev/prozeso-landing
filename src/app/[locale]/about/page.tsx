import type { Metadata } from "next";
import Hero from "@/components/About/Hero";
import Team from "@/components/About/Team";
import FinalCTA from "@/components/Home/FinalCTA";
import { locales } from "@/i18n/config";
import { buildBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/about`;

  const title = locale === "es" ? "Sobre Nosotros" : "About Us";

  const description =
    locale === "es"
      ? "Conoce al equipo detrás de Prozeso. Construimos el panel interno y las automatizaciones que las empresas de 10 a 200 empleados nunca tuvieron."
      : "Meet the team behind Prozeso. We build the internal panel and the automations that companies of 10 to 200 employees never had.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}/about`]),
      ),
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const breadcrumb = buildBreadcrumbJsonLd([
    {
      name: locale === "es" ? "Inicio" : "Home",
      url: `${base}/${locale}/`,
    },
    {
      name: locale === "es" ? "Sobre Nosotros" : "About Us",
      url: `${base}/${locale}/about`,
    },
  ]);

  return (
    <div>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <Hero />
      <Team />
      <FinalCTA />
    </div>
  );
}
