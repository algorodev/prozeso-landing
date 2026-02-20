import type { Metadata } from "next";
import AutomationsFinalCta from "@/components/Automations/AutomationsFinalCta";
import AutomationsGrid from "@/components/Automations/AutomationsGrid";
import AutomationsHero from "@/components/Automations/AutomationsHero";
import { AUTOMATIONS } from "@/data/automations";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/automations`;

  const count = AUTOMATIONS.length;
  const title =
    locale === "es"
      ? "Automatizaciones — Biblioteca de flujos con IA"
      : "Automations — AI-Powered Workflows Library";
  const description =
    locale === "es"
      ? `Explora ${count}+ automatizaciones listas para negocios de servicios — desde recepcionistas con IA y recordatorios hasta reseñas, facturación y ventas. Combínalas para crear tu stack ideal.`
      : `Browse ${count}+ ready-made automations for service businesses — from receptionist AI and reminders to reviews, billing, and sales enablement. Mix and match to build your perfect automation stack.`;

  const keywords = Array.from(
    new Set(
      [
        "automations",
        "automation library",
        "ai automations",
        "workflows",
        "service businesses",
        "sales automation",
        "marketing automation",
        "operations automation",
        ...AUTOMATIONS.flatMap((a) => [a.title, ...(a.verticals || [])]),
      ]
        .filter(Boolean)
        .map((k) => String(k).toLowerCase()),
    ),
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}/automations`]),
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

export default function AutomationsPage() {
  return (
    <main>
      <AutomationsHero />
      <AutomationsGrid />
      <AutomationsFinalCta />
    </main>
  );
}
