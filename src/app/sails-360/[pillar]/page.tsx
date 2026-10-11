import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Card, LinkCard } from "@/components/ui/Card";
import { EmptyState, PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { Badge, DemoBadge } from "@/components/ui/Badge";
import { pillarBySlug, pillars } from "@/data/pillars";
import { programsForPillar } from "@/data/programs";
import { publishedAnnouncements } from "@/data/demo";
import { formatDate } from "@/lib/utilities/cn";

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/sails-360/[pillar]">): Promise<Metadata> {
  const { pillar } = await params;
  const p = pillarBySlug(pillar);
  return { title: p ? `${p.title} Pillar` : "Pillar" };
}

const categoryForPillar: Record<string, string> = {
  academics: "Academics",
  leadership: "Leadership",
  welfare: "Welfare",
};

export default async function PillarPage({
  params,
}: PageProps<"/sails-360/[pillar]">) {
  const { pillar } = await params;
  const p = pillarBySlug(pillar);
  if (!p) notFound();

  const related = programsForPillar(p.slug);
  const category = categoryForPillar[p.slug];
  const news = publishedAnnouncements().filter((a) => a.category === category);

  return (
    <>
      <PageHeader eyebrow="Pillar" title={p.title} description={p.tagline} />
      <Breadcrumbs
        items={[{ label: "SAILS 360", href: "/sails-360" }, { label: p.title }]}
      />

      <Section>
        <SectionHeading title="Purpose" description={p.purpose} />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="font-bold text-navy">What students gain</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-soft">
              {p.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-bold text-navy">How to take part</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-soft">
              {p.howToParticipate.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading title="Related programs" />
        <div className="grid gap-4 sm:grid-cols-2">
          {related.map((r) => (
            <LinkCard key={r.slug} href={`/programs/${r.slug}`}>
              <h3 className="font-bold text-navy">{r.title}</h3>
              <p className="mt-1 text-sm text-slate-soft">{r.summary}</p>
            </LinkCard>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Announcements" />
        {news.length === 0 ? (
          <EmptyState
            title="No announcements yet"
            message="Updates for this pillar will appear here once published."
          />
        ) : (
          <ul className="space-y-3">
            {news.map((a) => (
              <li key={a.slug}>
                <Card>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="ocean">{a.category}</Badge>
                    {a.isDemo && <DemoBadge />}
                  </div>
                  <h3 className="mt-2 font-bold text-navy">{a.title}</h3>
                  <p className="text-sm text-slate-soft">
                    {formatDate(a.publishedAt)}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
