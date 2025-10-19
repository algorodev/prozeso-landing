"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitAssessment } from "@/app/[locale]/start/actions";
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

const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  goals: z.string().max(2000).optional(),
});

type FormValues = z.infer<typeof Schema>;

export function AssessmentForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { name: "", email: "", goals: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setSuccess(false);

    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("email", values.email);
    fd.append("goals", values.goals ?? "");

    const res = await submitAssessment(fd);
    if (!res?.ok) {
      setServerError(res?.error ?? "Something went wrong. Please try again.");
      return;
    }
    setSuccess(true);
    form.reset();
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Free Assessment</CardTitle>
        <p className="text-sm text-muted-foreground">
          Share a few details and we’ll reach out to book your quick discovery
          call.
        </p>
      </CardHeader>
      <CardContent className="pt-2">
        {success ? (
          <div className="flex items-start gap-3 rounded-md border p-4">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-medium">Thanks! We’ve got your request.</p>
              <p className="text-sm text-muted-foreground">
                Our team will contact you shortly to schedule your free call.
              </p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name</FormLabel>
                    <FormControl>
                      <Input placeholder="Alex Johnson" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
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
                    <FormLabel>What are you looking for?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us briefly what you’d like to achieve..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {serverError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm">
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
                    Submitting…
                  </>
                ) : (
                  <>Book your free assessment</>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                No payment or commitment required — this is a quick first step
                to design your plan.
              </p>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
