import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { SubmissionForm } from "@/components/forms/SubmissionForm";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact SAILS"
        description="Reach an authorized representative with a general inquiry."
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="Send an inquiry" />
            <Card>
              <SubmissionForm
                kind="contact"
                submitLabel="Send inquiry"
                fields={[
                  { name: "name", label: "Your name", required: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "message", label: "Message", type: "textarea", required: true },
                ]}
              />
            </Card>
          </div>
          <div>
            <SectionHeading title="Official channels" />
            <Card>
              <Badge tone="demo">Placeholder</Badge>
              <p className="mt-3 text-sm text-slate-soft">
                Verified email, social media and office details will be listed
                here once supplied by the organization. Until then, please use
                the form.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
