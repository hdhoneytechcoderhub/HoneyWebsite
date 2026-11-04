import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/security";
export const runtime = "nodejs";
export async function GET(request: Request) {
  if (!await getAdmin()) return NextResponse.json({message:"Unauthorized"},{status:401});
  const type = new URL(request.url).searchParams.get("type") || "enquiries";
  if(type==="enquiries") return NextResponse.json(await db.enquiry.findMany({orderBy:{createdAt:"desc"},take:100}));
  if(type==="strategy") return NextResponse.json(await db.strategyCallRequest.findMany({orderBy:{createdAt:"desc"},take:100}));
  if(type==="applications") return NextResponse.json(await db.jobApplication.findMany({select:{id:true,name:true,email:true,phone:true,position:true,resumeFilename:true,portfolioUrl:true,message:true,status:true,notes:true,createdAt:true},orderBy:{createdAt:"desc"},take:100}));
  return NextResponse.json({message:"Unknown inbox"},{status:400});
}
export async function PATCH(request: Request) {
  if (!await getAdmin()) return NextResponse.json({message:"Unauthorized"},{status:401});
  const input = await request.json().catch(()=>null);
  if(!input || typeof input.id!=="string" || typeof input.type!=="string") return NextResponse.json({message:"Invalid request"},{status:400});
  const statuses: Record<string,string[]>={enquiries:["NEW","CONTACTED","IN_PROGRESS","CLOSED"],strategy:["NEW","REVIEWED","ARCHIVED"],applications:["NEW","REVIEWED","ARCHIVED"]};
  if(!statuses[input.type] || (input.status && !statuses[input.type].includes(input.status)) || (input.notes!==undefined && typeof input.notes!=="string")) return NextResponse.json({message:"Invalid update"},{status:400});
  const data={...(input.status?{status:input.status}:{}),...(input.notes!==undefined?{notes:String(input.notes).slice(0,5000)}:{})};
  try {
    const row=input.type==="enquiries"?await db.enquiry.update({where:{id:input.id},data:data as never}):input.type==="strategy"?await db.strategyCallRequest.update({where:{id:input.id},data:data as never}):await db.jobApplication.update({where:{id:input.id},data:data as never});
    return NextResponse.json({ok:true,id:row.id});
  } catch {return NextResponse.json({message:"Record not found."},{status:404});}
}
