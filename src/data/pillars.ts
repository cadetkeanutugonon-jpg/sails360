import type { Pillar } from "@/types/content";

export const pillars: Pillar[] = [
  {
    slug: "academics",
    title: "Academics",
    tagline: "Learn together, pass together.",
    purpose:
      "Strengthen the academic life of BSMT students through shared learning support and accessible study resources.",
    benefits: [
      "Easier access to study materials and reviewers",
      "A network of peers who help each other learn",
      "One place to find academic announcements",
    ],
    howToParticipate: [
      "Browse the resources library",
      "Watch announcements for academic activities",
      "Send suggestions through the feedback page",
    ],
  },
  {
    slug: "leadership",
    title: "Leadership",
    tagline: "Lead with responsibility.",
    purpose:
      "Develop student leaders through mentorship, training, and open, accountable student governance.",
    benefits: [
      "Guidance from mentors and senior cadets",
      "Leadership development opportunities",
      "Clear visibility into how plans and projects progress",
    ],
    howToParticipate: [
      "Explore the mentorship and leadership programs",
      "Follow published plans on the transparency page",
      "Join leadership activities when announced",
    ],
  },
  {
    slug: "welfare",
    title: "Welfare",
    tagline: "No student left behind.",
    purpose:
      "Give students a trusted, organized way to raise concerns and find support.",
    benefits: [
      "A private channel for student support concerns",
      "A clear way to share general feedback",
      "Honest expectations about what happens after you submit",
    ],
    howToParticipate: [
      "Use the feedback and student support page",
      "Contact an authorized representative",
    ],
  },
  {
    slug: "camaraderie",
    title: "Camaraderie",
    tagline: "One crew, one BSMT family.",
    purpose:
      "Build unity across year levels and celebrate the people who make the BSMT community strong.",
    benefits: [
      "Community activities that bring students together",
      "Recognition for achievements and good example",
      "A shared sense of belonging",
    ],
    howToParticipate: [
      "Attend community events",
      "Nominate a deserving student",
    ],
  },
  {
    slug: "maritime-excellence",
    title: "Maritime Excellence",
    tagline: "Raise the standard.",
    purpose:
      "Prepare students for the maritime profession through professional development and career preparation.",
    benefits: [
      "Maritime learning resources",
      "Career preparation support",
      "Professional development activities",
    ],
    howToParticipate: [
      "Explore the Maritime Excellence and Career Connect pages",
      "Join workshops when announced",
    ],
  },
];

export const pillarBySlug = (slug: string) =>
  pillars.find((p) => p.slug === slug);
