import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { CSSProperties } from "react";
import { emailColors, emailTypography } from "@/emails/theme";

type Props = {
  name: string;
  workflow?: string | null;
  workflows?: string[] | null;
  workflowTitles?: string[] | null;
  verticalTitle?: string | null;
  nextUrl?: string;
  locale?: "en" | "es";
};

const card: CSSProperties = {
  backgroundColor: emailColors.cardBg,
  borderRadius: 12,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  padding: 28,
};

const chip: CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  background: emailColors.accent,
  color: emailColors.accentForeground,
  fontWeight: 600,
  fontSize: 12,
};

export default function CustomerConfirmationEmail({
  name,
  workflow,
  workflows,
  workflowTitles,
  verticalTitle,
  nextUrl = "https://prozeso.com",
  locale = "en",
}: Props) {
  const t =
    locale === "es"
      ? {
          preview: "Hemos recibido tu solicitud — gracias",
          title: `Gracias, ${name} 👋`,
          intro:
            "Hemos recibido tu solicitud. Nos encanta ayudarte a automatizar tu negocio para que no pare.",
          workflow: "Interés en el workflow",
          workflows: "Automatizaciones de interés",
          industry: "Industria",
          body: "En breve te contactaremos para agendar una primera sesión y entender mejor tus objetivos.",
          cta: "Visitar nuestra web",
          footer: "Prozeso — automatiza tu negocio y respira.",
        }
      : {
          preview: "We received your request — thank you",
          title: `Thanks, ${name} 👋`,
          intro:
            "We received your request. We’re excited to help you automate your business so it never stops.",
          workflow: "Workflow of interest",
          workflows: "Workflows of interest",
          industry: "Industry",
          body: "We’ll reach out shortly to schedule your first session and understand your goals.",
          cta: "Visit our website",
          footer: "Prozeso — helping businesses work smarter.",
        };

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body
        style={{
          backgroundColor: emailColors.pageBg,
          padding: "32px 20px",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
          color: emailColors.text,
          lineHeight: emailTypography.bodyLineHeight,
        }}
      >
        <Container style={{ maxWidth: 640, margin: "0 auto" }}>
          <Section style={card}>
            <Heading
              as="h2"
              style={{
                margin: 0,
                fontSize: emailTypography.titleSize,
                lineHeight: emailTypography.titleLineHeight,
                color: emailColors.text,
                fontWeight: 700,
              }}
            >
              {t.title}
            </Heading>
            <Text
              style={{
                color: emailColors.text,
                fontSize: emailTypography.bodySize,
                lineHeight: emailTypography.bodyLineHeight,
                marginTop: 12,
              }}
            >
              {t.intro}
            </Text>
            {workflowTitles && workflowTitles.length > 0 ? (
              <Text
                style={{
                  marginTop: 8,
                  color: emailColors.subtleText,
                  fontSize: 14,
                }}
              >
                <strong style={{ color: emailColors.text }}>
                  {t.workflows}:
                </strong>{" "}
                {(workflowTitles || []).map((title, idx) => (
                  <>
                    <span key={idx} style={{ ...chip, marginRight: 6 }}>
                      {title}
                    </span>
                    <br />
                    <br />
                  </>
                ))}
              </Text>
            ) : workflow ? (
              <Text
                style={{
                  marginTop: 8,
                  color: emailColors.subtleText,
                  fontSize: 14,
                }}
              >
                <strong style={{ color: emailColors.text }}>
                  {t.workflow}:
                </strong>{" "}
                <span style={chip}>{workflow}</span>
              </Text>
            ) : null}
            {verticalTitle ? (
              <Text
                style={{
                  marginTop: 8,
                  color: emailColors.subtleText,
                  fontSize: 14,
                }}
              >
                <strong style={{ color: emailColors.text }}>
                  {t.industry}:
                </strong>{" "}
                <span style={chip}>{verticalTitle}</span>
              </Text>
            ) : null}
            <Text
              style={{
                color: emailColors.text,
                fontSize: emailTypography.bodySize,
                lineHeight: emailTypography.bodyLineHeight,
                marginTop: 12,
              }}
            >
              {t.body}
            </Text>
            <Button
              href={nextUrl}
              style={{
                display: "inline-block",
                backgroundColor: emailColors.primary,
                color: emailColors.primaryForeground,
                padding: "12px 20px",
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                marginTop: 10,
              }}
            >
              {t.cta}
            </Button>
            <Hr style={{ borderColor: emailColors.border, marginTop: 22 }} />
            <Text
              style={{
                color: emailColors.mutedText,
                fontSize: emailTypography.smallSize,
                marginTop: 14,
                textAlign: "center",
              }}
            >
              {t.footer}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
