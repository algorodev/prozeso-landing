"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  Clock,
  Database,
  DollarSign,
  Headphones,
  Heart,
  Loader2,
  MessageCircle,
  PhoneMissed,
  Repeat,
  Rocket,
  ShieldCheck,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { runUseCasePipelineAction } from "@/lib/actions/use-case-pipeline";
import type { UseCasePipelineStatus } from "@/lib/agents/pipeline";
import type {
  BusinessGoal,
  BusinessRole,
  PainPointChip,
} from "@/types/UseCaseReport";
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

const ROLE_KEYS: BusinessRole[] = [
  "founder",
  "operations",
  "sales",
  "customerService",
  "marketing",
  "other",
];

const ROLE_ICONS: Record<BusinessRole, typeof Briefcase> = {
  founder: Rocket,
  operations: Briefcase,
  sales: TrendingUp,
  customerService: Headphones,
  marketing: Target,
  other: Users,
};

const PAIN_POINT_KEYS: PainPointChip[] = [
  "missedCalls",
  "noShows",
  "manualAdmin",
  "slowResponse",
  "leadLeakage",
  "schedulingChaos",
  "dataScattered",
  "repetitiveQuestions",
];

const PAIN_POINT_ICONS: Record<PainPointChip, typeof PhoneMissed> = {
  missedCalls: PhoneMissed,
  noShows: UserCheck,
  manualAdmin: Repeat,
  slowResponse: Clock,
  leadLeakage: TrendingUp,
  schedulingChaos: Clock,
  dataScattered: Database,
  repetitiveQuestions: MessageCircle,
};

const GOAL_KEYS: BusinessGoal[] = [
  "saveTime",
  "reduceCosts",
  "scaleSales",
  "improveCx",
  "reduceErrors",
];

const GOAL_ICONS: Record<BusinessGoal, typeof Zap> = {
  saveTime: Zap,
  reduceCosts: DollarSign,
  scaleSales: TrendingUp,
  improveCx: Heart,
  reduceErrors: ShieldCheck,
};

type WizardState = {
  industry: IndustryKey | null;
  companySize: CompanySizeKey | null;
  role: BusinessRole | null;
  painPointChips: PainPointChip[];
  painPointsDetail: string;
  goal: BusinessGoal | null;
};

const TOTAL_STEPS = 4;

export function UseCasesForm() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("useCases.wizard");
  const tField = useTranslations("useCases.form.field");

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [state, setState] = useState<WizardState>({
    industry: null,
    companySize: null,
    role: null,
    painPointChips: [],
    painPointsDetail: "",
    goal: null,
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [pipelineStatus, setPipelineStatus] =
    useState<UseCasePipelineStatus>("idle");

  const canContinue = useMemo(() => {
    if (step === 1) return !!state.industry;
    if (step === 2) return !!state.companySize && !!state.role;
    if (step === 3)
      return (
        state.painPointChips.length > 0 ||
        state.painPointsDetail.trim().length >= 10
      );
    if (step === 4) return !!state.goal;
    return false;
  }, [step, state]);

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => (s + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => (s - 1) as 1 | 2 | 3 | 4);
    }
  };

  const togglePainPoint = (chip: PainPointChip) => {
    setState((prev) => ({
      ...prev,
      painPointChips: prev.painPointChips.includes(chip)
        ? prev.painPointChips.filter((c) => c !== chip)
        : [...prev.painPointChips, chip],
    }));
  };

  const handleSubmit = async () => {
    if (!state.industry || !state.companySize || !state.role || !state.goal) {
      return;
    }

    setServerError(null);
    setIsGenerating(true);
    setProgressDialogOpen(true);
    setPipelineStatus("analyzing");

    try {
      const analyzingTimeout = setTimeout(() => {
        setPipelineStatus("generating");
      }, 1500);

      const result = await runUseCasePipelineAction({
        companySize: state.companySize,
        industry: state.industry,
        role: state.role,
        painPointChips: state.painPointChips,
        painPointsDetail: state.painPointsDetail,
        goal: state.goal,
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.data.report),
          }).catch((error) => {
            console.error("Failed to send report to webhook:", error);
          });
        } catch (err) {
          console.error("Failed to store report:", err);
        }
      }

      setIsGenerating(false);
      setTimeout(() => {
        setProgressDialogOpen(false);
        setPipelineStatus("idle");
        router.push(`/${locale}/use-cases/report` as Route);
      }, 1500);
    } catch (_err) {
      setPipelineStatus("error");
      setServerError(t("serverError"));
      setIsGenerating(false);
    }
  };

  const progress = (step / TOTAL_STEPS) * 100;

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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="halo-card">
              <CardContent className="pt-6 pb-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>
                      {t("progress", { current: step, total: TOTAL_STEPS })}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                  >
                    {step === 1 && (
                      <StepIndustry
                        value={state.industry}
                        onChange={(v) =>
                          setState((p) => ({ ...p, industry: v }))
                        }
                        title={t("step1.title")}
                        subtitle={t("step1.subtitle")}
                        getLabel={(k) => tField(`industry.options.${k}`)}
                      />
                    )}
                    {step === 2 && (
                      <StepContext
                        companySize={state.companySize}
                        role={state.role}
                        onCompanySize={(v) =>
                          setState((p) => ({ ...p, companySize: v }))
                        }
                        onRole={(v) => setState((p) => ({ ...p, role: v }))}
                        title={t("step2.title")}
                        subtitle={t("step2.subtitle")}
                        sizeLabel={t("step2.sizeLabel")}
                        roleLabel={t("step2.roleLabel")}
                        getSizeLabel={(k) => tField(`companySize.options.${k}`)}
                        getRoleLabel={(k) => t(`step2.roles.${k}`)}
                      />
                    )}
                    {step === 3 && (
                      <StepPainPoints
                        chips={state.painPointChips}
                        detail={state.painPointsDetail}
                        onToggle={togglePainPoint}
                        onDetailChange={(v) =>
                          setState((p) => ({ ...p, painPointsDetail: v }))
                        }
                        title={t("step3.title")}
                        subtitle={t("step3.subtitle")}
                        detailLabel={t("step3.detailLabel")}
                        detailPlaceholder={t("step3.detailPlaceholder")}
                        getChipLabel={(k) => t(`step3.chips.${k}`)}
                      />
                    )}
                    {step === 4 && (
                      <StepGoal
                        value={state.goal}
                        onChange={(v) => setState((p) => ({ ...p, goal: v }))}
                        title={t("step4.title")}
                        subtitle={t("step4.subtitle")}
                        getLabel={(k) => t(`step4.goals.${k}`)}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {serverError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 p-3 body-text"
                  >
                    {serverError}
                  </motion.div>
                )}

                <div className="mt-8 flex items-center justify-between gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={step === 1 || isGenerating}
                  >
                    <ArrowLeft className="me-2 size-4" />
                    {t("back")}
                  </Button>
                  {step < TOTAL_STEPS ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!canContinue}
                    >
                      {t("next")}
                      <ArrowRight className="ms-2 size-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canContinue || isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="me-2 size-4 animate-spin" />
                          {t("generating")}
                        </>
                      ) : (
                        <>
                          {t("submit")}
                          <ArrowRight className="ms-2 size-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-foreground mb-1.5">{title}</h2>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  );
}

function Chip({
  selected,
  onClick,
  icon: Icon,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  icon?: typeof Zap;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition-all ${
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-input/20 text-muted-foreground hover:border-border/80 hover:text-foreground"
      }`}
    >
      {Icon && <Icon className="size-4 shrink-0" aria-hidden />}
      <span>{label}</span>
      {selected && (
        <Check className="size-3.5 ms-auto text-primary" aria-hidden />
      )}
    </button>
  );
}

function StepIndustry({
  value,
  onChange,
  title,
  subtitle,
  getLabel,
}: {
  value: IndustryKey | null;
  onChange: (v: IndustryKey) => void;
  title: string;
  subtitle: string;
  getLabel: (k: IndustryKey) => string;
}) {
  return (
    <div>
      <StepHeader title={title} subtitle={subtitle} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {INDUSTRY_KEYS.map((key) => (
          <Chip
            key={key}
            selected={value === key}
            onClick={() => onChange(key)}
            icon={Building2}
            label={getLabel(key)}
          />
        ))}
      </div>
    </div>
  );
}

function StepContext({
  companySize,
  role,
  onCompanySize,
  onRole,
  title,
  subtitle,
  sizeLabel,
  roleLabel,
  getSizeLabel,
  getRoleLabel,
}: {
  companySize: CompanySizeKey | null;
  role: BusinessRole | null;
  onCompanySize: (v: CompanySizeKey) => void;
  onRole: (v: BusinessRole) => void;
  title: string;
  subtitle: string;
  sizeLabel: string;
  roleLabel: string;
  getSizeLabel: (k: CompanySizeKey) => string;
  getRoleLabel: (k: BusinessRole) => string;
}) {
  return (
    <div>
      <StepHeader title={title} subtitle={subtitle} />
      <div className="mb-5">
        <p className="text-sm font-medium text-foreground mb-2">{sizeLabel}</p>
        <div className="flex flex-wrap gap-2">
          {COMPANY_SIZE_KEYS.map((key) => (
            <Chip
              key={key}
              selected={companySize === key}
              onClick={() => onCompanySize(key)}
              icon={Users}
              label={getSizeLabel(key)}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-foreground mb-2">{roleLabel}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ROLE_KEYS.map((key) => (
            <Chip
              key={key}
              selected={role === key}
              onClick={() => onRole(key)}
              icon={ROLE_ICONS[key]}
              label={getRoleLabel(key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepPainPoints({
  chips,
  detail,
  onToggle,
  onDetailChange,
  title,
  subtitle,
  detailLabel,
  detailPlaceholder,
  getChipLabel,
}: {
  chips: PainPointChip[];
  detail: string;
  onToggle: (chip: PainPointChip) => void;
  onDetailChange: (v: string) => void;
  title: string;
  subtitle: string;
  detailLabel: string;
  detailPlaceholder: string;
  getChipLabel: (k: PainPointChip) => string;
}) {
  return (
    <div>
      <StepHeader title={title} subtitle={subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
        {PAIN_POINT_KEYS.map((key) => (
          <Chip
            key={key}
            selected={chips.includes(key)}
            onClick={() => onToggle(key)}
            icon={PAIN_POINT_ICONS[key]}
            label={getChipLabel(key)}
          />
        ))}
      </div>
      <div>
        <p className="text-sm font-medium text-foreground mb-2">
          {detailLabel}
        </p>
        <Textarea
          placeholder={detailPlaceholder}
          rows={4}
          value={detail}
          onChange={(e) => onDetailChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function StepGoal({
  value,
  onChange,
  title,
  subtitle,
  getLabel,
}: {
  value: BusinessGoal | null;
  onChange: (v: BusinessGoal) => void;
  title: string;
  subtitle: string;
  getLabel: (k: BusinessGoal) => string;
}) {
  return (
    <div>
      <StepHeader title={title} subtitle={subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {GOAL_KEYS.map((key) => (
          <Chip
            key={key}
            selected={value === key}
            onClick={() => onChange(key)}
            icon={GOAL_ICONS[key]}
            label={getLabel(key)}
          />
        ))}
      </div>
    </div>
  );
}
