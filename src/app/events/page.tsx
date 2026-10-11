import type { Metadata } from "next";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { CalendarDays, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Badge, DemoBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState, PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { publishedEvents } from "@/data/demo";
import { formatDateTime } from "@/lib/utilities/cn";

export const metadata: Metadata = { title: "Events" };

// Cached for an hour so events move from upcoming to past without a redeploy.
async function splitEvents() {
  "use cache";
  cacheLife("hours");
  const now = Date.now();
  const all = publishedEvents().sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  return {
    all,
    upcoming: all.filter((e) => new Date(e.startsAt).getTime() >= now),
    past: all.filter((e) => new Date(e.startsAt).getTime() < now),
  };
}

export default async function EventsPage() {
  const { upcoming, past } = await splitEvents();

  const list = (items: typeof upcoming) => (
    <ul className="space-y-4">
      {items.map((e) => (
        <li key={e.slug}>
          <Card>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="gold">{e.category}</Badge>
              {e.isDemo && <DemoBadge />}
            </div>
            <h3 className="mt-2 text-lg font-bold text-navy">
              <Link href={`/events/${e.slug}`} className="hover:underline">
                {e.title}
              </Link>
            </h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-soft">
              <CalendarDays className="h-4 w-4" aria-hidden />
              {formatDateTime(e.startsAt)}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-soft">
              <MapPin className="h-4 w-4" aria-hidden />
              {e.location}
            </p>
          </Card>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Events"
        description="An event is confirmed only once an authorized editor publishes it."
      />
      <Breadcrumbs items={[{ label: "Events" }]} />
      <Section>
        <SectionHeading title="Upcoming" />
        {upcoming.length ? (
          list(upcoming)
        ) : (
          <EmptyState title="No upcoming events" message="New events will be posted here." />
        )}
      </Section>
      <Section tone="mist">
        <SectionHeading title="Past events" />
        {past.length ? (
          list(past)
        ) : (
          <EmptyState title="No past events" message="Past events will be archived here." />
        )}
      </Section>
    </>
  );
}
