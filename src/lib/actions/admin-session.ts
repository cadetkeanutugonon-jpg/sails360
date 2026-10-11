"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isDemoMode } from "@/lib/config";
import { DEMO_COOKIE } from "@/lib/auth/constants";

export async function startDemoSession() {
  // Refuse outright when a backend is configured: demo sessions must never
  // grant access to a real deployment.
  if (!isDemoMode()) redirect("/admin/login");
  const store = await cookies();
  store.set(DEMO_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 4,
  });
  redirect("/admin");
}

export async function endSession() {
  const store = await cookies();
  store.delete({ name: DEMO_COOKIE, path: "/admin" });
  redirect("/admin/login");
}
