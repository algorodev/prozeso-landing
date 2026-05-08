"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EmailSentDialog from "@/components/Start/EmailSentDialog";
import {
  BookCallButton,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui";

export function AssessmentForm() {
  const locale = useLocale();
  const t = useTranslations("start.assessment");

  const Schema = z.object({
    name: z.string().min(2, t("field.name.error")),
    email: z.string().email(t("field.email.error")),
    goals: z.string().min(1, t("field.goals.error")).max(2000),
  });

  type FormValues = z.infer<typeof Schema>;

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      email: "",
      goals: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.goals,
          locale,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        const apiError = (data as { error?: string })?.error;
        setServerError(apiError || t("serverErrorDefault"));
        return;
      }

      setSuccess(true);
      form.reset();
    } catch (_err) {
      setServerError(t("serverErrorDefault"));
    }
  };

  return (
    <>
      <div className="space-y-2 mb-6">
        <h2 className="font-sora text-2xl font-semibold tracking-tight">
          {t("cardTitle")}
        </h2>
        <p className="text-sm text-foreground-muted leading-relaxed">
          {t("cardSubtitle")}
        </p>
      </div>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("field.name.label")}
                  <span aria-hidden className="text-destructive ml-1">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("field.name.placeholder")}
                    required
                    aria-required="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("field.email.label")}
                  <span aria-hidden className="text-destructive ml-1">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("field.email.placeholder")}
                    type="email"
                    required
                    aria-required="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("field.goals.label")}
                  <span aria-hidden className="text-destructive ml-1">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("field.goals.placeholder")}
                    rows={4}
                    required
                    aria-required="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {serverError && (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 body-md">
              {serverError}
            </div>
          )}
          <Button
            type="submit"
            className="w-full mt-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="me-2 size-4 animate-spin" />
                {t("submit.loading")}
              </>
            ) : (
              t("submit.idle")
            )}
          </Button>
        </form>
      </Form>
      <EmailSentDialog open={success} onOpenChange={setSuccess} />

      <div className="mt-8 pt-6 border-t border-border/60 space-y-3">
        <p className="text-sm text-foreground-muted">
          {t("calendarAlternative")}
        </p>
        <BookCallButton size="default" />
      </div>

      <p className="body-sm text-foreground-muted mt-6">{t("disclaimer")}</p>
    </>
  );
}
