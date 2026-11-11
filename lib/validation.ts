import { z } from "zod";
const email = z.email("Enter a valid email address.").max(254);
const phone = z.string().trim().min(7, "Enter a valid phone number.").max(30);
const message = z.string().trim().min(10, "Please include at least 10 characters.").max(5000);
export const enquirySchema = z.object({ name: z.string().trim().min(2).max(120), email, phone: z.string().trim().max(30).optional().default(""), company: z.string().trim().max(160).optional().default(""), service: z.string().trim().max(160).optional().default(""), message, source: z.enum(["contact", "project", "why-choose"]).default("contact"), website: z.string().max(0).optional() }).superRefine((data, context) => { if (data.phone && !/^[+()0-9.\-\s]{7,30}$/.test(data.phone)) context.addIssue({ code: "custom", path: ["phone"], message: "Enter a valid phone number." }); });
export const strategySchema = z.object({ name: z.string().trim().min(2).max(120), email, phone, company: z.string().trim().max(160).optional().default(""), service: z.string().trim().max(160).optional().default(""), preferredAt: z.iso.datetime(), timezone: z.string().trim().min(1).max(80), message: z.string().trim().max(5000).optional().default(""), website: z.string().max(0).optional() });
export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    // Prefer the Host the request actually arrived on: request.url can be rebuilt with a
    // different hostname (proxy, preview deployment, www/apex), which rejected real browsers.
    const host = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "").split(",")[0].trim().toLowerCase();
    const proto = (request.headers.get("x-forwarded-proto") || "").split(",")[0].trim().toLowerCase();
    if (host && originUrl.host.toLowerCase() === host && (!proto || originUrl.protocol === `${proto}:`)) return true;
    return originUrl.origin === new URL(request.url).origin;
  } catch { return false; }
}
export const loginSchema = z.object({ email, password: z.string().min(10).max(200) });
export const contentSchema = z.object({ type: z.string().min(1), id: z.string().optional(), data: z.record(z.string(), z.unknown()) });
