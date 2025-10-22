import type { Metadata } from "next";
import Benefits from "@/components/Home/Benefits";
import FinalCTA from "@/components/Home/FinalCTA";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import StatsSection from "@/components/Home/StatsSection";
import StoryDeck from "@/components/Home/StoryDeck";
import Testimonials from "@/components/Home/Testimonials";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    alternates: {
      canonical: `${base}/${locale}/`,
      languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}/`])),
    },
  };
}

export default function Home() {
  return (
    <div>
      <Hero />
      <StoryDeck />
      <Benefits />
      {/*<StatsSection />*/}
      <HowItWorks />
      {/*<Testimonials />*/}
      <FinalCTA />
    </div>
  );
}
