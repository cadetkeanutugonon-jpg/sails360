import { cookies } from "next/headers";
import { isDemoMode } from "@/lib/config";
import { DEMO_COOKIE } from "@/lib/auth/constants";

export type Session =
  | { kind: "demo"; role: "admin" }
  | { kind: "supabase"; role: string; userId: string };

/**
 * Returns the current session, or null.
 *
 * A "demo" session is NOT real authentication. It exists only while the site
 * runs without a backend, holds no real data, and is always labeled as demo.
 * Real sessions will come from Supabase Auth once it is configured. Until
 * that is implemented, configured deployments get no admin access at all.
 */
export async function getSession(): Promise<Session | null> {
  if (isDemoMode()) {
    const store = await cookies();
    return store.get(DEMO_COOKIE)?.value === "1"
      ? { kind: "demo", role: "admin" }
      : null;
  }
  // TODO(supabase): resolve the Supabase Auth user and their role from profiles.
  return null;
}
