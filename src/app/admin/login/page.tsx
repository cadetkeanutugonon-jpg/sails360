import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Section";
import { startDemoSession } from "@/lib/actions/admin-session";
import { isDemoMode } from "@/lib/config";

export const metadata: Metadata = {
  title: "Admin sign-in",
  robots: { index: false },
};

export default function AdminLoginPage() {
  const demo = isDemoMode();
  return (
    <Container className="py-16">
      <Card className="mx-auto max-w-md">
        <h1 className="text-2xl font-extrabold text-navy">Admin area</h1>
        {demo ? (
          <>
            <p className="mt-3 text-sm text-slate-soft">
              No backend is connected, so real sign-in is not available. You can
              open a <strong>demo session</strong> to try the editor. It is not
              real authentication, holds no real data, and edits stay in this
              browser only.
            </p>
            <form action={startDemoSession} className="mt-6">
              <Button type="submit">Start demo session</Button>
            </form>
          </>
        ) : (
          <p className="mt-3 text-sm text-slate-soft">
            Administrator sign-in will use Supabase Auth. It has not been set up
            yet, so the admin area is locked.
          </p>
        )}
      </Card>
    </Container>
  );
}
