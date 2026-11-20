import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const secret = process.env.CMS_SCHEDULER_SECRET;
  const supplied = request.headers.get("authorization");
  if (!secret || supplied !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    return NextResponse.json({ error: "Publishing integration unavailable" }, { status: 503 });
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const now = new Date().toISOString();
  const { data: schedules, error } = await supabase
    .from("publishing_schedules")
    .select("id, content_item_id")
    .lte("scheduled_at", now)
    .is("cancelled_at", null)
    .is("published_at", null);
  if (error) return NextResponse.json({ error: "Schedule query failed" }, { status: 500 });

  let published = 0;
  for (const schedule of schedules ?? []) {
    const { data: content, error: contentError } = await supabase
      .from("content_items")
      .select("id,status")
      .eq("id", schedule.content_item_id)
      .maybeSingle();
    if (contentError || !content || content.status !== "approved") continue;

    const { error: publishError } = await supabase
      .from("content_items")
      .update({ status: "published", published_at: now, publication_at: now })
      .eq("id", content.id);
    if (publishError) continue;

    await supabase
      .from("publishing_schedules")
      .update({ published_at: now })
      .eq("id", schedule.id);
    published += 1;
  }
  return NextResponse.json({ published });
}
