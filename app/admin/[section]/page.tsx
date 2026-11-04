import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminContentManager } from "@/components/admin-content-manager";
import { resources, isResource } from "@/lib/admin-content";
import { getAdmin } from "@/lib/security";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ section: string }> };
export default async function AdminSectionPage({ params }: Props) { const admin = await getAdmin(); if (!admin) redirect("/admin/login"); const { section } = await params; if (!isResource(section)) notFound(); return <main className="admin-shell"><header className="admin-bar"><strong>Honey Media House · {resources[section].title}</strong><Link className="button button-small" href="/admin">Dashboard</Link></header><section className="admin-body"><p className="eyebrow">Content management</p><h1>{resources[section].title}</h1><AdminContentManager resource={section} /></section></main>; }
