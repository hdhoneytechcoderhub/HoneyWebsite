import { createHash, randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { db } from "@/lib/db";

const COOKIE = "hmh_admin_session";
const SESSION_DAYS = 7;
const hash = (value: string) => createHash("sha256").update(value).digest("hex");

export async function createSession(userId: string) {
  const raw = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000);
  await db.adminSession.create({ data: { tokenHash: hash(raw), userId, expiresAt } });
  (await cookies()).set(COOKIE, raw, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires: expiresAt });
}

export async function destroySession() {
  const jar = await cookies(); const raw = jar.get(COOKIE)?.value;
  if (raw) await db.adminSession.deleteMany({ where: { tokenHash: hash(raw) } });
  jar.delete(COOKIE);
}

export async function getAdmin() {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  const session = await db.adminSession.findUnique({ where: { tokenHash: hash(raw) }, include: { user: true } });
  if (!session || session.expiresAt <= new Date()) return null;
  return { id: session.user.id, name: session.user.name, email: session.user.email };
}

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) throw new Error("Unauthorized");
  return admin;
}

export async function consumeRateLimit(key: string, limit = 8, windowMs = 60 * 60 * 1000) {
  const now = new Date(); const resetAt = new Date(Date.now() + windowMs);
  return db.$transaction(async tx => {
    const found = await tx.rateLimit.findUnique({ where: { key } });
    if (!found || found.resetAt <= now) {
      await tx.rateLimit.upsert({ where: { key }, update: { count: 1, resetAt }, create: { key, count: 1, resetAt } });
      return true;
    }
    if (found.count >= limit) return false;
    await tx.rateLimit.update({ where: { key }, data: { count: { increment: 1 } } });
    return true;
  });
}

export async function requestRateLimitKey(prefix: string) {
  const h = await headers(); const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return `${prefix}:${hash(ip)}`;
}
