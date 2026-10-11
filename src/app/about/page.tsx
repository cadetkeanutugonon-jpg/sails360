import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { pillars } from "@/data/pillars";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "About SAILS" };

const faqs = [
  {
    q: "What is SAILS 360?",
    a: "A student leadership platform for BSMT students built around five pillars: Academics, Leadership, Welfare, Camaraderie and Maritime Excellence.",
  },
  {
    q: "Do I need an account to use this site?",
    a: "No. You can browse programs, read announcements, find events and use public resources without an account.",
  },
  {
    q: "Is this an official school website?",
    a: site.disclaimer,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About SAILS"
        description={site.description}
      />
      <Breadcrumbs items={[{ label: "About" }]} />

      <Section>
        <SectionHeading eyebrow="Our direction" title="Core commitments" />
        <div className="grid gap-4 sm:grid-cols-3">
          {["Listen", "Develop", "Unite"].map((w) => (
            <Card key={w}>
              <h3 className="font-heading text-2xl font-extrabold text-navy">
                {w}.
              </h3>
            </Card>
          ))}
        </div>
        <p className="mt-6 font-heading text-xl font-bold text-ocean">
          {site.slogan}
        </p>
      </Section>

      <Section tone="mist">
        <SectionHeading
          title="Mission and vision"
          description="The official mission and vision statements will be added here once supplied by the organization."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <Badge tone="demo">Placeholder</Badge>
            <h3 className="mt-3 font-bold text-navy">Mission</h3>
            <p className="mt-1 text-sm text-slate-soft">
              Official mission statement to be provided.
            </p>
          </Card>
          <Card>
            <Badge tone="demo">Placeholder</Badge>
            <h3 className="mt-3 font-bold text-navy">Vision</h3>
            <p className="mt-1 text-sm text-slate-soft">
              Official vision statement to be provided.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeading title="The five pillars" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.slug}>
              <Card>
                <h3 className="font-bold text-navy">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-soft">{p.purpose}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist">
        <SectionHeading
          title="Officers and committees"
          description="Officer names, committees and adviser information are not published until authorized and supplied."
        />
        <Card>
          <Badge tone="demo">Placeholder</Badge>
          <p className="mt-3 text-sm text-slate-soft">
            No officer or adviser information has been provided yet.
          </p>
        </Card>
      </Section>

      <Section>
        <SectionHeading title="Frequently asked questions" />
        <dl className="space-y-4">
          {faqs.map((f) => (
            <Card key={f.q}>
              <dt className="font-bold text-navy">{f.q}</dt>
              <dd className="mt-1 text-sm text-slate-soft">{f.a}</dd>
            </Card>
          ))}
        </dl>
      </Section>
    </>
  );
}
