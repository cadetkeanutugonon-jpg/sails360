import type { Metadata } from "next";
import { HubApp } from "@/components/digital-hub/HubApp";
import {
  publishedAnnouncements,
  publishedEvents,
  publishedResources,
} from "@/data/demo";

export const metadata: Metadata = { title: "Digital Hub" };

export default function DigitalHubPage() {
  return (
    <div className="bg-white sm:bg-line/40">
      <HubApp
        announcements={publishedAnnouncements()}
        events={publishedEvents()}
        resources={publishedResources().filter((r) => r.access === "public")}
      />
    </div>
  );
}
