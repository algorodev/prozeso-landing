import type { Metadata } from "next";
import FinalCTA from "@/components/Home/FinalCTA";
import { UseCasesForm } from "@/components/UseCases/UseCasesForm";
import { UseCasesHero } from "@/components/UseCases/UseCasesHero";
import UseCasesShowcase from "@/components/UseCases/UseCasesShowcase";
import { Separator } from "@/components/ui/Separator";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/use-cases`;

  const title = "Use Cases • AI-Powered Solutions for Your Business";
  const description =
    "Discover how our AI-powered automations can help transform your business. Generate a personalized report on how we can help you automate and scale your operations.";

  const keywords = [
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
          alt: "Discover AI-powered use cases for your business with Prozeso",
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
      <Separator className="my-20" />
      <div className="mb-20">
        <UseCasesShowcase />
      </div>
      <FinalCTA />
    </main>
  );
}
