import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminAboutEditor } from "@/components/admin-about-editor";
import { getAdmin } from "@/lib/security";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  if (!await getAdmin()) redirect("/admin/login");
  return <main className="admin-shell"><header className="admin-bar"><strong>Honey Media House · About Page</strong><Link className="button button-small" href="/admin">Dashboard</Link></header><section className="admin-body"><p className="eyebrow">Public page content</p><h1>About Page</h1><p>Manage the public About page. Draft saves do not change what visitors see; publishing updates the About page and shared homepage statistics.</p><AdminAboutEditor/></section></main>;
}
