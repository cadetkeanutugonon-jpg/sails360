import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = { title: "Maritime Excellence" };

export default function MaritimeExcellencePage() {
  return (
    <InfoPage
      eyebrow="Pillar"
      title="Maritime Excellence"
      description="Professional development and career preparation for future maritime professionals."
      blocks={[
        {
          title: "Maritime Excellence Program",
          body: "Helps students grow toward the standard expected in the maritime profession.",
        },
        {
          title: "SAILS Career Connect",
          body: "Career preparation, resume and interview resources, and industry information.",
        },
        {
          title: "Learning resources",
          body: "Maritime references and study materials will be listed in the resources library once approved.",
          pending: true,
        },
        {
          title: "Workshops",
          body: "Professional development workshops will be announced here. None are confirmed yet.",
          pending: true,
        },
      ]}
      actions={[
        { href: "/programs/maritime-excellence-program", label: "View the program" },
        { href: "/career-connect", label: "Career Connect" },
        { href: "/resources", label: "Resources" },
      ]}
    />
  );
}
