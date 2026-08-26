import { NextResponse } from "next/server";

type StartRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  locale?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as StartRequestBody | null;

  if (
    !body ||
    !isNonEmptyString(body.name) ||
    !isNonEmptyString(body.email) ||
    !isNonEmptyString(body.message)
  ) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 },
    );
  }

  const { name, email, message, locale } = body as {
    name: string;
    email: string;
    message: string;
    locale?: unknown;
  };

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram is not configured: missing bot token or chat id.");
    return NextResponse.json(
      { ok: false, error: "Notifications are not configured." },
      { status: 500 },
    );
  }

  const text = [
    "New request from prozeso.com",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Locale: ${isNonEmptyString(locale) ? locale : "-"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const telegramRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    },
  );

  if (!telegramRes.ok) {
    console.error(
      "Telegram sendMessage failed:",
      telegramRes.status,
      await telegramRes.text().catch(() => ""),
    );
    return NextResponse.json(
      { ok: false, error: "Failed to send notification." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
