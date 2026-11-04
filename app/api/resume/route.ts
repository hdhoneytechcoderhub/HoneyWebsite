import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/security";
export const runtime = "nodejs";
export async function GET(request: Request) {
  if(!await getAdmin()) return NextResponse.json({message:"Unauthorized"},{status:401});
  const id=new URL(request.url).searchParams.get("id"); if(!id) return NextResponse.json({message:"Missing application id."},{status:400});
  const application=await db.jobApplication.findUnique({where:{id},select:{resumeData:true,resumeFilename:true,resumeContentType:true}});
  if(!application?.resumeData) return NextResponse.json({message:"Resume unavailable."},{status:404});
  const headers=new Headers();headers.set("Content-Type",application.resumeContentType||"application/octet-stream");headers.set("Content-Disposition",`attachment; filename="${(application.resumeFilename||"resume").replace(/[\r\n"\\]/g,"")}"`);headers.set("Cache-Control","private, no-store");
  return new Response(new Uint8Array(application.resumeData),{headers});
}
