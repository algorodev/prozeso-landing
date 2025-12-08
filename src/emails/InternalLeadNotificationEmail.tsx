import {
  Body,
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
  email: string;
  message?: string;
  workflow?: string | null;
  workflows?: string[] | null;
  workflowTitles?: string[] | null;
  vertical?: string | null;
  verticalTitle?: string | null;
};

const card: CSSProperties = {
  backgroundColor: emailColors.cardBg,
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  padding: 24,
};

const label: CSSProperties = {
  color: emailColors.mutedText,
  fontSize: emailTypography.labelSize,
  margin: 0,
};

const value: CSSProperties = {
  color: emailColors.text,
  fontSize: emailTypography.bodySize,
  margin: "4px 0 14px",
};

const chip: CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  background: emailColors.secondary,
  color: emailColors.secondaryForeground,
  fontWeight: 600,
  fontSize: 12,
};

export default function InternalLeadNotificationEmail({
  name,
  email,
  message,
  workflow,
  workflows,
  workflowTitles,
  vertical,
  verticalTitle,
}: Props) {
  const dateStr = new Date().toLocaleString();
  const verticalLabels: Record<string, string> = {
    restaurants: "Restaurants",
    beauty: "Hair & Beauty",
    clinics: "Clinics & Health",
    hotels: "Hotels",
    realEstate: "Real Estate",
  };

  return (
    <Html>
      <Head />
      <Preview>New consultation request from {name}</Preview>
      <Body
        style={{
          backgroundColor: emailColors.pageBg,
          padding: "32px 20px",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
        }}
      >
        <Container style={{ maxWidth: 640, margin: "0 auto" }}>
          <Section style={card}>
            <Heading
              as="h2"
              style={{ margin: 0, fontSize: 22, color: emailColors.text }}
            >
              📩 New Consultation Request
            </Heading>
            <Text style={{ ...label, marginTop: 16 }}>Submitted</Text>
            <Text style={value}>{dateStr}</Text>
            <Hr
              style={{ borderColor: emailColors.border, margin: "8px 0 18px" }}
            />
            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
            {workflowTitles && workflowTitles.length > 0 ? (
              <>
                <Text style={label}>Workflows of interest</Text>
                <Text style={{ margin: "6px 0 16px" }}>
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
              </>
            ) : workflow ? (
              <>
                <Text style={label}>Workflow of interest</Text>
                <Text style={{ margin: "6px 0 16px" }}>
                  <span style={chip}>{workflow}</span>
                </Text>
              </>
            ) : null}
            {verticalTitle || vertical ? (
              <>
                <Text style={label}>Industry</Text>
                <Text style={{ margin: "6px 0 16px" }}>
                  <span style={chip}>
                    {verticalTitle ||
                      verticalLabels[vertical as string] ||
                      vertical}
                  </span>
                </Text>
              </>
            ) : null}
            {message ? (
              <>
                <Text style={label}>Message</Text>
                <Text
                  style={{
                    ...value,
                    background: "#f3f4f6",
                    borderRadius: 8,
                    padding: 12,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {message}
                </Text>
              </>
            ) : null}
            <Hr style={{ borderColor: emailColors.border, marginTop: 20 }} />
            <Text
              style={{
                color: emailColors.mutedText,
                fontSize: emailTypography.labelSize,
                marginTop: 14,
                textAlign: "center",
              }}
            >
              Lead captured via landing page form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
