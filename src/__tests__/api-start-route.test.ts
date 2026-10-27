import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/start/route";

function makeRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost/api/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: "John",
  email: "john@example.com",
  company: "Acme",
  teamSize: "10-50",
  message: "Hello",
  locale: "en",
};

describe("POST /api/start", () => {
  const originalToken = process.env.TELEGRAM_BOT_TOKEN;
  const originalChatId = process.env.TELEGRAM_CHAT_ID;

  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "12345";
  });

  afterEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = originalToken;
    process.env.TELEGRAM_CHAT_ID = originalChatId;
    vi.unstubAllGlobals();
  });

  it("sends a Telegram message and returns { ok: true }", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest(validBody));
    const json = await response.json();

    expect(json).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.telegram.org/bottest-token/sendMessage");
    const payload = JSON.parse(options.body);
    expect(payload.chat_id).toBe("12345");
    expect(payload.text).toContain("John");
    expect(payload.text).toContain("john@example.com");
    expect(payload.text).toContain("Hello");
    expect(payload.text).toContain("Company: Acme");
    expect(payload.text).toContain("Team size: 10-50");
  });

  it("uses a dash when team size is not provided", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    const { teamSize: _teamSize, ...withoutTeamSize } = validBody;
    const response = await POST(makeRequest(withoutTeamSize));

    expect(response.status).toBe(200);
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload.text).toContain("Team size: -");
  });

  it("returns 400 when required fields are missing", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ name: "John" }));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 400 when company is missing", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { company: _company, ...withoutCompany } = validBody;
    const response = await POST(makeRequest(withoutCompany));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 500 when Telegram is not configured", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "";
    process.env.TELEGRAM_CHAT_ID = "";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest(validBody));
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 502 when the Telegram API call fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("bad request", { status: 400 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest(validBody));
    const json = await response.json();

    expect(response.status).toBe(502);
    expect(json.ok).toBe(false);
  });
});
