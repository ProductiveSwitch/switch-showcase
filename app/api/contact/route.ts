import { NextResponse } from "next/server";

// Central inbox for all intake / opleider / koffie messages.
const TO = process.env.CONTACT_TO || "info@productiveswitch.nl";
// Resend needs a verified sender domain. Until that's set up, the route
// reports itself as not configured and the client falls back to a mailto.
const FROM = process.env.CONTACT_FROM || "Productive Switch <onboarding@resend.dev>";

export async function POST(req: Request) {
  let payload: { subject?: string; text?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const subject = (payload.subject || "Bericht via productiveswitch.nl").slice(0, 200);
  const text = (payload.text || "").slice(0, 8000);
  if (!text.trim()) {
    return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Not configured yet: tell the client to use its mailto fallback.
    return NextResponse.json({ ok: false, configured: false }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [TO], subject, text }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, configured: true }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, configured: true }, { status: 502 });
  }
}
