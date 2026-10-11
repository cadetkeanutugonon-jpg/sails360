import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { DemoBadge } from "@/components/ui/Badge";
import { PageHeader, Section } from "@/components/ui/Section";
import { announcements } from "@/data/demo";
import { formatDate } from "@/lib/utilities/cn";

const find = (slug: string) =>
  announcements.find((a) => a.slug === slug && a.status === "published");

export function generateStaticParams() {
  return announcements
    .filter((a) => a.status === "published")
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/announcements/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: find(slug)?.title ?? "Announcement" };
}

export default async function AnnouncementPage({
  params,
}: PageProps<"/announcements/[slug]">) {
  const { slug } = await params;
  const a = find(slug);
  if (!a) notFound();
  return (
    <>
      <PageHeader eyebrow={a.category} title={a.title} description={formatDate(a.publishedAt)} />
      <Breadcrumbs
        items={[{ label: "Announcements", href: "/announcements" }, { label: a.title }]}
      />
      <Section>
        <article className="max-w-2xl space-y-4">
          {a.isDemo && <DemoBadge />}
          {a.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </article>
      </Section>
    </>
  );
}
