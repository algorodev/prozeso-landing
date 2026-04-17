import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BubbleDiagram from "@/components/Home/BubbleDiagram";
import FinalCTA from "@/components/Home/FinalCTA";
import Hero from "@/components/Home/Hero";
import Impact from "@/components/Home/Impact";
import Partnerships from "@/components/Home/Partnerships";
import Testimonials from "@/components/Home/Testimonials";
import TrustedBy from "@/components/Home/TrustedBy";
import Understanding from "@/components/Home/Understanding";
import { locales } from "@/i18n/config";

const TESTIMONIAL_IDS = ["1", "2", "3", "4", "5", "6", "7"] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const baseKeywords = [
    "workflow automation",
    "sales automations",
    "marketing automations",
    "productivity",
    "Prospector",
    "Prozeso",
  ];

  const keywordsEn = [
    "conversational AI",
    "voice AI",
    "AI receptionist",
    "appointment reminders",
    "smart reschedule",
    "missed call auto callback",
    "bookings automation",
    "scheduling automation",
    "reduce no-shows",
    "customer experience",
    "analytics and reporting",
    "GDPR compliance",
    "security",
    "restaurants automation",
    "hair and beauty automation",
    "clinics and health automation",
    "hotels automation",
    "real estate automation",
    "SMS reminders",
    "WhatsApp reminders",
    "calendar integration",
    "CRM integration",
    "increase ROI",
    "recover revenue",
    "reduce operational load",
  ];

  const keywordsEs = [
    "IA conversacional",
    "IA de voz",
    "recepcionista con IA",
    "recordatorios de citas",
    "reprogramación inteligente",
    "devolución automática de llamadas perdidas",
    "automatización de reservas",
    "automatización de agenda",
    "reducir ausencias",
    "experiencia del cliente",
    "analítica y reportes",
    "cumplimiento RGPD",
    "seguridad",
    "automatización para restaurantes",
    "automatización para peluquería y belleza",
    "automatización para clínicas y salud",
    "automatización para hoteles",
    "automatización para inmobiliarias",
    "recordatorios por SMS",
    "recordatorios por WhatsApp",
    "integración con calendario",
    "integración con CRM",
    "aumentar ROI",
    "recuperar ingresos",
    "reducir carga operativa",
  ];

  const pageKeywords = [
    ...baseKeywords,
    ...(locale === "es" ? keywordsEs : keywordsEn),
  ];

  const title =
    locale === "es"
      ? "Automatización de flujos de trabajo con IA para negocios de servicios"
      : "AI-Powered Workflow Automation for Service Businesses";

  const description =
    locale === "es"
      ? "Prozeso ayuda a negocios de servicios a automatizar sus operaciones con IA — recepcionistas virtuales, recordatorios inteligentes, facturación y reseñas."
      : "Prozeso helps service businesses automate operations with AI — voice receptionists, smart reminders, billing, and reviews. Start your free assessment today.";

  const url = `${base}/${locale}/`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}/`])),
    },
    keywords: pageKeywords,
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

async function JsonLd({ locale }: { locale: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://prozeso.com";
  const t = await getTranslations({ locale, namespace: "home.testimonials" });

  const reviews = TESTIMONIAL_IDS.map((id) => ({
    "@type": "Review",
    reviewBody: t(`items.${id}.quote`),
    reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    author: {
      "@type": "Person",
      name: t(`items.${id}.name`),
      jobTitle: t(`items.${id}.role`),
    },
  }));

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
      "AI-powered workflow automation platform for service businesses.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5,
      bestRating: 5,
      reviewCount: reviews.length,
    },
    review: reviews,
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

export default async function Home({ params }: Props) {
  const { locale } = await params;
  return (
    <div>
      <JsonLd locale={locale} />
      <Hero />
      <Understanding />
      <BubbleDiagram />
      <Impact />
      <Partnerships />
      <Testimonials />
      <FinalCTA />
      <TrustedBy />
    </div>
  );
}
