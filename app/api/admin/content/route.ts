import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdmin } from "@/lib/security";
import { booleanFields, isResource, jsonFields, numberFields, resources } from "@/lib/admin-content";
import { isSameOriginRequest } from "@/lib/validation";

export const runtime = "nodejs";
type Delegate = { findMany(args: Record<string, unknown>): Promise<unknown[]>; findUnique(args: Record<string, unknown>): Promise<unknown>; create(args: Record<string, unknown>): Promise<unknown>; update(args: Record<string, unknown>): Promise<unknown>; delete(args: Record<string, unknown>): Promise<unknown> };
function delegate(resource: keyof typeof resources): Delegate { return (db as unknown as Record<string, Delegate>)[resources[resource].model]; }
function parseValue(field: string, value: unknown): unknown {
  if (booleanFields.has(field)) return value === true || value === "true" || value === "on";
  if (numberFields.has(field)) { const parsed = Number(value); return Number.isInteger(parsed) ? parsed : 0; }
  if (jsonFields.has(field)) { if (Array.isArray(value) || (value && typeof value === "object")) return value; if (typeof value !== "string" || !value.trim()) return []; try { return JSON.parse(value); } catch { throw new Error(`${field} must contain valid JSON.`); } }
  if (field === "publishedAt") return value ? new Date(String(value)) : null;
  if (field === "status") { const status = String(value); if (!["DRAFT", "PUBLISHED"].includes(status)) throw new Error("Invalid publishing status."); return status; }
  if (field === "key") return String(value ?? "").trim().slice(0, 100);
  if (["title", "slug", "name", "role", "company", "location", "team", "employmentType", "icon", "image", "clientLabel", "excerpt"].includes(field)) return String(value ?? "").trim().slice(0, 500);
  if (["body", "description", "overview", "challenge", "approach", "quote", "summary", "seoTitle", "seoDescription"].includes(field)) return String(value ?? "").slice(0, 30000);
  return value;
}
export async function GET(request: Request) {
  if (!await getAdmin()) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const url = new URL(request.url); const name = url.searchParams.get("resource") || "";
  if (!isResource(name)) return NextResponse.json({ message: "Unknown content type." }, { status: 400 });
  const search = (url.searchParams.get("q") || "").trim().slice(0, 120); const page = Math.max(1, Number(url.searchParams.get("page")) || 1); const fields = resources[name].fields;
  const searchField = fields.includes("title" as never) ? "title" : fields.includes("name" as never) ? "name" : "key";
  try { const rows = await delegate(name).findMany({ where: search ? { [searchField]: { contains: search, mode: "insensitive" } } : {}, orderBy: fields.includes("sortOrder" as never) ? { sortOrder: "asc" } : { updatedAt: "desc" }, skip: (page - 1) * 50, take: 50 }); return NextResponse.json({ rows, fields, title: resources[name].title, page }); }
  catch { return NextResponse.json({ message: "Unable to load content." }, { status: 500 }); }
}
export async function POST(request: Request) {
  if (!await getAdmin()) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ message: "Cross-origin request blocked." }, { status: 403 });
  const input = await request.json().catch(() => null); if (!input || typeof input.resource !== "string" || !isResource(input.resource) || !input.data || typeof input.data !== "object") return NextResponse.json({ message: "Invalid content request." }, { status: 400 });
  const name = input.resource as keyof typeof resources; const data: Record<string, unknown> = {};
  try { for (const field of resources[name].fields) if (field in input.data) data[field] = parseValue(field, input.data[field]); if (name === "articles" && typeof data.publishedAt === "string") data.publishedAt = new Date(data.publishedAt); const row = await delegate(name).create({ data }); return NextResponse.json({ ok: true, row }, { status: 201 }); }
  catch (error) { return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to create content." }, { status: 400 }); }
}
export async function PATCH(request: Request) {
  if (!await getAdmin()) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ message: "Cross-origin request blocked." }, { status: 403 });
  const input = await request.json().catch(() => null); if (!input || typeof input.resource !== "string" || !isResource(input.resource) || typeof input.id !== "string" || !input.data || typeof input.data !== "object") return NextResponse.json({ message: "Invalid content request." }, { status: 400 });
  const name = input.resource as keyof typeof resources; const data: Record<string, unknown> = {};
  try { for (const field of resources[name].fields) if (field in input.data) data[field] = parseValue(field, input.data[field]); const row = await delegate(name).update({ where: { id: input.id }, data }); return NextResponse.json({ ok: true, row }); }
  catch (error) { return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to update content." }, { status: 400 }); }
}
export async function DELETE(request: Request) {
  if (!await getAdmin()) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ message: "Cross-origin request blocked." }, { status: 403 });
  const input = await request.json().catch(() => null); if (!input || typeof input.resource !== "string" || !isResource(input.resource) || typeof input.id !== "string") return NextResponse.json({ message: "Invalid content request." }, { status: 400 });
  try { await delegate(input.resource).delete({ where: { id: input.id } }); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ message: "Unable to delete this record. It may be linked to other content." }, { status: 409 }); }
}
