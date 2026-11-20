"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function logoutAdmin() {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function resetAdminPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!email || email.length > 254) return { error: "Enter a valid email address." };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Authentication is not configured." };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    ...(siteUrl ? { redirectTo: `${siteUrl.replace(/\/$/, "")}/admin/login` } : {}),
  });
  if (error) return { error: "Password reset could not be requested." };
  return { success: "If an account exists for this address, reset instructions have been sent." };
}
