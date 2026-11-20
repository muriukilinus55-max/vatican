"use client";

import { useState, type FormEvent } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const form = new FormData(event.currentTarget);
      const email = String(form.get("email") ?? "").trim();
      const password = String(form.get("password") ?? "");
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError("Login failed.");
      } else {
        router.replace("/admin");
        router.refresh();
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Login unavailable.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <p className="admin-alert" role="alert">{error}</p>}
      <label htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="username" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required />
      <button type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
