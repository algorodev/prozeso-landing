"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EmailSentDialog from "@/components/Start/EmailSentDialog";
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
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { AUTOMATIONS } from "@/data/automations";

type VerticalKey =
  | "restaurants"
  | "beauty"
  | "clinics"
  | "hotels"
  | "realEstate";

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
  const tAutomations = useTranslations("automations");

  const automation = searchParams.get("automation");
  const verticalParam = searchParams.get("vertical");
  const initialVertical = VERTICAL_KEYS.includes(
    (verticalParam as VerticalKey) ?? ("" as VerticalKey),
  )
    ? (verticalParam as VerticalKey)
    : "";

  const automationParam =
    AUTOMATIONS.find((a) => a.id === automation)?.id ?? "";

  const Schema = z.object({
    name: z.string().min(2, t("field.name.error")),
    email: z.string().email(t("field.email.error")),
    goals: z.string().min(1, t("field.goals.error")).max(2000),
    vertical: z
      .enum(["", ...VERTICAL_KEYS] as ["", ...VerticalKey[]])
      .optional(),
    automation: z.array(z.string()).optional(),
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
      vertical: initialVertical,
      automation: automationParam ? [automationParam] : [],
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
          message: values.goals ?? "",
          workflow: (() => {
            const selected = form.getValues("automation") ?? [];
            return selected.length > 0
              ? selected[0]
              : (automation ?? undefined);
          })(),
          workflows: form.getValues("automation") ?? [],
          workflowTitles: (form.getValues("automation") ?? []).map((id) =>
            tAutomations(`${id}.title`),
          ),
          locale,
          vertical:
            form.getValues("vertical") && form.getValues("vertical") !== ""
              ? form.getValues("vertical")
              : undefined,
          verticalTitle: (() => {
            const v = form.getValues("vertical");
            return v ? tSolutions(`verticals.${v}.title`) : undefined;
          })(),
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
        <p className="card-subtitle text-muted-foreground">
          {t("cardSubtitle")}
        </p>
      </CardHeader>
      <CardContent className="pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid items-start gap-4 sm:grid-cols-2 min-w-0">
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
            </div>
            <div className="grid items-start gap-4 sm:grid-cols-2 min-w-0">
              <FormField
                control={form.control}
                name="vertical"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("field.vertical.label")}</FormLabel>
                    <FormControl>
                      <div className="min-w-0">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full min-w-0 bg-input/30 rounded-md justify-between font-normal overflow-hidden"
                              aria-label={t("field.vertical.label")}
                            >
                              <span className="truncate flex-1 min-w-0 text-left">
                                {field.value
                                  ? tSolutions(`verticals.${field.value}.title`)
                                  : t("field.vertical.placeholder")}
                              </span>
                              <ChevronDown
                                className="ml-2 size-4 opacity-70 shrink-0"
                                aria-hidden
                              />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-0 sm:min-w-56">
                            <DropdownMenuItem
                              onClick={() => field.onChange("")}
                              aria-selected={
                                (field.value ?? "") === "" ? "true" : undefined
                              }
                            >
                              <Check
                                className={`mr-2 size-4 ${(field.value ?? "") === "" ? "opacity-100" : "opacity-0"}`}
                                aria-hidden
                              />
                              {t("field.vertical.placeholder")}
                            </DropdownMenuItem>
                            {VERTICAL_KEYS.map((key) => (
                              <DropdownMenuItem
                                key={key}
                                onClick={() => field.onChange(key)}
                                aria-selected={
                                  field.value === key ? "true" : undefined
                                }
                              >
                                <Check
                                  className={`mr-2 size-4 ${field.value === key ? "opacity-100" : "opacity-0"}`}
                                  aria-hidden
                                />
                                {tSolutions(`verticals.${key}.title`)}
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
              <FormField
                control={form.control}
                name="automation"
                render={({ field }) => {
                  const values = field.value ?? [];
                  const toggle = (id: string) => {
                    const set = new Set(values);
                    if (set.has(id)) set.delete(id);
                    else set.add(id);
                    field.onChange(Array.from(set));
                  };
                  const clear = () => field.onChange([]);
                  const triggerLabel = () => {
                    if (!values || values.length === 0)
                      return t("field.automation.placeholder");
                    if (values.length === 1)
                      return tAutomations(`${values[0]}.title`);
                    const [first, ...rest] = values;
                    return `${tAutomations(`${first}.title`)} +${rest.length}`;
                  };
                  return (
                    <FormItem>
                      <FormLabel>{t("field.automation.label")}</FormLabel>
                      <FormControl>
                        <div className="min-w-0">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                className="w-full min-w-0 bg-input/30 rounded-md justify-between font-normal overflow-hidden"
                                aria-label={t("field.automation.label")}
                              >
                                <span className="truncate flex-1 min-w-0 text-left">
                                  {triggerLabel()}
                                </span>
                                <ChevronDown
                                  className="ml-2 size-4 opacity-70 shrink-0"
                                  aria-hidden
                                />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-0 sm:min-w-56">
                              <DropdownMenuItem
                                onClick={clear}
                                aria-selected={
                                  values.length === 0 ? "true" : undefined
                                }
                              >
                                <Check
                                  className={`mr-2 size-4 ${values.length === 0 ? "opacity-100" : "opacity-0"}`}
                                  aria-hidden
                                />
                                {t("field.automation.placeholder")}
                              </DropdownMenuItem>
                              {AUTOMATIONS.map((a) => {
                                const isSelected = values.includes(a.id);
                                return (
                                  <DropdownMenuItem
                                    key={a.id}
                                    onClick={() => toggle(a.id)}
                                    aria-selected={
                                      isSelected ? "true" : undefined
                                    }
                                  >
                                    <Check
                                      className={`mr-2 size-4 ${isSelected ? "opacity-100" : "opacity-0"}`}
                                      aria-hidden
                                    />
                                    {tAutomations(`${a.id}.title`)}
                                  </DropdownMenuItem>
                                );
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
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
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 body-text">
                {serverError}
              </div>
            )}
            <p className="caption-text text-muted-foreground">
              {t("disclaimer")}
            </p>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-fit"
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
            </div>
          </form>
        </Form>
        <EmailSentDialog open={success} onOpenChange={setSuccess} />
      </CardContent>
    </Card>
  );
}
