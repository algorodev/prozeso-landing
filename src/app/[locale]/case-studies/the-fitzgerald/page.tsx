import type { Metadata } from "next";
import CaseStudyCta from "@/components/CaseStudy/Cta";
import CaseStudyHero from "@/components/CaseStudy/Hero";
import CaseStudyNarrative from "@/components/CaseStudy/Narrative";
import CaseStudySidebar from "@/components/CaseStudy/Sidebar";
import { locales } from "@/i18n/config";
import { buildBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";

const NAMESPACE = "caseStudies.theFitzgerald";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${base}/${locale}/case-studies/the-fitzgerald`;

  const title =
    locale === "es"
      ? "Caso de estudio: The Fitzgerald"
      : "Case study: The Fitzgerald";

  const description =
    locale === "es"
      ? "Cómo construimos, a medida, el panel operativo que un grupo de restauración necesitaba: automatizaciones, informes validados al céntimo y gestión de incidencias en tiempo real."
      : "How we built, from scratch, the operating panel a restaurant group needed: automations, penny-accurate reports, and real-time incident management.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${base}/${l}/case-studies/the-fitzgerald`]),
      ),
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TheFitzgeraldCaseStudyPage({ params }: Props) {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const breadcrumb = buildBreadcrumbJsonLd([
    {
      name: locale === "es" ? "Inicio" : "Home",
      url: `${base}/${locale}/`,
    },
    {
      name: "The Fitzgerald",
      url: `${base}/${locale}/case-studies/the-fitzgerald`,
    },
  ]);

  return (
    <main>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <section className="pt-12 pb-20 sm:pt-16 sm:pb-28 px-6">
        <div className="container mx-auto max-w-[1280px]">
          <div className="lg:grid lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] lg:gap-12 xl:gap-16">
            <CaseStudySidebar
              namespace={NAMESPACE}
              logoSrc="/assets/clients/thefitzgerald-white.svg"
              logoAlt="The Fitzgerald"
            />
            <div className="min-w-0">
              <CaseStudyHero namespace={NAMESPACE} />
              <CaseStudyNarrative namespace={NAMESPACE} />
            </div>
          </div>
        </div>
      </section>
      <CaseStudyCta namespace={NAMESPACE} />
    </main>
  );
}
