import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { PageHeader, Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Privacy Notice" };

const parts = [
  ["What we collect", "Only what you type into a form: your message and, if you choose, your name, email or contact details."],
  ["Why we collect it", "To respond to inquiries, review nominations and improve what the organization offers."],
  ["Who can access it", "Only officers authorized for that kind of submission. Private concerns are not shown on public pages."],
  ["How long we keep it", "Retention period to be confirmed by the organization."],
  ["Contact for privacy questions", "To be confirmed by the organization."],
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy Notice" />
      <Breadcrumbs items={[{ label: "Privacy Notice" }]} />
      <Section>
        <div className="max-w-2xl space-y-6">
          <p className="text-sm text-slate-soft">
            This draft notice follows the principles of the Data Privacy Act of 2012
            (Republic Act No. 10173). It has not been reviewed or certified by an
            authorized privacy or institutional representative.
          </p>
          <Badge tone="demo">Draft for review</Badge>
          {parts.map(([t, b]) => (
            <div key={t}>
              <h2 className="font-bold text-navy">{t}</h2>
              <p className="mt-1 text-sm">{b}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
