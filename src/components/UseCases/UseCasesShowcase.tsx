"use client";

import { motion } from "framer-motion";
import { Cog, DollarSign, Headphones, Target, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { type KeyboardEvent, useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

type BusinessArea =
  | "operations"
  | "sales"
  | "hr"
  | "finance"
  | "customerService";

type UseCase = {
  id: string;
  translationKey: string;
};

const BUSINESS_AREAS: {
  id: BusinessArea;
  icon: typeof Cog;
  labelKey: string;
  chartColor: 1 | 2 | 3 | 4 | 5;
}[] = [
  {
    id: "operations",
    icon: Cog,
    labelKey: "operations",
    chartColor: 1,
  },
  {
    id: "sales",
    icon: Target,
    labelKey: "sales",
    chartColor: 2,
  },
  {
    id: "hr",
    icon: Users,
    labelKey: "hr",
    chartColor: 3,
  },
  {
    id: "finance",
    icon: DollarSign,
    labelKey: "finance",
    chartColor: 4,
  },
  {
    id: "customerService",
    icon: Headphones,
    labelKey: "customerService",
    chartColor: 5,
  },
];

const USE_CASES: Record<BusinessArea, UseCase[]> = {
  operations: [
    { id: "op1", translationKey: "workflowAutomation" },
    { id: "op2", translationKey: "inventoryManagement" },
    { id: "op3", translationKey: "shippingLogistics" },
    { id: "op4", translationKey: "processOptimization" },
  ],
  sales: [
    { id: "sa1", translationKey: "leadQualification" },
    { id: "sa2", translationKey: "salesForecasting" },
    { id: "sa3", translationKey: "proposalGeneration" },
    { id: "sa4", translationKey: "customerRetention" },
  ],
  hr: [
    { id: "hr1", translationKey: "intelligentRecruitment" },
    { id: "hr2", translationKey: "automatedOnboarding" },
    { id: "hr3", translationKey: "leaveAttendanceManagement" },
    { id: "hr4", translationKey: "performanceReviews" },
  ],
  finance: [
    { id: "fi1", translationKey: "automatedInvoicing" },
    { id: "fi2", translationKey: "expenseManagement" },
    { id: "fi3", translationKey: "bankReconciliation" },
    { id: "fi4", translationKey: "financialReporting" },
  ],
  customerService: [
    { id: "cs1", translationKey: "aiPoweredChatbot" },
    { id: "cs2", translationKey: "smartTicketRouting" },
    { id: "cs3", translationKey: "sentimentAnalysis" },
    { id: "cs4", translationKey: "knowledgeBaseIntegration" },
  ],
};

export default function UseCasesShowcase() {
  const [selectedArea, setSelectedArea] = useState<BusinessArea>("operations");
  const tShowcase = useTranslations("useCases.showcase");
  const t = useTranslations("useCases");

  const currentUseCases = USE_CASES[selectedArea];
  const selectedAreaConfig = BUSINESS_AREAS.find((a) => a.id === selectedArea);

  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const currentIndex = BUSINESS_AREAS.findIndex(
        (a) => a.id === selectedArea,
      );
      let nextIndex = -1;

      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % BUSINESS_AREAS.length;
      } else if (e.key === "ArrowLeft") {
        nextIndex =
          (currentIndex - 1 + BUSINESS_AREAS.length) % BUSINESS_AREAS.length;
      } else if (e.key === "Home") {
        nextIndex = 0;
      } else if (e.key === "End") {
        nextIndex = BUSINESS_AREAS.length - 1;
      }

      if (nextIndex >= 0) {
        e.preventDefault();
        const nextArea = BUSINESS_AREAS[nextIndex];
        setSelectedArea(nextArea.id);
        document.getElementById(`tab-${nextArea.id}`)?.focus();
      }
    },
    [selectedArea],
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="section-title mb-4"
        >
          {tShowcase("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="hero-subtitle text-muted-foreground max-w-3xl mx-auto"
        >
          {tShowcase("subtitle")}
        </motion.p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}
        variants={{
          hidden: { opacity: 1 },
          show: { transition: { staggerChildren: 0.05 } },
        }}
        role="tablist"
        aria-label={tShowcase("title")}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {BUSINESS_AREAS.map((area) => {
          const Icon = area.icon;
          const isSelected = selectedArea === area.id;

          return (
            <motion.div
              key={area.id}
              role="presentation"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <Button
                id={`tab-${area.id}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`panel-${area.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedArea(area.id)}
                onKeyDown={handleTabKeyDown}
                variant={"outline"}
                className={`rounded-lg px-4 py-2 h-auto flex items-center gap-2 ${
                  isSelected
                    ? "text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                <Icon className="size-4" />
                <span>
                  {tShowcase(`areas.${area.labelKey}`) || area.labelKey}
                </span>
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        key={selectedArea}
        id={`panel-${selectedArea}`}
        role="tabpanel"
        aria-labelledby={`tab-${selectedArea}`}
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 1 },
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {currentUseCases.map((useCase) => {
          const chartNum = selectedAreaConfig?.chartColor || 1;
          // Map chart colors to actual hex values
          const chartColorsMap: Record<number, string> = {
            1: "#4a7cff", // brand-blue
            2: "#30e6a5", // brand-mint
            3: "#a394ff", // brand-lavender
            4: "#22ffe8", // brand-cyan
            5: "#ff9500", // brand-orange
          };
          const chartColorValue = chartColorsMap[chartNum] || chartColorsMap[1];

          return (
            <motion.div
              key={useCase.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card
                className="border-x-none border-b-none border-t-4 shadow-sm"
                style={{
                  borderTopColor: chartColorValue,
                  backgroundColor: `${chartColorValue}1A`, // 10% opacity in hex (1A = ~10%)
                }}
              >
                <CardContent className="pt-6 pb-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {t(`${useCase.translationKey}.title`)}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-base leading-relaxed">
                    {t(`${useCase.translationKey}.description`)}
                  </p>
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex items-start gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: chartColorValue }}
                      />
                      <p
                        className="text-sm font-medium"
                        style={{ color: chartColorValue }}
                      >
                        {t(`${useCase.translationKey}.metric1`)}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: chartColorValue }}
                      />
                      <p
                        className="text-sm font-medium"
                        style={{ color: chartColorValue }}
                      >
                        {t(`${useCase.translationKey}.metric2`)}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{
                      color: chartColorValue,
                    }}
                  >
                    {t(`${useCase.translationKey}.benefit`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
