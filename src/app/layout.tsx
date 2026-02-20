import type { Metadata, Viewport } from "next";
import { Inter_Tight, Sora } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { locales } from "@/i18n/config";
import "./globals.css";

const interTightFont = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
});

const soraFont = Sora({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-sora",
});

const siteName = "Prozeso";
const siteDescription = "Automate your workflows with ease";
const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const GA_ID = process.env.GA_MEASUREMENT_ID!;

const languageAlternates = Object.fromEntries(
  locales.map((l) => [l, `/${l}`]),
) as Record<string, string>;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${siteDescription}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "workflow automation",
    "sales automations",
    "marketing automations",
    "productivity",
    "Prospector",
    "Prozeso",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: languageAlternates,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteName} — ${siteDescription}`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/og-image.png"],
    creator: "@prozeso",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B1221" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1221" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interTightFont.variable} ${soraFont.variable} antialiased font-inter`}
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: true });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
