"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { UseCaseReport } from "@/types/UseCaseReport";
import { CompactReport } from "@/components/UseCases/Report/CompactReport";
import { StaticNextSteps } from "@/components/UseCases/Report/StaticNextSteps";
import type { Route } from "next";

export default function UseCaseReportPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("useCases.report");
  const [report, setReport] = useState<UseCaseReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedReport = sessionStorage.getItem("useCaseReport");
      if (storedReport) {
        const parsedReport = JSON.parse(storedReport) as UseCaseReport;
        setReport(parsedReport);
      } else {
        router.push(`/${locale}/use-cases` as Route);
      }
    } catch (error) {
      console.error("Failed to load report:", error);
      router.push(`/${locale}/use-cases` as Route);
    } finally {
      setIsLoading(false);
    }
  }, [router, locale]);

  if (isLoading) {
    return (
      <main className="mx-auto min-h-dvh max-w-7xl">
        <div className="container mx-auto py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <p className="text-muted-foreground">{t("loading")}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <main className="mx-auto min-h-dvh max-w-5xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">{t("title")}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle", {
              industry: report.metadata.industry,
              companySize: report.metadata.companySize,
              date: new Date(report.metadata.generatedAt).toLocaleDateString(
                locale,
                { year: "numeric", month: "long", day: "numeric" }
              ),
            })}
          </p>
        </motion.div>

        <div className="space-y-6">
          <CompactReport report={report} />
          <StaticNextSteps />
        </div>
      </div>
    </main>
  );
}
