import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/admin";
import { logoutAdmin } from "@/app/actions/admin-auth";

const sections: Record<string, string> = {
  news: "News and official statements",
  engagements: "Diplomatic engagements",
  events: "Events",
  publications: "Publications",
  media: "Media library",
  pages: "Institutional pages",
  ambassador: "Ambassador's office",
  relations: "Kenya-Holy See relations",
  cooperation: "Cooperation priorities",
  translations: "Translations",
  approvals: "Content approvals",
  users: "Users and permissions",
  audit: "Audit logs",
  settings: "Website settings",
};

export default async function AdminSection({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  await requireStaff();
  const { section } = await params;
  const title = sections[section];
  if (!title) notFound();
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/admin">Embassy CMS</Link>
        <nav aria-label="Administration">
          {Object.entries(sections).map(([slug, label]) => (
            <Link href={`/admin/${slug}`} key={slug}>{label}</Link>
          ))}
        </nav>
        <form action={logoutAdmin}><button className="admin-logout" type="submit">Sign out</button></form>
      </aside>
      <section className="admin-workspace">
        <header className="admin-header"><div><p className="admin-kicker">Administration</p><h1>{title}</h1></div></header>
        <div className="admin-notice">This section is protected and database-backed. Create, edit, approval and publishing controls require the relevant staff permission and migration setup.</div>
        <div className="empty-state"><h2>No records available</h2><p>No data can be read until the dedicated Supabase project is configured and staff records exist.</p></div>
      </section>
    </main>
  );
}
