import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockSend } = vi.hoisted(() => ({
  mockSend: vi.fn().mockResolvedValue({ id: "email-id" }),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

vi.mock("@/emails/CustomerConfirmationEmail", () => ({
  default: vi.fn().mockReturnValue("customer-email-html"),
}));

vi.mock("@/emails/InternalLeadNotificationEmail", () => ({
  default: vi.fn().mockReturnValue("internal-email-html"),
}));

import { POST } from "@/app/api/start/route";

function makeRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost/api/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/start", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSend.mockResolvedValue({ id: "email-id" });
  });

  const baseBody = {
    name: "John",
    email: "john@example.com",
    message: "Hello",
    workflow: "receptionist-ai",
    workflows: null,
    workflowTitles: null,
    locale: "en",
    vertical: "restaurants",
    verticalTitle: "Restaurants",
  };

  it("sends internal notification email to admin", async () => {
    await POST(makeRequest(baseBody));
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["admin@prozeso.com"],
        subject: "New consultation request from John",
      }),
    );
  });

  it("sends customer confirmation email to provided email", async () => {
    await POST(makeRequest(baseBody));
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["john@example.com"],
      }),
    );
  });

  it("uses Spanish subject when locale is 'es'", async () => {
    await POST(makeRequest({ ...baseBody, locale: "es" }));
    const customerCall = mockSend.mock.calls.find(
      (call: [Record<string, unknown>]) =>
        (call[0] as Record<string, unknown[]>).to?.includes("john@example.com"),
    );
    expect(customerCall?.[0]?.subject).toContain("Hemos recibido tu solicitud");
  });

  it("uses English subject when locale is 'en'", async () => {
    await POST(makeRequest(baseBody));
    const customerCall = mockSend.mock.calls.find(
      (call: [Record<string, unknown>]) =>
        (call[0] as Record<string, unknown[]>).to?.includes("john@example.com"),
    );
    expect(customerCall?.[0]?.subject).toContain("We received your request");
  });

  it("returns { ok: true }", async () => {
    const response = await POST(makeRequest(baseBody));
    const json = await response.json();
    expect(json).toEqual({ ok: true });
  });

  it("calls send twice (internal + customer)", async () => {
    await POST(makeRequest(baseBody));
    expect(mockSend).toHaveBeenCalledTimes(2);
  });
});
