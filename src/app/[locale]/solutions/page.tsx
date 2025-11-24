import type { Metadata } from "next";
import { SolutionsHeader } from "@/components/SolutionsHeader";
import { SolutionsGrid } from "@/components/SolutionsGrid";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/solutions`;

  const title = "Solutions • Tailored Automation Playbooks";
  const description =
    "Explore ready-made automation playbooks for restaurants, beauty, clinics, hotels, and real estate. Discover what’s possible and start your free assessment.";
  const keywords = [
    "solutions",
    "automation playbooks",
    "industry templates",
    "restaurants",
    "beauty",
    "clinics",
    "hotels",
    "real estate",
    "sales automation",
    "marketing automation",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}/solutions`])),
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
          alt: "Explore industry solutions and automation playbooks with Prozeso",
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

export default function SolutionsPage() {
  return (
    <main className="relative">
      <SolutionsHeader />
      <SolutionsGrid />
    </main>
  );
}
