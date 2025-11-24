import type { Metadata } from "next";
import TermsAndConditions from "@/components/Legal/TermsAndConditions";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms and Conditions for using Prozeso services, including acceptable use, limitations of liability, and governing law.",
  keywords: [
    "terms",
    "terms and conditions",
    "service terms",
    "acceptable use",
    "limitations of liability",
    "user obligations",
    "governing law",
    "agreement",
  ],
  alternates: {
    canonical: "/legal/terms",
  },
  openGraph: {
    type: "article",
    url: "/legal/terms",
    title: "Terms & Conditions",
    description:
      "Read the Terms and Conditions for using Prozeso services, including acceptable use, limitations of liability, and governing law.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prozeso Terms & Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions",
    description:
      "Read the Terms and Conditions for using Prozeso services, including acceptable use, limitations of liability, and governing law.",
    images: ["/og-image.png"],
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-dvh w-full">
      <TermsAndConditions />
    </main>
  );
}
