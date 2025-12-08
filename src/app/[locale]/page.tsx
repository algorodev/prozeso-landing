import type { Metadata } from "next";
import CoreAutomations from "@/components/Home/CoreAutomations";
import FinalCTA from "@/components/Home/FinalCTA";
import Hero from "@/components/Home/Hero";
import Impact from "@/components/Home/Impact";
import IndustryDirectAccess from "@/components/Home/IndustryDirectAccess";
import Understanding from "@/components/Home/Understanding";
import { locales } from "@/i18n/config";

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

  return {
    alternates: {
      canonical: `${base}/${locale}/`,
      languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}/`])),
    },
    keywords: pageKeywords,
  };
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Understanding />
      <Impact />
      <IndustryDirectAccess />
      <CoreAutomations />
      <FinalCTA />
    </div>
  );
}
