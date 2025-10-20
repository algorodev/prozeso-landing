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
import { useTranslations } from "next-intl";

export function AssessmentForm() {
	const t = useTranslations("start.assessment");

	const Schema = z.object({
		name: z.string().min(2, t("field.name.error")),
		email: z.string().email(t("field.email.error")),
		goals: z.string().max(2000).optional(),
	});

	type FormValues = z.infer<typeof Schema>;

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
			setServerError(res?.error ?? t("serverErrorDefault"));
			return;
		}
		setSuccess(true);
		form.reset();
	};

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>{t("cardTitle")}</CardTitle>
				<p className="text-sm text-muted-foreground">{t("cardSubtitle")}</p>
			</CardHeader>
			<CardContent className="pt-2">
				{success ? (
					<div className="flex items-start gap-3 rounded-md border p-4">
						<CheckCircle2 className="mt-0.5 size-5 shrink-0" />
						<div>
							<p className="font-medium">{t("success.title")}</p>
							<p className="text-sm text-muted-foreground">
								{t("success.body")}
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
										{t("submit.loading")}
									</>
								) : (
									<>{t("submit.idle")}</>
								)}
							</Button>
							<p className="text-xs text-muted-foreground">
								{t("disclaimer")}
							</p>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	);
}
