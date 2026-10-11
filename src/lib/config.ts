/**
 * The site runs in demo mode until a Supabase project is configured.
 * Demo mode never pretends to be connected: forms explain that submissions
 * are not stored, and the admin area uses a clearly labeled demo session.
 */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

export function isDemoMode() {
  return !isSupabaseConfigured();
}
