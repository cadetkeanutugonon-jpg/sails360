import type { Announcement, EventItem, ResourceItem } from "@/types/content";

/**
 * DEMONSTRATION CONTENT ONLY.
 * Everything in this file is fictional sample data used to show how the site
 * works. It is not real organization news. Replace it with verified content
 * before publishing (see README, "Replacing demo content").
 */

export const announcements: Announcement[] = [
  {
    slug: "demo-welcome-to-sails-360",
    title: "Welcome to the SAILS 360 site",
    category: "General",
    excerpt: "Sample announcement showing how updates will appear here.",
    body: [
      "This is a demonstration announcement. It shows how real updates from the organization will look once officers publish them.",
      "Real announcements appear only after an authorized editor marks them as published.",
    ],
    publishedAt: "2026-10-11",
    featured: true,
    status: "published",
    isDemo: true,
  },
  {
    slug: "demo-share-your-feedback",
    title: "Share your feedback",
    category: "General",
    excerpt: "Sample announcement about the feedback page.",
    body: [
      "Demonstration content. The feedback page will let students send suggestions and, separately, raise private concerns.",
    ],
    publishedAt: "2026-10-10",
    featured: false,
    status: "published",
    isDemo: true,
  },
  {
    slug: "demo-study-resources",
    title: "Study resources library",
    category: "Academics",
    excerpt: "Sample announcement about the resources library.",
    body: [
      "Demonstration content. Reviewers and study materials will be listed in the resources library once authorized officers upload them.",
    ],
    publishedAt: "2026-10-09",
    featured: false,
    status: "published",
    isDemo: true,
  },
];

export const events: EventItem[] = [
  {
    slug: "demo-orientation-session",
    title: "Sample orientation session",
    category: "Orientation",
    summary: "Demonstration event showing how event details will look.",
    startsAt: "2026-11-05T09:00:00+08:00",
    location: "To be announced",
    status: "published",
    isDemo: true,
  },
  {
    slug: "demo-leadership-workshop",
    title: "Sample leadership workshop",
    category: "Workshop",
    summary: "Demonstration event. Not a confirmed activity.",
    startsAt: "2026-11-19T13:00:00+08:00",
    location: "To be announced",
    status: "published",
    isDemo: true,
  },
  {
    slug: "demo-community-gathering",
    title: "Sample community gathering",
    category: "Community",
    summary: "Demonstration event. Not a confirmed activity.",
    startsAt: "2026-12-03T16:00:00+08:00",
    location: "To be announced",
    status: "published",
    isDemo: true,
  },
];

export const resources: ResourceItem[] = [
  {
    slug: "demo-study-guide-template",
    title: "Sample study guide template",
    category: "Template",
    description: "Demonstration entry. No real file is attached.",
    fileType: "PDF",
    uploadedAt: "2026-10-08",
    access: "public",
    status: "published",
    isDemo: true,
  },
  {
    slug: "demo-maritime-reference-list",
    title: "Sample maritime reference list",
    category: "Reference",
    description: "Demonstration entry. No real file is attached.",
    fileType: "PDF",
    uploadedAt: "2026-10-07",
    access: "public",
    status: "published",
    isDemo: true,
  },
  {
    slug: "demo-reviewer-outline",
    title: "Sample reviewer outline",
    category: "Reviewer",
    description: "Demonstration entry. No real file is attached.",
    fileType: "DOCX",
    uploadedAt: "2026-10-06",
    access: "public",
    status: "published",
    isDemo: true,
  },
];

export const publishedAnnouncements = () =>
  announcements.filter((a) => a.status === "published");
export const publishedEvents = () =>
  events.filter((e) => e.status === "published");
export const publishedResources = () =>
  resources.filter((r) => r.status === "published");
