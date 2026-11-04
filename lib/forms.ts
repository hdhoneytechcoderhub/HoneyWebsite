import { db } from "@/lib/db";
import { consumeRateLimit, requestRateLimitKey } from "@/lib/security";
import { enquirySchema, strategySchema } from "@/lib/validation";

type Result = { ok: true } | { ok: false; message: string; fields?: Record<string, string> };
function fieldErrors(error: { issues: { path: PropertyKey[]; message: string }[] }) {
  return Object.fromEntries(error.issues.map(x => [String(x.path[0] ?? "form"), x.message]));
}
export async function saveEnquiry(input: unknown): Promise<Result> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "Please review the highlighted fields.", fields: fieldErrors(parsed.error) };
  const key = await requestRateLimitKey("enquiry");
  if (!await consumeRateLimit(key, 6, 60 * 60 * 1000)) return { ok: false, message: "Too many requests. Please try again later." };
  const { name,email,phone,company,service,message,source } = parsed.data;
  await db.enquiry.create({ data: { name,email,phone,company,service,message,source } });
  return { ok: true };
}
export async function saveStrategyRequest(input: unknown): Promise<Result> {
  const parsed = strategySchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "Please review the highlighted fields.", fields: fieldErrors(parsed.error) };
  const key = await requestRateLimitKey("strategy");
  if (!await consumeRateLimit(key, 4, 60 * 60 * 1000)) return { ok: false, message: "Too many requests. Please try again later." };
  const { name,email,phone,company,service,preferredAt,timezone,message } = parsed.data;
  await db.strategyCallRequest.create({ data: { name,email,phone,company,service,preferredAt:new Date(preferredAt),timezone,message } });
  return { ok: true };
}
