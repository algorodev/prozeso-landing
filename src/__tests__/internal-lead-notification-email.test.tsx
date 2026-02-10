import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import InternalLeadNotificationEmail from "@/emails/InternalLeadNotificationEmail";

afterEach(cleanup);

describe("InternalLeadNotificationEmail", () => {
  it("renders name and email", () => {
    render(
      <InternalLeadNotificationEmail name="Alice" email="alice@example.com" />,
    );
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("alice@example.com")).toBeDefined();
  });

  it("renders single workflow", () => {
    render(
      <InternalLeadNotificationEmail
        name="Alice"
        email="alice@example.com"
        workflow="Receptionist AI"
      />,
    );
    expect(screen.getByText("Receptionist AI")).toBeDefined();
  });

  it("renders multiple workflowTitles", () => {
    render(
      <InternalLeadNotificationEmail
        name="Alice"
        email="alice@example.com"
        workflowTitles={["Receptionist AI", "Review Booster"]}
      />,
    );
    expect(screen.getByText("Receptionist AI")).toBeDefined();
    expect(screen.getByText("Review Booster")).toBeDefined();
  });

  it("renders vertical info", () => {
    render(
      <InternalLeadNotificationEmail
        name="Alice"
        email="alice@example.com"
        verticalTitle="Hotels"
      />,
    );
    expect(screen.getByText("Hotels")).toBeDefined();
  });

  it("renders message when provided", () => {
    render(
      <InternalLeadNotificationEmail
        name="Alice"
        email="alice@example.com"
        message="I need help automating my business"
      />,
    );
    expect(
      screen.getByText("I need help automating my business"),
    ).toBeDefined();
  });
});
