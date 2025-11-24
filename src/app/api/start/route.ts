import { NextResponse } from "next/server";
import { Resend } from "resend";
import CustomerConfirmationEmail from "@/emails/CustomerConfirmationEmail";
import InternalLeadNotificationEmail from "@/emails/InternalLeadNotificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message, workflow, locale, vertical } = await req.json();

  await resend.emails.send({
    from: "Prozeso <admin@send.prozeso.com>",
    to: ["admin@prozeso.com"],
    subject: `New consultation request from ${name}`,
    react: InternalLeadNotificationEmail({
      name,
      email,
      message,
      workflow,
      vertical,
    }),
  });

  await resend.emails.send({
    from: "Prozeso <admin@send.prozeso.com>",
    to: [email],
    subject:
      locale === "es"
        ? "Hemos recibido tu solicitud — nos pondremos en contacto enseguida"
        : "We received your request — we’ll be in touch shortly",
    react: CustomerConfirmationEmail({
      name,
      workflow,
      locale: (locale as "en" | "es") ?? "en",
      nextUrl: "https://prozeso.com",
    }),
  });

  return NextResponse.json({ ok: true });
}
