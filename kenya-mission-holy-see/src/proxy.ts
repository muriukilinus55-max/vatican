import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin") || pathname === "/admin/login" || pathname === "/admin/setup") {
    return NextResponse.next();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/setup";
    return NextResponse.redirect(redirectUrl);
  }

  const response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    return NextResponse.redirect(redirectUrl);
  }
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
