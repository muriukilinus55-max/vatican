import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

export async function requireStaff() {
  if (!hasSupabaseConfig()) redirect("/admin/setup");
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/setup");

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, active")
    .eq("id", data.user.id)
    .maybeSingle();
  if (!profile?.active) redirect("/admin/login?error=inactive");

  return { supabase, user: data.user, profile };
}

