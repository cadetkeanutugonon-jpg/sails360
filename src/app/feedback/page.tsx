import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { SubmissionForm } from "@/components/forms/SubmissionForm";
import { Card } from "@/components/ui/Card";
import { PageHeader, Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Feedback & Student Support" };

export default function FeedbackPage() {
  return (
    <>
      <PageHeader
        eyebrow="Welfare"
        title="Feedback & Student Support"
        description="Two separate paths: general feedback, and private student support concerns."
      />
      <Breadcrumbs items={[{ label: "Feedback" }]} />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="A. General feedback"
              description="Suggestions and ideas for the organization."
            />
            <Card>
              <p className="mb-4 text-sm text-slate-soft">
                We collect your message, and your name and email only if you
                choose to give them. Officers authorized to handle feedback can
                read it.
              </p>
              <SubmissionForm
                kind="feedback"
                submitLabel="Send feedback"
                fields={[
                  { name: "name", label: "Your name" },
                  { name: "email", label: "Email", type: "email" },
                  {
                    name: "message",
                    label: "Your feedback",
                    type: "textarea",
                    required: true,
                  },
                ]}
              />
            </Card>
          </div>

          <div>
            <SectionHeading
              title="B. Private student support concern"
              description="For concerns that should not be public."
            />
            <Card>
              <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-slate-soft">
                <li>Private concerns are kept out of public pages and ordinary announcement tools.</li>
                <li>Only officers authorized for student support should be able to read them.</li>
                <li>Anonymity is not promised. If you give contact details, they are used only to respond.</li>
                <li>What happens after you submit will be confirmed by the organization.</li>
              </ul>
              <SubmissionForm
                kind="concern"
                submitLabel="Submit private concern"
                fields={[
                  {
                    name: "message",
                    label: "Describe your concern",
                    type: "textarea",
                    required: true,
                    help: "Share only what is needed.",
                  },
                  {
                    name: "contact",
                    label: "How can we reach you?",
                    help: "Optional. Without it we cannot reply.",
                  },
                  {
                    name: "consent",
                    type: "checkbox",
                    required: true,
                    label: "I have read how my concern is handled and the privacy notice.",
                  },
                ]}
              />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
