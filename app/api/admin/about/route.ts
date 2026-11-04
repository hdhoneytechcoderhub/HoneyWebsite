import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/security";
import { aboutPageSchema, DEFAULT_ABOUT_CONTENT, parseAboutContent } from "@/lib/about-page";
import { isSameOriginRequest } from "@/lib/validation";

export const runtime = "nodejs";
const statsSchema = z.array(z.object({ value: z.string().trim().max(40), label: z.string().trim().max(80) })).max(4);
export async function GET() {
  if (!await getAdmin()) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const [published, statsRow, draftRow] = await Promise.all([
      db.homepageSection.findUnique({ where: { key: "about" } }),
      db.siteSetting.findUnique({ where: { key: "heroStats" } }),
      db.siteSetting.findUnique({ where: { key: "aboutDraft" } }),
    ]);
    const publishedContent = published ? parseAboutContent(published.content) : DEFAULT_ABOUT_CONTENT;
    const draft = draftRow?.value && typeof draftRow.value === "object" && !Array.isArray(draftRow.value) ? draftRow.value as { content?: unknown; stats?: unknown } : null;
    const content = draft?.content ? parseAboutContent(draft.content) : publishedContent;
    const statsValue = draft && Array.isArray(draft.stats) ? draft.stats : statsRow?.value;
    return NextResponse.json({ content, visible: published?.visible ?? false, stats: Array.isArray(statsValue) ? statsValue : [], hasDraft: Boolean(draft) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return NextResponse.json({ message: "Unable to load About content." }, { status: 500 }); }
}

export async function PUT(request: Request) {
  if (!await getAdmin()) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ message: "Cross-origin request blocked." }, { status: 403 });
  if (!(request.headers.get("content-type") || "").toLowerCase().includes("application/json")) return NextResponse.json({ message: "Expected a JSON request body." }, { status: 415 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ message: "Invalid About content." }, { status: 400 });
  const parsed = aboutPageSchema.safeParse(body.content);
  const parsedStats = statsSchema.safeParse(body.stats);
  if (!parsed.success || !parsedStats.success || typeof body.visible !== "boolean") {
    const issues = [...(parsed.success ? [] : parsed.error.issues.map(issue => ({ path: issue.path.join("."), message: issue.message }))), ...(parsedStats.success ? [] : parsedStats.error.issues.map(issue => ({ path: `stats.${issue.path.join(".")}`, message: issue.message })))];
    return NextResponse.json({ message: "Check About fields, image URLs, JSON values, statistics and publication setting.", issues }, { status: 400 });
  }
  if (JSON.stringify(parsed.data).length > 30000) return NextResponse.json({ message: "About content is too large (maximum 30 KB)." }, { status: 413 });
  const content = { ...parsed.data, demoContent: parsed.data.founder.isDemo || parsed.data.story.timeline.some(item => item.demo) };
  const stats = parsedStats.data;
  if (JSON.stringify({ content, stats }).length > 30000) return NextResponse.json({ message: "About content is too large (maximum 30 KB)." }, { status: 413 });
  try {
    const published = await db.homepageSection.findUnique({ where: { key: "about" } });
    if (!body.visible) {
      const [draft] = await db.$transaction([
        db.siteSetting.upsert({ where: { key: "aboutDraft" }, update: { value: { content, stats } as never }, create: { key: "aboutDraft", value: { content, stats } as never } }),
      ]);
      const publishedContent = published ? parseAboutContent(published.content) : DEFAULT_ABOUT_CONTENT;
      const currentStats = await db.siteSetting.findUnique({ where: { key: "heroStats" } });
      return NextResponse.json({ ok: true, content, visible: published?.visible ?? false, stats, hasDraft: Boolean(draft), publishedContent, publishedStats: Array.isArray(currentStats?.value) ? currentStats.value : [] }, { headers: { "Cache-Control": "private, no-store" } });
    }
    const page = await db.$transaction(async tx => {
      const about = await tx.homepageSection.upsert({ where: { key: "about" }, update: { title: content.hero.title, eyebrow: content.hero.eyebrow, body: content.hero.description, content: content as never, visible: true }, create: { key: "about", title: content.hero.title, eyebrow: content.hero.eyebrow, body: content.hero.description, content: content as never, visible: true, sortOrder: 1 } });
      await tx.siteSetting.upsert({ where: { key: "heroStats" }, update: { value: stats as never }, create: { key: "heroStats", value: stats as never } });
      await tx.siteSetting.deleteMany({ where: { key: "aboutDraft" } });
      return about;
    });
    revalidatePath("/about");
    revalidatePath("/");
    return NextResponse.json({ ok: true, content, visible: page.visible, stats, hasDraft: false }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return NextResponse.json({ message: "Unable to save About content. Published content was not changed." }, { status: 500 }); }
}
