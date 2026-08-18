import { NextResponse } from "next/server";
import { PAYLOAD_KEYS } from "@/lib/constants";

/**
 * Lead delivery: GHL Inbound Webhook first, GHL API v2 contacts fallback.
 * If neither env var set is configured, the lead is accepted and logged so the
 * form still works end-to-end in preview environments (see README go-live
 * blockers — do NOT launch ads in this state).
 */

const K = PAYLOAD_KEYS;

function bad(field: string) {
  return NextResponse.json(
    { ok: false, error: `Missing or invalid field: ${field}` },
    { status: 400 }
  );
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const str = (key: string) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  const firstName = str(K.firstName);
  const phone = str(K.phone).replace(/\D/g, "");
  const email = str(K.email);
  const zip = str(K.zip);
  const tcpa = body[K.tcpaConsent] === true;

  if (!firstName) return bad(K.firstName);
  if (phone.length !== 10) return bad(K.phone);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad(K.email);
  if (!/^\d{5}$/.test(zip)) return bad(K.zip);
  if (!tcpa) return bad(K.tcpaConsent);

  // Rebuild the payload server-side from the shared key map — never forward
  // arbitrary client fields to GHL.
  const payload: Record<string, string | boolean> = {
    [K.firstName]: firstName,
    [K.lastName]: str(K.lastName),
    [K.phone]: `+1${phone}`,
    [K.email]: email,
    [K.zip]: zip,
    [K.service]: str(K.service),
    [K.message]: str(K.message),
    [K.tcpaConsent]: tcpa,
    [K.sourceUrl]: str(K.sourceUrl),
    [K.utmSource]: str(K.utmSource),
    [K.utmMedium]: str(K.utmMedium),
    [K.utmCampaign]: str(K.utmCampaign),
  };

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  const apiToken = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  // 1) Primary: GHL Inbound Webhook
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        return NextResponse.json({ ok: true, delivered: "webhook" });
      }
      console.error(`[lead] GHL webhook responded ${res.status}; trying API fallback`);
    } catch (err) {
      console.error("[lead] GHL webhook failed; trying API fallback", err);
    }
  }

  // 2) Fallback: GHL API v2 contacts (upsert)
  if (apiToken && locationId) {
    try {
      const res = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
          Version: "2021-07-28",
        },
        body: JSON.stringify({
          locationId,
          firstName,
          lastName: str(K.lastName),
          phone: `+1${phone}`,
          email,
          postalCode: zip,
          source: "lift-level-landing",
          tags: ["landing-lead", str(K.service)].filter(Boolean),
          customFields: [],
        }),
      });
      if (res.ok) {
        return NextResponse.json({ ok: true, delivered: "api" });
      }
      console.error(`[lead] GHL API fallback responded ${res.status}`);
    } catch (err) {
      console.error("[lead] GHL API fallback failed", err);
    }
  }

  if (!webhookUrl && !apiToken) {
    // No delivery configured: accept so the form UX is testable pre-launch.
    console.warn(
      "[lead] GHL_WEBHOOK_URL / GHL_API_TOKEN not configured — lead NOT delivered:",
      JSON.stringify(payload)
    );
    return NextResponse.json({ ok: true, delivered: "none" });
  }

  return NextResponse.json(
    { ok: false, error: "Lead delivery failed" },
    { status: 502 }
  );
}
