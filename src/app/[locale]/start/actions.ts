"use server";

import type { Route } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const AssessmentSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  goals: z.string().max(2000).optional().default(""),
});

const CALENDLY_URL = process.env.CALENDLY_URL || "";

export async function submitAssessment(formData: FormData) {
  const payload = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    goals: String(formData.get("goals") || ""),
  };

  const parsed = AssessmentSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check your details and try again.",
      issues: parsed.error.flatten(),
    };
  }

  try {
    const h = await headers();
    const meta = {
      ip: h.get("x-forwarded-for") || "",
      ua: h.get("user-agent") || "",
      ts: new Date().toISOString(),
    };

    console.log("[Assessment Lead]", { ...parsed.data, meta });

    // const resend = new Resend(process.env.RESEND_API_KEY!);
    // await resend.emails.send({
    //   from: "Leads <leads@yourdomain.com>",
    //   to: "team@yourdomain.com",
    //   subject: "New Assessment Request",
    //   text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nGoals: ${parsed.data.goals}`,
    // });
  } catch (e) {
    console.error("Assessment error:", e);
    return {
      ok: false,
      error: "Something went wrong on our side. Please try again.",
    };
  }

  if (CALENDLY_URL) {
    redirect(CALENDLY_URL as Route);
  }

  return { ok: true };
}
