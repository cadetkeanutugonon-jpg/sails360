import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Badge, DemoBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState, PageHeader, Section } from "@/components/ui/Section";
import { publishedAnnouncements } from "@/data/demo";
import { formatDate } from "@/lib/utilities/cn";

export const metadata: Metadata = { title: "Announcements" };

export default function AnnouncementsPage() {
  const items = publishedAnnouncements().sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  return (
    <>
      <PageHeader
        eyebrow="Announcements"
        title="Announcements"
        description="Updates from SAILS. Only published announcements appear here."
      />
      <Breadcrumbs items={[{ label: "Announcements" }]} />
      <Section>
        {items.length === 0 ? (
          <EmptyState title="Nothing published yet" message="Check back soon." />
        ) : (
          <ul className="space-y-4">
            {items.map((a) => (
              <li key={a.slug}>
                <Card>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="ocean">{a.category}</Badge>
                    {a.featured && <Badge tone="gold">Featured</Badge>}
                    {a.isDemo && <DemoBadge />}
                  </div>
                  <h2 className="mt-2 text-xl font-bold text-navy">
                    <Link href={`/announcements/${a.slug}`} className="hover:underline">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-slate-soft">
                    {formatDate(a.publishedAt)}
                  </p>
                  <p className="mt-2 text-sm">{a.excerpt}</p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
