import { NextResponse } from "next/server";

// Sollicitaties op /jobs/[slug]: multipart met velden + optioneel cv.
// Zelfde patroon als /api/contact: Resend als de key er is, anders 503 zodat
// de client terugvalt op een mailto (zonder bijlage).
const TO = process.env.APPLY_TO || process.env.CONTACT_TO || "douwe@productiveswitch.nl";
const FROM = process.env.CONTACT_FROM || "Productive Switch <onboarding@resend.dev>";
const MAX_CV = 8 * 1024 * 1024;

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const subject = String(form.get("subject") || "Sollicitatie via productiveswitch.nl").slice(0, 200);
  const text = String(form.get("text") || "").slice(0, 10000);
  const replyTo = String(form.get("email") || "").trim();
  const replyOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo);
  if (!text.trim()) return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ ok: false, configured: false }, { status: 503 });

  const attachments: { filename: string; content: string }[] = [];
  const cv = form.get("cv");
  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_CV) return NextResponse.json({ ok: false, error: "cv_too_large" }, { status: 413 });
    const buf = Buffer.from(await cv.arrayBuffer());
    attachments.push({ filename: cv.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120), content: buf.toString("base64") });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [TO], subject, text, attachments, ...(replyOk ? { reply_to: replyTo } : {}) }),
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => "")).slice(0, 300);
      console.error("resend error", res.status, detail);
      return NextResponse.json({ ok: false, configured: true, upstream: res.status, detail }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, configured: true }, { status: 502 });
  }
}
