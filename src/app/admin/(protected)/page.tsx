import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { programs } from "@/data/programs";
import { publishedAnnouncements, publishedEvents } from "@/data/demo";

export const metadata: Metadata = { title: "Admin overview" };

const planned = [
  "Resources and file management",
  "Recognition nominations review",
  "Feedback and private concerns review",
  "Reports and audit logs",
  "User and role management",
  "Event registrations",
];

export default function AdminOverviewPage() {
  const stats = [
    ["Published announcements", publishedAnnouncements().length],
    ["Published events", publishedEvents().length],
    ["Active programs", programs.filter((p) => p.status === "active").length],
    ["Programs listed", programs.length],
  ] as const;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-extrabold text-navy">Overview</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <li key={label}>
            <Card>
              <p className="text-3xl font-extrabold text-navy">{value}</p>
              <p className="mt-1 text-sm text-slate-soft">{label}</p>
            </Card>
          </li>
        ))}
      </ul>
      <Card>
        <h2 className="font-bold text-navy">Not available yet</h2>
        <p className="mt-1 text-sm text-slate-soft">
          These modules need the backend (Supabase) and are not part of the
          first release:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-soft">
          {planned.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
