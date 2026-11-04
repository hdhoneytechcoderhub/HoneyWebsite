import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession, consumeRateLimit, requestRateLimitKey } from "@/lib/security";
import { loginSchema } from "@/lib/validation";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const key = await requestRateLimitKey("admin-login");
  if (!await consumeRateLimit(key, 8, 15 * 60 * 1000)) return NextResponse.json({message:"Too many login attempts. Try again later."},{status:429});
  const input = await request.json().catch(()=>null); const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return NextResponse.json({message:"Enter a valid email and password."},{status:400});
  const user = await db.adminUser.findUnique({where:{email:parsed.data.email.toLowerCase()}});
  if (!user || !await bcrypt.compare(parsed.data.password,user.passwordHash)) return NextResponse.json({message:"Email or password is incorrect."},{status:401});
  await createSession(user.id);
  return NextResponse.json({ok:true});
}
