import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

// Best-effort in-memory rate limit (per server instance): 5 requests / minute / IP.
const hits = new Map<string, { count: number; ts: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const w = hits.get(ip);
  if (!w || now - w.ts > 60_000) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  w.count += 1;
  return w.count > 5;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const d = parsed.data;
  // Honeypot tripped — pretend success, send nothing.
  if (d.website && d.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return Response.json(
      { error: "Email isn’t configured yet. Please email us directly." },
      { status: 500 },
    );
  }

  const resend = new Resend(key);
  const to = process.env.CONTACT_TO || siteConfig.contact.email;
  const from =
    process.env.RESEND_FROM || "Alive Spectra <onboarding@resend.dev>";

  const text = [
    "New consultation request",
    "",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Company: ${d.company || "—"}`,
    `Stage: ${d.stage}`,
    `Interests: ${d.interests.join(", ")}`,
    "",
    d.message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: d.email,
      subject: `Consultation request — ${d.name} (${d.stage})`,
      text,
    });
    if (error) {
      return Response.json(
        { error: "Couldn’t send right now. Please email us directly." },
        { status: 502 },
      );
    }
  } catch {
    return Response.json(
      { error: "Couldn’t send right now. Please email us directly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
