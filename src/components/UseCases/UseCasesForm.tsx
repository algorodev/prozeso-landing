"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";
import { runUseCasePipelineAction } from "@/lib/actions/use-case-pipeline";
import type { UseCasePipelineStatus } from "@/lib/agents/pipeline";
import { UseCaseReportProgress } from "./UseCaseReportProgress";

type CompanySizeKey = "1-10" | "11-50" | "51-200" | "201-500" | "500+";

type IndustryKey =
  | "restaurants"
  | "beauty"
  | "clinics"
  | "hotels"
  | "realEstate"
  | "retail"
  | "education"
  | "professionalServices"
  | "ecommerce"
  | "manufacturing"
  | "technology"
  | "finance"
  | "legal"
  | "construction"
  | "transportation"
  | "fitness"
  | "entertainment"
  | "nonProfit"
  | "other";

const COMPANY_SIZE_KEYS: CompanySizeKey[] = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
];

const INDUSTRY_KEYS: IndustryKey[] = [
  "restaurants",
  "beauty",
  "clinics",
  "hotels",
  "realEstate",
  "retail",
  "education",
  "professionalServices",
  "ecommerce",
  "manufacturing",
  "technology",
  "finance",
  "legal",
  "construction",
  "transportation",
  "fitness",
  "entertainment",
  "nonProfit",
  "other",
];

export function UseCasesForm() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("useCases.form");

  const Schema = z.object({
    companySize: z.enum(
      COMPANY_SIZE_KEYS as [CompanySizeKey, ...CompanySizeKey[]],
    ),
    industry: z.enum(INDUSTRY_KEYS as [IndustryKey, ...IndustryKey[]]),
    painPoints: z.string().min(10, t("field.painPoints.error")).max(5000),
  });

  type FormValues = z.infer<typeof Schema>;

  const [serverError, setServerError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [pipelineStatus, setPipelineStatus] =
    useState<UseCasePipelineStatus>("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      companySize: undefined as unknown as CompanySizeKey,
      industry: undefined as unknown as IndustryKey,
      painPoints: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setIsGenerating(true);
    setReportGenerated(false);
    setGeneratedReport(null);
    setProgressDialogOpen(true);
    setPipelineStatus("analyzing");

    try {
      const analyzingTimeout = setTimeout(() => {
        setPipelineStatus("generating");
      }, 1500);

      const result = await runUseCasePipelineAction({
        companySize: values.companySize,
        industry: values.industry,
        painPoints: values.painPoints,
        locale: locale as "en" | "es",
      });

      clearTimeout(analyzingTimeout);

      if (!result.success || !result.data) {
        setPipelineStatus("error");
        setServerError(result.error || t("serverError"));
        setIsGenerating(false);
        return;
      }

      setPipelineStatus("completed");

      if (result.data.report) {
        try {
          sessionStorage.setItem(
            "useCaseReport",
            JSON.stringify(result.data.report),
          );

          fetch("https://prozeso.app.n8n.cloud/webhook/report-notification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(result.data.report),
          }).catch((error) => {
            console.error("Failed to send report to webhook:", error);
          });

          setIsGenerating(false);

          setTimeout(() => {
            setProgressDialogOpen(false);
            setPipelineStatus("idle");
            router.push(`/${locale}/use-cases/report` as Route);
          }, 1500);
        } catch (err) {
          console.error("Failed to store report:", err);
          const reportString = JSON.stringify(result.data.report, null, 2);
          setGeneratedReport(reportString);
          setReportGenerated(true);
          setIsGenerating(false);
          setTimeout(() => {
            setProgressDialogOpen(false);
            setPipelineStatus("idle");
          }, 1500);
        }
      } else {
        setIsGenerating(false);
        setTimeout(() => {
          setProgressDialogOpen(false);
          setPipelineStatus("idle");
        }, 1500);
      }
    } catch (_err) {
      setPipelineStatus("error");
      setServerError(t("serverError"));
      setIsGenerating(false);
    }
  };

  return (
    <>
      <UseCaseReportProgress
        open={progressDialogOpen}
        status={pipelineStatus}
        onOpenChange={(open) => {
          setProgressDialogOpen(open);
          if (!open && pipelineStatus !== "completed") {
            setIsGenerating(false);
            setPipelineStatus("idle");
          }
        }}
      />
      <div className="relative w-full py-8 sm:py-12">
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="halo-card">
              <CardHeader className="pb-2">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <CardTitle>{t("title")}</CardTitle>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="card-subtitle text-muted-foreground"
                >
                  {t("subtitle")}
                </motion.p>
              </CardHeader>
              <CardContent className="pt-2">
                {!reportGenerated ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4"
                      >
                        <motion.div
                          initial="hidden"
                          animate="show"
                          variants={{
                            hidden: { opacity: 1 },
                            show: { transition: { staggerChildren: 0.1 } },
                          }}
                          className="grid items-start gap-4 sm:grid-cols-2 min-w-0"
                        >
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, y: 16 },
                              show: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.5 },
                              },
                            }}
                          >
                            <FormField
                              control={form.control}
                              name="companySize"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {t("field.companySize.label")}
                                    <span
                                      aria-hidden
                                      className="text-destructive ml-1"
                                    >
                                      *
                                    </span>
                                  </FormLabel>
                                  <FormControl>
                                    <div className="min-w-0">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full min-w-0 bg-input/30 rounded-md justify-between font-normal overflow-hidden"
                                            aria-label={t(
                                              "field.companySize.label",
                                            )}
                                          >
                                            <span className="truncate flex-1 min-w-0 text-left">
                                              {field.value &&
                                              COMPANY_SIZE_KEYS.includes(
                                                field.value as CompanySizeKey,
                                              )
                                                ? t(
                                                    `field.companySize.options.${field.value}`,
                                                  )
                                                : t(
                                                    "field.companySize.placeholder",
                                                  )}
                                            </span>
                                            <ChevronDown
                                              className="ml-2 size-4 opacity-70 shrink-0"
                                              aria-hidden
                                            />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] bg-background min-w-0 sm:min-w-56">
                                          {COMPANY_SIZE_KEYS.map((key) => (
                                            <DropdownMenuItem
                                              key={key}
                                              onClick={() =>
                                                field.onChange(key)
                                              }
                                              aria-selected={
                                                field.value === key
                                                  ? "true"
                                                  : undefined
                                              }
                                            >
                                              <Check
                                                className={`mr-2 size-4 ${field.value === key ? "opacity-100" : "opacity-0"}`}
                                                aria-hidden
                                              />
                                              {t(
                                                `field.companySize.options.${key}`,
                                              )}
                                            </DropdownMenuItem>
                                          ))}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, y: 16 },
                              show: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.5 },
                              },
                            }}
                          >
                            <FormField
                              control={form.control}
                              name="industry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {t("field.industry.label")}
                                    <span
                                      aria-hidden
                                      className="text-destructive ml-1"
                                    >
                                      *
                                    </span>
                                  </FormLabel>
                                  <FormControl>
                                    <div className="min-w-0">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full min-w-0 bg-input/30 rounded-md justify-between font-normal overflow-hidden"
                                            aria-label={t(
                                              "field.industry.label",
                                            )}
                                          >
                                            <span className="truncate flex-1 min-w-0 text-left">
                                              {field.value &&
                                              INDUSTRY_KEYS.includes(
                                                field.value as IndustryKey,
                                              )
                                                ? t(
                                                    `field.industry.options.${field.value}`,
                                                  )
                                                : t(
                                                    "field.industry.placeholder",
                                                  )}
                                            </span>
                                            <ChevronDown
                                              className="ml-2 size-4 opacity-70 shrink-0"
                                              aria-hidden
                                            />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-0 sm:min-w-56">
                                          {INDUSTRY_KEYS.map((key) => (
                                            <DropdownMenuItem
                                              key={key}
                                              onClick={() =>
                                                field.onChange(key)
                                              }
                                              aria-selected={
                                                field.value === key
                                                  ? "true"
                                                  : undefined
                                              }
                                            >
                                              <Check
                                                className={`mr-2 size-4 ${field.value === key ? "opacity-100" : "opacity-0"}`}
                                                aria-hidden
                                              />
                                              {t(
                                                `field.industry.options.${key}`,
                                              )}
                                            </DropdownMenuItem>
                                          ))}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <FormField
                            control={form.control}
                            name="painPoints"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {t("field.painPoints.label")}
                                  <span
                                    aria-hidden
                                    className="text-destructive ml-1"
                                  >
                                    *
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder={t(
                                      "field.painPoints.placeholder",
                                    )}
                                    rows={8}
                                    required
                                    aria-required="true"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        {serverError && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-md border border-destructive/30 bg-destructive/5 p-3 body-text"
                          >
                            {serverError}
                          </motion.div>
                        )}
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="flex justify-end"
                        >
                          <Button
                            type="submit"
                            className="w-fit"
                            disabled={
                              isGenerating || form.formState.isSubmitting
                            }
                          >
                            {isGenerating || form.formState.isSubmitting ? (
                              <>
                                <Loader2 className="me-2 size-4 animate-spin" />
                                {t("submit.generating")}
                              </>
                            ) : (
                              t("submit.idle")
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="rounded-lg border bg-muted/50 p-6"
                    >
                      <h3 className="mb-4 text-xl font-semibold">
                        {t("report.title")}
                      </h3>
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <div className="whitespace-pre-wrap text-sm">
                          {generatedReport}
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="flex gap-2"
                    >
                      <Button
                        onClick={() => {
                          setReportGenerated(false);
                          setGeneratedReport(null);
                          form.reset();
                        }}
                        variant="outline"
                      >
                        {t("report.generateAnother")}
                      </Button>
                      <Button
                        onClick={() => {
                          if (generatedReport) {
                            const blob = new Blob([generatedReport], {
                              type: "text/plain",
                            });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `prospector-report-${new Date().toISOString().split("T")[0]}.txt`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }
                        }}
                      >
                        {t("report.download")}
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
