import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = { title: "Transparency" };

export default function TransparencyPage() {
  return (
    <InfoPage
      eyebrow="Program"
      title="SAILS Transparency"
      description="Open and accountable student governance."
      blocks={[
        {
          title: "Approved priorities",
          body: "Approved priorities will be published here once confirmed by the organization.",
          pending: true,
        },
        {
          title: "Plans and reports",
          body: "Published plans and activity and accomplishment reports will be listed here.",
          pending: true,
        },
        {
          title: "Project status",
          body: "Project updates will appear here when officers publish them.",
          pending: true,
        },
        {
          title: "Budget summaries",
          body: "Budget summaries are shown only when authorized. Sensitive financial information is never published without approval.",
          pending: true,
        },
      ]}
      actions={[{ href: "/programs/sails-transparency", label: "View the program" }]}
    />
  );
}
