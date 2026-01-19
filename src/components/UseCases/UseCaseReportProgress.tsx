"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import type { UseCasePipelineStatus } from "@/lib/agents/pipeline";

interface UseCaseReportProgressProps {
  open: boolean;
  status: UseCasePipelineStatus;
  onOpenChange?: (open: boolean) => void;
}

export function UseCaseReportProgress({
  open,
  status,
  onOpenChange,
}: UseCaseReportProgressProps) {
  const t = useTranslations("useCases.form.progress");

  const steps = [
    {
      id: "analyzing",
      label: t("analyzing.title"),
      description: t("analyzing.description"),
      icon: Sparkles,
    },
    {
      id: "generating",
      label: t("generating.title"),
      description: t("generating.description"),
      icon: Loader2,
    },
    {
      id: "completed",
      label: t("completed.title"),
      description: t("completed.description"),
      icon: CheckCircle2,
    },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === status);
  const isAnalyzing = status === "analyzing";
  const isGenerating = status === "generating";
  const isCompleted = status === "completed";
  const isError = status === "error";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton={isError || isCompleted}
      >
        <div className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {isError ? t("error.title") : t("title")}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {isError ? t("error.description") : t("description")}
            </DialogDescription>
          </DialogHeader>

          {!isError && (
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                const isPending = index > currentStepIndex;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="relative flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        {isCompleted ? (
                          <motion.div
                            key="completed"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <CheckCircle2 className="size-6 text-primary" />
                          </motion.div>
                        ) : isActive ? (
                          <motion.div
                            key="active"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Icon className="size-6 text-primary" />
                          </motion.div>
                        ) : (
                          <div
                            className={`size-6 rounded-full border-2 ${
                              isPending
                                ? "border-muted bg-muted/50"
                                : "border-border bg-background"
                            }`}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p
                        className={`font-medium ${
                          isActive
                            ? "text-foreground"
                            : isCompleted
                              ? "text-primary"
                              : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {isError && (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4">
              <p className="text-sm text-destructive">
                {t("error.message")}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
