"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { AUTOMATIONS } from "@/app/[locale]/automations/data";
import DetailHero from "@/components/Automations/DetailHero";
import Integrations from "@/components/Automations/Integrations";
import Metrics from "@/components/Automations/Metrics";
import PricingSection from "@/components/Automations/PricingSection";
import ProblemSolution from "@/components/Automations/ProblemSolution";
import Steps from "@/components/Automations/Steps";
import { LocalizedLink } from "@/i18n/LocalizedLink";
import { DETAILS } from "./data";

export default function AutomationDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const automation = useMemo(() => AUTOMATIONS.find((a) => a.id === id), [id]);

  if (!automation) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Automation not found</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn't find an automation with id "{id}".
        </p>
        <LocalizedLink
          href="/automations"
          className="mt-6 inline-flex rounded-xl bg-accent px-4 py-2 text-sm text-accent-foreground"
        >
          Back to catalog
        </LocalizedLink>
      </div>
    );
  }

  const detail = DETAILS[automation.id];

  return (
    <main className="overflow-x-clip">
      <DetailHero automation={automation} detail={detail} />
      <ProblemSolution detail={detail} />
      <Steps detail={detail} />
      <Metrics detail={detail} />
      <Integrations detail={detail} />
      <PricingSection automationId={automation.id} />
    </main>
  );
}
