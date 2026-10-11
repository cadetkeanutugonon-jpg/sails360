import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEMO_COOKIE } from "@/lib/auth/constants";

/**
 * First line of defence for /admin: runs BEFORE any page renders, so no admin
 * content is ever streamed to an unauthenticated visitor. This only checks that
 * a session exists; the admin layout and (later) Supabase RLS re-verify it.
 *
 * Until Supabase Auth is implemented, a configured (non-demo) deployment has
 * no valid admin session at all, so every admin page redirects to /admin/login.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
  const hasDemoSession =
    !supabaseConfigured && request.cookies.get(DEMO_COOKIE)?.value === "1";

  if (!hasDemoSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
