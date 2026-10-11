import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader, Section } from "@/components/ui/Section";
import { pillarBySlug } from "@/data/pillars";
import { programBySlug, programs } from "@/data/programs";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = programBySlug(slug);
  return { title: p?.title ?? "Program" };
}

export default async function ProgramPage({
  params,
}: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) notFound();
  const pillar = pillarBySlug(program.pillar);

  return (
    <>
      <PageHeader eyebrow={pillar?.title} title={program.title} description={program.summary} />
      <Breadcrumbs
        items={[{ label: "Programs", href: "/programs" }, { label: program.title }]}
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="font-bold text-navy">Purpose</h2>
            <p className="mt-2 text-sm text-slate-soft">{program.purpose}</p>
          </Card>
          <Card>
            <h2 className="font-bold text-navy">Objectives</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-soft">
              {program.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="font-bold text-navy">Who it is for</h2>
            <p className="mt-2 text-sm text-slate-soft">{program.beneficiaries}</p>
          </Card>
          <Card>
            <h2 className="font-bold text-navy">How to take part</h2>
            <p className="mt-2 text-sm text-slate-soft">{program.participation}</p>
            <Badge tone="demo" className="mt-3">
              To be confirmed
            </Badge>
          </Card>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Ask about this program</ButtonLink>
          <ButtonLink href={`/sails-360/${program.pillar}`} variant="ghost">
            View the {pillar?.title} pillar
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
