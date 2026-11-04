import { NextResponse } from "next/server";
import { saveEnquiry, saveStrategyRequest } from "@/lib/forms";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || !("kind" in body)) return NextResponse.json({ ok:false,message:"Invalid request." },{status:400});
    const record = body as Record<string, unknown>; const kind = record.kind;
    const result = kind === "strategy" ? await saveStrategyRequest(record.data) : kind === "enquiry" ? await saveEnquiry(record.data) : null;
    if (!result) return NextResponse.json({ ok:false,message:"Unknown form type." },{status:400});
    return NextResponse.json(result,{status:result.ok?201:422});
  } catch { return NextResponse.json({ok:false,message:"We could not save your request. Please try again."},{status:500}); }
}
