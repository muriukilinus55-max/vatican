import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return <LoginPage searchParams={searchParams} />;
}

async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="admin-auth">
      <section className="admin-auth__panel" aria-labelledby="login-title">
        <p className="admin-kicker">Embassy staff access</p>
        <h1 id="login-title">Administration portal</h1>
        <p>Authorised personnel only.</p>
        {params.error === "inactive" && <p className="admin-alert" role="alert">This account is inactive.</p>}
        {params.error === "invalid" && <p className="admin-alert" role="alert">Login failed. Check your credentials.</p>}
        <LoginForm />
      </section>
    </main>
  );
}
