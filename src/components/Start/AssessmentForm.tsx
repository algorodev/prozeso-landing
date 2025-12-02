"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type VerticalKey = "restaurants" | "beauty" | "clinics" | "hotels" | "realEstate";

const VERTICAL_KEYS: VerticalKey[] = [
  "restaurants",
  "beauty",
  "clinics",
  "hotels",
  "realEstate",
];

export function AssessmentForm() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("start.assessment");
  const tSolutions = useTranslations("solutions");

  const automation = searchParams.get("automation");
  const verticalParam = searchParams.get("vertical");
  const initialVertical = (VERTICAL_KEYS.includes((verticalParam as VerticalKey) ?? "" as VerticalKey)
    ? (verticalParam as VerticalKey)
    : "");

  const Schema = z.object({
    name: z.string().min(2, t("field.name.error")),
    email: z.string().email(t("field.email.error")),
    goals: z.string().max(2000).optional(),
    vertical: z.enum(["", ...VERTICAL_KEYS] as ["", ...VerticalKey[]]).optional(),
  });

  type FormValues = z.infer<typeof Schema>;

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { name: "", email: "", goals: "", vertical: initialVertical },
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
          message: values.goals ?? "",
          workflow: automation ?? undefined,
          locale,
          vertical: form.getValues("vertical") && form.getValues("vertical") !== "" ? form.getValues("vertical") : undefined,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        const apiError = (data as any)?.error;
        setServerError(apiError || t("serverErrorDefault"));
        return;
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setServerError(t("serverErrorDefault"));
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{t("cardTitle")}</CardTitle>
        <p className="body-text text-muted-foreground">{t("cardSubtitle")}</p>
      </CardHeader>
      <CardContent className="pt-2">
        {success ? (
          <div className="flex items-start gap-3 rounded-md border p-4">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="body-strong-text">{t("success.title")}</p>
              <p className="body-text text-muted-foreground">
                {t("success.body")}
              </p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="vertical"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("field.vertical.label")}</FormLabel>
                    <FormControl>
                      <select
                        className="w-full appearance-none rounded-md border bg-background px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring input-text"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value as VerticalKey | "")}
                      >
                        <option value="">{t("field.vertical.placeholder")}</option>
                        {VERTICAL_KEYS.map((key) => (
                          <option key={key} value={key}>
                            {tSolutions(`verticals.${key}.title`)}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("field.name.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("field.name.placeholder")}
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
                    <FormLabel>{t("field.email.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("field.email.placeholder")}
                        type="email"
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
                    <FormLabel>{t("field.goals.label")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("field.goals.placeholder")}
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {serverError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 body-text">
                  {serverError}
                </div>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="me-2 size-4 animate-spin" />
                    {t("submit.loading")}
                  </>
                ) : (
                  <>{t("submit.idle")}</>
                )}
              </Button>
              <p className="caption-text text-muted-foreground">{t("disclaimer")}</p>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
