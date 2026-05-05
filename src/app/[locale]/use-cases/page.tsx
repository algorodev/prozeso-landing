import type { Metadata } from "next";
import FinalCTA from "@/components/Home/FinalCTA";
import { UseCasesHero } from "@/components/UseCases/UseCasesHero";
import { locales } from "@/i18n/config";
import { buildBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/use-cases`;

  const title =
    locale === "es"
      ? "Casos reales — empresas que se parecen a la tuya"
      : "Real cases — companies that look like yours";
  const description =
    locale === "es"
      ? "Cómo trabajan ya empresas como la tuya con Prozeso. En lugar de un formulario que te genera un PDF, te enseñamos casos concretos."
      : "How companies like yours are already working with Prozeso. Instead of a form that spits out a PDF, we show you concrete cases.";

  const keywords =
    locale === "es"
      ? [
          "casos de uso",
          "casos reales",
          "automatización empresarial",
          "automatización de flujos",
          "transformación digital",
        ]
      : [
          "use cases",
          "real cases",
          "business automation",
          "workflow automation",
          "business transformation",
        ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}/use-cases`]),
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

export default async function UseCasesPage({ params }: Props) {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const breadcrumb = buildBreadcrumbJsonLd([
    {
      name: locale === "es" ? "Inicio" : "Home",
      url: `${base}/${locale}/`,
    },
    {
      name: locale === "es" ? "Casos de uso" : "Use Cases",
      url: `${base}/${locale}/use-cases`,
    },
  ]);

  return (
    <main className="">
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <section className="relative isolate min-h-dvh-minus-header overflow-hidden flex items-center">
        <div className="relative w-full container mx-auto py-12 sm:py-16 lg:py-20">
          <UseCasesHero />
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
