import type { Metadata } from "next";
import CookiesPolicy from "@/components/Legal/CookiesPolicy";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description:
    "Understand how Prozeso uses cookies and similar technologies, what data they collect, and how you can manage your preferences.",
  keywords: [
    "cookies policy",
    "cookie preferences",
    "tracking technologies",
    "analytics cookies",
    "essential cookies",
    "GDPR",
    "ePrivacy",
    "consent management",
  ],
  alternates: {
    canonical: "/legal/cookies",
  },
  openGraph: {
    type: "article",
    url: "/legal/cookies",
    title: "Cookies Policy",
    description:
      "Understand how Prozeso uses cookies and similar technologies, what data they collect, and how you can manage your preferences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prozeso Cookies Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookies Policy",
    description:
      "Understand how Prozeso uses cookies and similar technologies, what data they collect, and how you can manage your preferences.",
    images: ["/og-image.png"],
  },
};

export default function CookiesPage() {
  return (
    <main className="mx-auto min-h-dvh w-full">
      <CookiesPolicy />
    </main>
  );
}
