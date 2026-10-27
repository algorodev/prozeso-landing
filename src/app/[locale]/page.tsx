import type { Metadata } from "next";
import FeaturedCase from "@/components/Home/FeaturedCase";
import FinalCTA from "@/components/Home/FinalCTA";
import Hero from "@/components/Home/Hero";
import Partnerships from "@/components/Home/Partnerships";
import Process from "@/components/Home/Process";
import Understanding from "@/components/Home/Understanding";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const keywordsEn = [
    "process automation",
    "business automation",
    "automation for SMEs",
    "operations panel",
    "dashboard",
    "automatic reports",
    "POS integration",
    "ERP integration",
    "AI for business",
    "custom development",
    "restaurant automation",
    "Valencia",
    "Prozeso",
  ];

  const keywordsEs = [
    "automatización de procesos",
    "automatización para empresas",
    "automatización para pymes",
    "panel operativo",
    "cuadro de mando",
    "informes automáticos",
    "integración con TPV",
    "integración con ERP",
    "IA para empresas",
    "desarrollo a medida",
    "automatización para restauración",
    "Valencia",
    "Prozeso",
  ];

  const keywords = locale === "es" ? keywordsEs : keywordsEn;

  const title =
    locale === "es"
      ? "Panel operativo y automatización a medida para empresas"
      : "Custom Operations Panel and Automation for Companies";

  const description =
    locale === "es"
      ? "Prozeso construye el panel interno de tu empresa: conectado a tu TPV, ERP y contabilidad, con módulos de informes, incidencias y formularios, y una IA que trabaja sobre tus datos reales."
      : "Prozeso builds your company's internal panel: connected to your POS, ERP and accounting, with modules for reports, incidents and forms, and an AI that works on your real data.";

  const url = `${base}/${locale}/`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}/`])),
    },
    keywords,
    openGraph: {
      type: "website",
      url,
      title,
      description,
      locale: locale === "es" ? "es_ES" : "en_US",
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

function JsonLd() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://prozeso.com";
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Prozeso",
    url: base,
    logo: `${base}/og-image.png`,
    sameAs: [
      "https://instagram.com/prozeso.ai",
      "https://www.linkedin.com/company/prozeso",
    ],
    description:
      "Custom operations panels and AI automation for companies of 10 to 200 employees.",
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Prozeso",
    url: base,
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify([organization, webSite])}
    </script>
  );
}

export default function Home() {
  return (
    <div>
      <JsonLd />
      <Hero />
      <Understanding />
      <FeaturedCase />
      <Process />
      <Partnerships />
      <FinalCTA />
    </div>
  );
}
