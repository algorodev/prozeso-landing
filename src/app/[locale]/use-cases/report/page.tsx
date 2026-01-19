"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { UseCaseReport } from "@/types/UseCaseReport";
import { ExecutiveSummary } from "@/components/UseCases/Report/ExecutiveSummary";
import { BusinessContextSection } from "@/components/UseCases/Report/BusinessContextSection";
import { PainPointsAnalysis } from "@/components/UseCases/Report/PainPointsAnalysis";
import { AutomationRecommendations } from "@/components/UseCases/Report/AutomationRecommendations";
import { ExpectedImpact } from "@/components/UseCases/Report/ExpectedImpact";
import { ImplementationRoadmap } from "@/components/UseCases/Report/ImplementationRoadmap";
import { NextStepsSection } from "@/components/UseCases/Report/NextStepsSection";
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
        // No report found, redirect back to form
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <main className="mx-auto min-h-dvh max-w-7xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h1 className="page-title mb-4 sm:mb-6">{t("title")}</h1>
          <p className="hero-subtitle text-muted-foreground max-w-3xl">
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

        <div className="space-y-12 sm:space-y-16">
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            <ExecutiveSummary data={report.executiveSummary} />
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            <BusinessContextSection data={report.businessContext} />
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            <PainPointsAnalysis data={report.painPointsAnalysis} />
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            <AutomationRecommendations 
              data={report.automationRecommendations}
              painPoints={report.painPointsAnalysis.painPoints}
            />
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            <ExpectedImpact data={report.expectedImpact} />
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            <ImplementationRoadmap data={report.implementationRoadmap} />
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            <NextStepsSection data={report.nextSteps} />
          </motion.section>
        </div>
      </div>
    </main>
  );
}
