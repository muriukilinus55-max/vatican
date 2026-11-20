import { hasSupabaseConfig } from "@/lib/supabase/config";

export default function AdminSetup() {
  const configured = hasSupabaseConfig();
  return (
    <main className="admin-auth">
      <section className="admin-auth__panel">
        <p className="admin-kicker">Phase 5 integration status</p>
        <h1>Supabase setup required</h1>
        {configured ? (
          <p>The environment variables are present, but database migrations and staff accounts must be established in the dedicated Supabase project.</p>
        ) : (
          <p>No dedicated Supabase project credentials are configured. The administration portal is intentionally unavailable until a separately owned project is approved and configured.</p>
        )}
        <ul>
          <li>Create an independent Supabase project for this website.</li>
          <li>Apply both migrations in <code>supabase/migrations</code>.</li>
          <li>Set server and publishable environment variables; never expose the service-role key.</li>
          <li>Create staff accounts only through Supabase Auth and authorised invitations.</li>
        </ul>
      </section>
    </main>
  );
}
