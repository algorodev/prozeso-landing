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

type Props = {
  name: string;
  email: string;
  message?: string;
  workflow?: string | null;
  vertical?: string | null;
};

const card: CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  padding: 24,
};

const label: CSSProperties = {
  color: "#6b7280",
  fontSize: 13,
  margin: 0,
};

const value: CSSProperties = {
  color: "#111827",
  fontSize: 16,
  margin: "4px 0 14px",
};

const chip: CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  background: "#eef2ff",
  color: "#1B4A76FF",
  fontWeight: 600,
  fontSize: 12,
};

export default function InternalLeadNotificationEmail({
  name,
  email,
  message,
  workflow,
  vertical,
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
          backgroundColor: "#f9fafb",
          padding: "32px 20px",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
        }}
      >
        <Container style={{ maxWidth: 640, margin: "0 auto" }}>
          <Section style={card}>
            <Heading
              as="h2"
              style={{ margin: 0, fontSize: 22, color: "#111827" }}
            >
              📩 New Consultation Request
            </Heading>

            <Text style={{ ...label, marginTop: 16 }}>Submitted</Text>
            <Text style={value}>{dateStr}</Text>

            <Hr style={{ borderColor: "#e5e7eb", margin: "8px 0 18px" }} />

            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            {workflow ? (
              <>
                <Text style={label}>Workflow of interest</Text>
                <Text style={{ margin: "6px 0 16px" }}>
                  <span style={chip}>{workflow}</span>
                </Text>
              </>
            ) : null}

              {vertical ? (
                <>
                  <Text style={label}>Vertical</Text>
                  <Text style={{ margin: "6px 0 16px" }}>
                    <span style={chip}>{verticalLabels[vertical] ?? vertical}</span>
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

            <Hr style={{ borderColor: "#e5e7eb", marginTop: 20 }} />
            <Text
              style={{
                color: "#6b7280",
                fontSize: 13,
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
