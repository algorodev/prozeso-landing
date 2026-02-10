import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import CustomerConfirmationEmail from "@/emails/CustomerConfirmationEmail";

afterEach(cleanup);

describe("CustomerConfirmationEmail", () => {
  it("renders name in title", () => {
    render(<CustomerConfirmationEmail name="Alice" />);
    expect(screen.getByText(/Alice/)).toBeDefined();
  });

  it("renders English text when locale='en'", () => {
    render(<CustomerConfirmationEmail name="Alice" locale="en" />);
    expect(
      screen.getAllByText(/We received your request/).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Visit our website")).toBeDefined();
  });

  it("renders Spanish text when locale='es'", () => {
    render(<CustomerConfirmationEmail name="Alice" locale="es" />);
    expect(
      screen.getAllByText(/Hemos recibido tu solicitud/).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Visitar nuestra web")).toBeDefined();
  });

  it("renders single workflow chip", () => {
    render(
      <CustomerConfirmationEmail name="Alice" workflow="Receptionist AI" />,
    );
    expect(screen.getByText("Receptionist AI")).toBeDefined();
  });

  it("renders multiple workflow chips from workflowTitles", () => {
    render(
      <CustomerConfirmationEmail
        name="Alice"
        workflowTitles={["Receptionist AI", "Appointment Reminder"]}
      />,
    );
    expect(screen.getByText("Receptionist AI")).toBeDefined();
    expect(screen.getByText("Appointment Reminder")).toBeDefined();
  });

  it("renders vertical title", () => {
    render(
      <CustomerConfirmationEmail name="Alice" verticalTitle="Restaurants" />,
    );
    expect(screen.getByText("Restaurants")).toBeDefined();
  });
});
