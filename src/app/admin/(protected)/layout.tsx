import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { endSession } from "@/lib/actions/admin-session";
import { getSession } from "@/lib/auth/session";

const adminNav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/announcements", label: "Announcements" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/programs", label: "Programs" },
];

/**
 * Server-side gate: every page under (protected) requires a session.
 * Knowing the URL is not enough.
 */
async function Gate({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return (
    <>
      {session.kind === "demo" && (
        <div role="note" className="bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-900">
          Demo session: not real authentication. Edits stay in this browser only.
        </div>
      )}
      <Container className="py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <nav aria-label="Admin" className="flex flex-wrap gap-1">
            {adminNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-md px-3 py-2 text-sm font-semibold text-navy hover:bg-mist"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <form action={endSession}>
            <Button type="submit" variant="ghost">
              End session
            </Button>
          </form>
        </div>
        <div className="py-6">{children}</div>
      </Container>
    </>
  );
}

export const metadata = { robots: { index: false } };

export default function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<p className="p-8 text-sm text-slate-soft">Checking access…</p>}>
      <Gate>{children}</Gate>
    </Suspense>
  );
}
