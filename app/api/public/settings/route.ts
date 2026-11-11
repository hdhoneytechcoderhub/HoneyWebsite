import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { demoSettings } from "@/lib/demo-content";
import { withPublicDatabaseFallback } from "@/lib/public-db";

export const runtime = "nodejs";

const publicSettingKeys = [
  "brandSummary",
  "contactEmail",
  "contactPhone",
  "contactAddress",
  "whatsappNumber",
  "socialLinks",
  "heroVideoUrl",
  "heroStats",
  "officeMapUrl",
] as const;

export async function GET() {
  const settings = await withPublicDatabaseFallback(async () => {
    const rows = await db.siteSetting.findMany({
      where: { key: { in: [...publicSettingKeys] } },
    });
    return { ...demoSettings, ...Object.fromEntries(rows.map(({ key, value }) => [key, value])) };
  }, demoSettings);

  return NextResponse.json(
    { settings },
    { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=600" } },
  );
}
