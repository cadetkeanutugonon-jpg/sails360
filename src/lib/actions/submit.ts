"use server";

import { isDemoMode } from "@/lib/config";
import {
  formSchemas,
  type FormKind,
  type FormState,
} from "@/lib/validation/forms";

/**
 * Validates a public form on the server.
 *
 * Release 1 has no connected backend, so valid submissions are NOT stored.
 * We say so plainly instead of pretending the message was sent.
 * When Supabase is configured, replace the unavailable branch with an
 * insert into the matching table (see supabase/migrations).
 */
export async function submitForm(
  kind: FormKind,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Honeypot: real people never fill this hidden field.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success", message: "Thank you." };
  }

  const schema = formSchemas[kind];
  if (!schema) return { status: "error", message: "Unknown form." };

  const raw = Object.fromEntries(
    Array.from(formData.entries()).filter(([k]) => k !== "website"),
  );
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  if (isDemoMode()) {
    return {
      status: "demo",
      message:
        "Your entry is valid, but this is demo mode: nothing was sent or stored. Do not submit real concerns here yet.",
    };
  }

  return {
    status: "error",
    message:
      "Submissions are not available yet because storage has not been set up. Please try again later.",
  };
}
