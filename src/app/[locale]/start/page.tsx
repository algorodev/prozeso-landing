import type { Metadata } from "next";
import { AssessmentForm } from "@/components/Start/AssessmentForm";
import { Hero } from "@/components/Start/Hero";
import { Steps } from "@/components/Start/Steps";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/start`;

  const title = "Start • Free Assessment";
  const description =
    "Kick off your automation journey with a quick discovery call. We’ll assess your needs and tailor a perfect plan for your team.";
  const keywords = [
    "free assessment",
    "automation assessment",
    "workflow audit",
    "sales automation",
    "marketing automation",
    "process optimization",
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
          alt: "Start your free automation assessment with Prozeso",
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

export default function StartPage() {
  return (
    <main className="mx-auto min-h-dvh max-w-7xl">
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
