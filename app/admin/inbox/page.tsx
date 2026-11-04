import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminInbox } from "@/components/admin-inbox";
import { getAdmin } from "@/lib/security";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ type?: string }> };
const inboxTypes = new Set(["enquiries", "strategy", "applications"]);

export default async function AdminInboxPage({ searchParams }: Props) {
  if (!await getAdmin()) redirect("/admin/login");
  const { type: queryType } = await searchParams;
  const type = queryType && inboxTypes.has(queryType) ? queryType : "enquiries";
  const title = type === "strategy" ? "Strategy call requests" : type === "applications" ? "Job applications" : "Enquiries";

  return <main className="admin-shell">
    <header className="admin-bar"><strong>Honey Media House · Inbox</strong><Link className="button button-small" href="/admin">Dashboard</Link></header>
    <section className="admin-body">
      <p className="eyebrow">Customer submissions</p>
      <h1>{title}</h1>
      <nav className="admin-nav" aria-label="Submission types">
        <Link href="/admin/inbox?type=enquiries" aria-current={type === "enquiries" ? "page" : undefined}>Enquiries</Link>
        <Link href="/admin/inbox?type=strategy" aria-current={type === "strategy" ? "page" : undefined}>Strategy calls</Link>
        <Link href="/admin/inbox?type=applications" aria-current={type === "applications" ? "page" : undefined}>Applications</Link>
      </nav>
      <AdminInbox type={type} />
    </section>
  </main>;
}
