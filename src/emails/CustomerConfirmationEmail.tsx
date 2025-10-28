import { CSSProperties } from "react";
import {
	Html,
	Head,
	Preview,
	Body,
	Container,
	Section,
	Heading,
	Text,
	Button,
	Hr,
} from "@react-email/components";

type Props = {
	name: string;
	workflow?: string | null;
	nextUrl?: string;
	locale?: "en" | "es";
};

const card: CSSProperties = {
	backgroundColor: "#ffffff",
	borderRadius: 12,
	boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
	padding: 28,
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

export default function CustomerConfirmationEmail({ name, workflow, nextUrl = "https://prozeso.com", locale = "en" }: Props) {
	const t =
		locale === "es"
			? {
				preview: "Hemos recibido tu solicitud — gracias",
				title: `Gracias, ${name} 👋`,
				intro:
					"Hemos recibido tu solicitud. Nos encanta ayudarte a automatizar tu negocio para que no pare.",
				workflow: "Interés en el workflow",
				body:
					"En breve te contactaremos para agendar una primera sesión y entender mejor tus objetivos.",
				cta: "Visitar nuestra web",
				footer: "Prozeso — automatiza tu negocio y respira.",
			}
			: {
				preview: "We received your request — thank you",
				title: `Thanks, ${name} 👋`,
				intro:
					"We received your request. We’re excited to help you automate your business so it never stops.",
				workflow: "Workflow of interest",
				body:
					"We’ll reach out shortly to schedule your first session and understand your goals.",
				cta: "Visit our website",
				footer: "Prozeso — helping businesses work smarter.",
			};

	return (
		<Html>
			<Head />
			<Preview>{t.preview}</Preview>
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
						<Heading as="h2" style={{ margin: 0, fontSize: 22, color: "#111827" }}>
							{t.title}
						</Heading>

						<Text style={{ color: "#111827", fontSize: 16, marginTop: 12 }}>
							{t.intro}
						</Text>

						{workflow ? (
							<Text style={{ marginTop: 8 }}>
								{t.workflow}: <span style={chip}>{workflow}</span>
							</Text>
						) : null}

						<Text style={{ color: "#111827", fontSize: 16, marginTop: 12 }}>
							{t.body}
						</Text>

						<Button
							href={nextUrl}
							style={{
								display: "inline-block",
								backgroundColor: "#1B4A76FF",
								color: "#ffffff",
								padding: "12px 22px",
								borderRadius: 10,
								fontWeight: 600,
								textDecoration: "none",
								marginTop: 10,
							}}
						>
							{t.cta}
						</Button>

						<Hr style={{ borderColor: "#e5e7eb", marginTop: 22 }} />
						<Text style={{ color: "#6b7280", fontSize: 13, marginTop: 14, textAlign: "center" }}>
							{t.footer}
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}
