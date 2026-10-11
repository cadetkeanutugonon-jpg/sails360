import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { LinkCard } from "@/components/ui/Card";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { pillars } from "@/data/pillars";
import { programsForPillar } from "@/data/programs";

export const metadata: Metadata = { title: "SAILS 360 — Five Pillars" };

export default function Sails360Page() {
  return (
    <>
      <PageHeader
        eyebrow="Framework"
        title="SAILS 360"
        description="Five pillars cover the whole BSMT student experience. Each pillar connects to platform programs."
      />
      <Breadcrumbs items={[{ label: "SAILS 360" }]} />
      <Section>
        <SectionHeading title="Choose a pillar" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <LinkCard key={p.slug} href={`/sails-360/${p.slug}`}>
              <h3 className="text-xl font-bold text-navy">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-soft">{p.purpose}</p>
              <p className="mt-3 text-xs font-semibold text-ocean">
                {programsForPillar(p.slug).length} related program
                {programsForPillar(p.slug).length === 1 ? "" : "s"}
              </p>
            </LinkCard>
          ))}
        </div>
      </Section>
    </>
  );
}
