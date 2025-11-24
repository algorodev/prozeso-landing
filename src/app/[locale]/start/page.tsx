import type { Metadata } from "next";
import { AssessmentForm } from "@/components/Start/AssessmentForm";
import { Hero } from "@/components/Start/Hero";
import { Steps } from "@/components/Start/Steps";

export const metadata: Metadata = {
  title: "Start • Free Assessment",
  description:
    "Kick off your automation journey with a quick discovery call. We’ll assess your needs and tailor a perfect plan for your team.",
  keywords: [
    "free assessment",
    "automation assessment",
    "workflow audit",
    "sales automation",
    "marketing automation",
    "process optimization",
  ],
  alternates: {
    canonical: "/start",
  },
  openGraph: {
    type: "website",
    url: "/start",
    title: "Start • Free Assessment",
    description:
      "Kick off your automation journey with a quick discovery call. We’ll assess your needs and tailor a perfect plan for your team.",
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
    title: "Start • Free Assessment",
    description:
      "Kick off your automation journey with a quick discovery call. We’ll assess your needs and tailor a perfect plan for your team.",
    images: ["/og-image.png"],
  },
};

export default function StartPage() {
  return (
    <main className="mx-auto min-h-dvh max-w-7xl">
      <Hero />
      <Steps />
      <section id="assessment" className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <AssessmentForm />
        </div>
      </section>
    </main>
  );
}
