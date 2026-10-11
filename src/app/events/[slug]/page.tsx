import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { DemoBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader, Section } from "@/components/ui/Section";
import { events } from "@/data/demo";
import { formatDateTime } from "@/lib/utilities/cn";

const find = (slug: string) =>
  events.find((e) => e.slug === slug && e.status === "published");

export function generateStaticParams() {
  return events.filter((e) => e.status === "published").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: find(slug)?.title ?? "Event" };
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const e = find(slug);
  if (!e) notFound();
  return (
    <>
      <PageHeader eyebrow={e.category} title={e.title} description={e.summary} />
      <Breadcrumbs items={[{ label: "Events", href: "/events" }, { label: e.title }]} />
      <Section>
        <Card className="max-w-xl">
          {e.isDemo && <DemoBadge />}
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="font-semibold text-navy">When</dt>
              <dd>{formatDateTime(e.startsAt)}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Where</dt>
              <dd>{e.location}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Registration</dt>
              <dd>Not open. Registration is available only when configured by officers.</dd>
            </div>
          </dl>
        </Card>
      </Section>
    </>
  );
}
