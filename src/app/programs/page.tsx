import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ProgramDirectory } from "@/components/programs/ProgramDirectory";
import { PageHeader, Section } from "@/components/ui/Section";
import { pillars } from "@/data/pillars";
import { programs } from "@/data/programs";

export const metadata: Metadata = { title: "Programs" };

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title="SAILS platform programs"
        description="Ten official programs, grouped under the five pillars. Details marked “to be confirmed” will be updated by officers."
      />
      <Breadcrumbs items={[{ label: "Programs" }]} />
      <Section>
        <ProgramDirectory programs={programs} pillars={pillars} />
      </Section>
    </>
  );
}
