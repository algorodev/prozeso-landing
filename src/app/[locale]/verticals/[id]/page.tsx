import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import VerticalAutomations from "@/components/Verticals/VerticalAutomations";
import VerticalCTA from "@/components/Verticals/VerticalCTA";
import VerticalFaqs from "@/components/Verticals/VerticalFaqs";
import VerticalHero from "@/components/Verticals/VerticalHero";
import VerticalImpact from "@/components/Verticals/VerticalImpact";
import VerticalJourney from "@/components/Verticals/VerticalJourney";
import VerticalReality from "@/components/Verticals/VerticalReality";
import { VERTICALS } from "@/data/verticals";
import { LocalizedLink } from "@/i18n/LocalizedLink";

type Props = {
  params: Promise<{ id: string; locale?: string }>;
};

const ALLOWED_VERTICAL_IDS = [
  "clinics-and-health",
  "hair-and-beauty",
  "hotels",
  "restaurants",
  "real-estate",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale = "es" } = await params;

  const isAllowed =
    !!id && (ALLOWED_VERTICAL_IDS as readonly string[]).includes(id);

  const t = await getTranslations({ locale, namespace: `verticals.${id}` });

  const title =
    isAllowed && t.has("name")
      ? t("name")
      : (VERTICALS as Record<string, { name?: string; headline?: string }>)[
          id ?? ""
        ]?.name || "Verticals";

  const description =
    isAllowed && t.has("subheading")
      ? t("subheading")
      : (
          VERTICALS as Record<
            string,
            { description?: string; subheading?: string }
          >
        )[id ?? ""]?.description ||
        "Explore AI automations tailored for your industry.";

  const path = `/verticals/${id ?? ""}`;
  const localizedPath = locale ? `/${locale}${path}` : path;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
    },
    openGraph: {
      title,
      description,
      url: localizedPath,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function VerticalPage({ params }: Props) {
  const { id } = await params;
  const t = await getTranslations("verticals.page");

  if (!id || !(ALLOWED_VERTICAL_IDS as readonly string[]).includes(id)) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="page-title text-balance">{t("notFound.title")}</h1>
        <p className="mt-2 body-text text-muted-foreground">
          {t("notFound.subtitle", { id })}
        </p>
        <LocalizedLink
          href="/"
          className="mt-6 inline-flex rounded-xl bg-accent px-4 py-2 text-accent-foreground button-primary-text"
        >
          {t("notFound.back")}
        </LocalizedLink>
      </div>
    );
  }

  return (
    <main>
      <VerticalHero />
      <VerticalReality />
      <VerticalImpact />
      <VerticalAutomations />
      <VerticalJourney />
      <VerticalFaqs />
      <VerticalCTA />
    </main>
  );
}
