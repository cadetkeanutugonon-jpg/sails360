import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = { title: "Career Connect" };

export default function CareerConnectPage() {
  return (
    <InfoPage
      eyebrow="Program"
      title="SAILS Career Connect"
      description="Preparing BSMT students for careers in the maritime industry."
      blocks={[
        {
          title: "Career preparation",
          body: "Guidance for planning your path from cadet to professional.",
        },
        {
          title: "Resume and interview resources",
          body: "Templates and tips will be added to the resources library once approved.",
          pending: true,
        },
        {
          title: "Industry information",
          body: "Maritime industry information will be shared here when verified.",
          pending: true,
        },
        {
          title: "Workshops and networking",
          body: "No workshops or networking events are confirmed yet. This page does not list job openings or company partnerships.",
          pending: true,
        },
      ]}
      actions={[
        { href: "/programs/sails-career-connect", label: "View the program" },
        { href: "/events", label: "See events" },
      ]}
    />
  );
}
