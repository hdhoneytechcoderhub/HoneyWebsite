import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/security";
import { AdminSettingsForm } from "@/components/admin-settings-form";
export const dynamic = "force-dynamic";
export default async function SettingsPage() { if (!await getAdmin()) redirect("/admin/login"); return <main className="admin-shell"><header className="admin-bar"><strong>Honey Media House · Site settings</strong><Link className="button button-small" href="/admin">Dashboard</Link></header><section className="admin-body"><p className="eyebrow">Brand and contact settings</p><h1>Site settings</h1><AdminSettingsForm /></section></main>; }
