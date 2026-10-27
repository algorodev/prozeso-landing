import type { Metadata } from "next";
import ProcessHero from "@/components/Process/ProcessHero";
import ProcessTimeline from "@/components/Process/ProcessTimeline";
import { locales } from "@/i18n/config";
import { buildBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/solutions`;

  const title = locale === "es" ? "Cómo trabajamos" : "How We Work";

  const description =
    locale === "es"
      ? "Así ayudamos a empresas a automatizar sus operaciones: desde que te conocemos hasta que el código está integrado y el problema resuelto."
      : "This is how we help companies automate their operations, from the moment we meet you to fully integrated code and the problem solved.";

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

export default async function ProcessPage({ params }: Props) {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const breadcrumb = buildBreadcrumbJsonLd([
    {
      name: locale === "es" ? "Inicio" : "Home",
      url: `${base}/${locale}/`,
    },
    {
      name: locale === "es" ? "Cómo trabajamos" : "How We Work",
      url: `${base}/${locale}/solutions`,
    },
  ]);

  return (
    <main>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <ProcessHero />
      <ProcessTimeline />
    </main>
  );
}
