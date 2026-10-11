import type { Metadata } from "next";
import { AnnouncementsEditor } from "@/components/dashboard/AnnouncementsEditor";

export const metadata: Metadata = { title: "Admin announcements" };

export default function AdminAnnouncementsPage() {
  return <AnnouncementsEditor />;
}
