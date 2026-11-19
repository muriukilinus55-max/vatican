import Link from "next/link";
import { requireStaff } from "@/lib/admin";
import { logoutAdmin } from "@/app/actions/admin-auth";

const sections = [
  ["News and statements", "/admin/news"],
  ["Diplomatic engagements", "/admin/engagements"],
  ["Events", "/admin/events"],
  ["Publications", "/admin/publications"],
  ["Media library", "/admin/media"],
  ["Institutional pages", "/admin/pages"],
  ["Ambassador's office", "/admin/ambassador"],
  ["Relations", "/admin/relations"],
  ["Cooperation priorities", "/admin/cooperation"],
  ["Translations", "/admin/translations"],
  ["Content approvals", "/admin/approvals"],
  ["Users and permissions", "/admin/users"],
  ["Audit logs", "/admin/audit"],
  ["Website settings", "/admin/settings"],
];

export default async function AdminDashboard() {
  const { profile } = await requireStaff();
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/admin">Embassy CMS</Link>
        <nav aria-label="Administration">
          {sections.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <form action={logoutAdmin}><button className="admin-logout" type="submit">Sign out</button></form>
      </aside>
      <section className="admin-workspace">
        <header className="admin-header">
          <div><p className="admin-kicker">Administration</p><h1>Dashboard</h1></div>
          <span>{profile.display_name}</span>
        </header>
        <div className="admin-notice">
          Dashboard counts are unavailable until the dedicated database is configured and migrations are applied.
          No sample or invented statistics are displayed.
        </div>
        <h2>Operational sections</h2>
        <div className="admin-grid">
          {sections.map(([label, href]) => (
            <Link className="admin-card" href={href} key={href}><strong>{label}</strong><span>Open section</span></Link>
          ))}
        </div>
      </section>
    </main>
  );
}
