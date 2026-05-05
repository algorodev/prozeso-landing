import type { Metadata } from "next";
import { AssessmentForm } from "@/components/Start/AssessmentForm";
import { Hero } from "@/components/Start/Hero";
import { Steps } from "@/components/Start/Steps";
import { locales } from "@/i18n/config";
import { buildBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/start`;

  const title =
    locale === "es"
      ? "Empieza — 30 minutos de conversación"
      : "Start — A 30-minute conversation";
  const description =
    locale === "es"
      ? "30 minutos de conversación contigo. Si encajamos, te decimos exactamente por dónde empezar y cuánto cuesta. Si no, te decimos por qué."
      : "A 30-minute conversation with you. If we're a fit, we'll tell you exactly where to start and what it costs. If we're not, we'll tell you why.";
  const keywords =
    locale === "es"
      ? [
          "automatización empresarial",
          "automatización de procesos",
          "automatización de operaciones",
          "automatización para pymes",
          "alternativa a SAP",
          "alternativa a Holded",
        ]
      : [
          "business automation",
          "process automation",
          "operations automation",
          "automation for SMBs",
          "alternative to SAP",
          "alternative to Holded",
        ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}/start`]),
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

export default async function StartPage({ params }: Props) {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const breadcrumb = buildBreadcrumbJsonLd([
    {
      name: locale === "es" ? "Inicio" : "Home",
      url: `${base}/${locale}/`,
    },
    {
      name: locale === "es" ? "Empieza" : "Start",
      url: `${base}/${locale}/start`,
    },
  ]);

  return (
    <main className="mx-auto min-h-dvh max-w-7xl">
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <Hero />
      <Steps />
      <section id="assessment" className="py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <AssessmentForm />
        </div>
      </section>
    </main>
  );
}
