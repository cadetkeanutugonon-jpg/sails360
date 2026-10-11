export type PillarSlug =
  | "academics"
  | "leadership"
  | "welfare"
  | "camaraderie"
  | "maritime-excellence";

export type PublicationStatus = "draft" | "published" | "archived";

export interface Pillar {
  slug: PillarSlug;
  title: string;
  tagline: string;
  purpose: string;
  benefits: string[];
  howToParticipate: string[];
}

export interface Program {
  slug: string;
  title: string;
  /** Primary pillar. The mapping is a documented assumption (see README). */
  pillar: PillarSlug;
  summary: string;
  purpose: string;
  objectives: string[];
  beneficiaries: string;
  /** Participation requirements are unknown until officers confirm them. */
  participation: string;
  status: "planned" | "active" | "to-be-confirmed";
  isDemo: boolean;
}

export interface Announcement {
  slug: string;
  title: string;
  category: "General" | "Academics" | "Leadership" | "Welfare" | "Events";
  excerpt: string;
  body: string[];
  publishedAt: string;
  featured: boolean;
  status: PublicationStatus;
  isDemo: boolean;
}

export interface EventItem {
  slug: string;
  title: string;
  category: "Workshop" | "Orientation" | "Community" | "Forum";
  summary: string;
  startsAt: string;
  location: string;
  status: PublicationStatus;
  isDemo: boolean;
}

export interface ResourceItem {
  slug: string;
  title: string;
  category: "Reviewer" | "Template" | "Reference" | "Organization";
  description: string;
  fileType: string;
  uploadedAt: string;
  access: "public" | "members";
  status: PublicationStatus;
  isDemo: boolean;
}
