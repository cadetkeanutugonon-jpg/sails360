import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { SubmissionForm } from "@/components/forms/SubmissionForm";
import { Card } from "@/components/ui/Card";
import { EmptyState, PageHeader, Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Student Recognition" };

export default function RecognitionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Camaraderie"
        title="Student Recognition"
        description="Celebrating achievement and good example across the BSMT community."
      />
      <Breadcrumbs items={[{ label: "Recognition" }]} />
      <Section>
        <SectionHeading title="Recognized students" />
        <EmptyState
          title="No recognitions published yet"
          message="Featured profiles appear only with the student's consent and after authorized review."
        />
      </Section>
      <Section tone="mist">
        <SectionHeading
          title="Nominate a student"
          description="Nominations are reviewed by authorized officers before anything is published."
        />
        <Card className="max-w-2xl">
          <SubmissionForm
            kind="nomination"
            submitLabel="Submit nomination"
            fields={[
              { name: "nominee", label: "Nominee's name", required: true },
              {
                name: "reason",
                label: "Why do they deserve recognition?",
                type: "textarea",
                required: true,
                help: "At least 20 characters.",
              },
              { name: "yourName", label: "Your name" },
            ]}
          />
        </Card>
      </Section>
    </>
  );
}
