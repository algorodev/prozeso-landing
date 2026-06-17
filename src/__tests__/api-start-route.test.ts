import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/start/route";

function makeRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost/api/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/start", () => {
  it("returns { ok: true } without sending any email", async () => {
    const response = await POST(
      makeRequest({
        name: "John",
        email: "john@example.com",
        message: "Hello",
        locale: "en",
      }),
    );
    const json = await response.json();
    expect(json).toEqual({ ok: true });
  });
});
