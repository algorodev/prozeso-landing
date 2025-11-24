import type { Metadata } from "next";
import PrivacyPolicy from "@/components/Legal/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Prozeso collects, uses, stores, and shares your personal data, and review your rights and choices.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal data",
    "data processing",
    "GDPR compliance",
    "user rights",
    "data retention",
    "security",
  ],
  alternates: {
    canonical: "/legal/privacy",
  },
  openGraph: {
    type: "article",
    url: "/legal/privacy",
    title: "Privacy Policy",
    description:
      "Learn how Prozeso collects, uses, stores, and shares your personal data, and review your rights and choices.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prozeso Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description:
      "Learn how Prozeso collects, uses, stores, and shares your personal data, and review your rights and choices.",
    images: ["/og-image.png"],
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-dvh w-full">
      <PrivacyPolicy />
    </main>
  );
}
