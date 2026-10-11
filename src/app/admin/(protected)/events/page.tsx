import type { Metadata } from "next";
import { EventsEditor } from "@/components/dashboard/EventsEditor";

export const metadata: Metadata = { title: "Admin events" };

export default function AdminEventsPage() {
  return <EventsEditor />;
}
