import type { Metadata } from "next";
import FinalCTA from "@/components/Home/FinalCTA";
import { UseCasesForm } from "@/components/UseCases/UseCasesForm";
import { UseCasesHero } from "@/components/UseCases/UseCasesHero";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/use-cases`;

  const title =
    locale === "es"
      ? "Casos de uso — Soluciones con IA para tu negocio"
      : "Use Cases — AI-Powered Solutions for Your Business";
  const description =
    locale === "es"
      ? "Descubre cómo nuestras automatizaciones con IA pueden transformar tu negocio. Genera un informe personalizado sobre cómo automatizar y escalar tus operaciones."
      : "Discover how our AI-powered automations can help transform your business. Generate a personalized report on how we can help you automate and scale your operations.";

  const keywords =
    locale === "es"
      ? [
          "casos de uso",
          "automatización empresarial",
          "soluciones con IA",
          "ejemplos de automatización",
          "transformación digital",
          "automatización de flujos",
          "automatización para servicios",
        ]
      : [
          "use cases",
          "business automation",
          "AI solutions",
          "automation examples",
          "business transformation",
          "workflow automation",
          "service business automation",
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

export default function UseCasesPage() {
  return (
    <main className="">
      <section className="relative isolate min-h-dvh-minus-header overflow-hidden flex items-center">
        <div className="relative w-full container mx-auto py-12 sm:py-16 lg:py-20">
          <UseCasesHero />
          <UseCasesForm />
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
