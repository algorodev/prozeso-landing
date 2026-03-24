import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AutomationBestFor } from "@/components/Automations/Detail/AutomationBestFor";
import { AutomationCTA } from "@/components/Automations/Detail/AutomationCTA";
import { AutomationExamples } from "@/components/Automations/Detail/AutomationExamples";
import { AutomationFeatures } from "@/components/Automations/Detail/AutomationFeatures";
import { AutomationHeroSection } from "@/components/Automations/Detail/AutomationHeroSection";
import { AutomationMetrics } from "@/components/Automations/Detail/AutomationMetrics";
import { AutomationOutcomes } from "@/components/Automations/Detail/AutomationOutcomes";
import { AutomationPoweredBy } from "@/components/Automations/Detail/AutomationPoweredBy";
import { AutomationProblemSolution } from "@/components/Automations/Detail/AutomationProblemSolution";
import { AUTOMATIONS_DETAILS } from "@/data/automations";
import { locales } from "@/i18n/config";
import { LocalizedLink } from "@/i18n/LocalizedLink";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

const ALLOWED_AUTOMATION_IDS = [
  "receptionist-ai",
  "missed-call-auto-callback",
  "appointment-reminder",
  "smart-pre-check-in",
  "no-show-recovery-fee-capture",
  "smart-waitlist-cancellation-filler",
  "abandoned-booking-follow-up",
  "reactivation-recalls",
  "review-booster",
  "billing-and-invoice",
  "in-stay-concierge-upsell",
  "group-event-inquiry-handler",
  "portal-lead-qualification-routing",
  "viewing-follow-up-offer-collector",
  "tenant-onboarding-docs-collection",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const automation = AUTOMATIONS_DETAILS.find((a) => a.slug === id);

  if (!automation) {
    const t = await getTranslations({ locale, namespace: "automations.page" });
    return {
      title: t("notFound.title"),
      description: t("notFound.subtitle", { id }),
    };
  }

  const t = await getTranslations({
    locale,
    namespace: `automations.details.${id}`,
  });

  const title = t.has("name")
    ? t("name")
    : automation.name || automation.headline || "Automation";
  const description = t.has("description")
    ? t("description")
    : automation.description ||
      automation.subheading ||
      automation.problem ||
      "";

  const path = `/automations/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/${locale}${path}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AutomationDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "automations.page" });

  if (!id || !(ALLOWED_AUTOMATION_IDS as readonly string[]).includes(id)) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="page-title text-balance">{t("notFound.title")}</h1>
        <p className="mt-2 body-text text-muted-foreground">
          {t("notFound.subtitle", { id })}
        </p>
        <LocalizedLink
          href="/automations"
          className="mt-6 inline-flex rounded-xl bg-accent px-4 py-2 text-accent-foreground button-primary-text"
        >
          {t("notFound.back")}
        </LocalizedLink>
      </div>
    );
  }

  return (
    <main>
      <AutomationHeroSection />
      <AutomationProblemSolution />
      <AutomationMetrics />
      <AutomationOutcomes />
      <AutomationFeatures />
      <AutomationExamples />
      <AutomationPoweredBy />
      <AutomationBestFor />
      <AutomationCTA />
    </main>
  );
}
