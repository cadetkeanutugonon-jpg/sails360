import type { Program } from "@/types/content";

const TBC =
  "Participation requirements have not been confirmed yet. Contact the organization for details.";

/**
 * The ten official platform programs. Titles come from the SAILS campaign
 * presentation and must not be renamed. The pillar assignment is an
 * assumption made for site structure, documented in the README.
 * Descriptive text is general; officers should replace it with verified details.
 */
export const programs: Program[] = [
  {
    slug: "sails-360-student-support",
    title: "SAILS 360 Student Support",
    pillar: "welfare",
    summary: "A trusted channel for student concerns and support.",
    purpose:
      "Give BSMT students an organized way to raise concerns and get help.",
    objectives: [
      "Provide a clear process for submitting concerns",
      "Keep sensitive submissions private",
      "Tell students what to expect after submitting",
    ],
    beneficiaries: "All BSMT students",
    participation: TBC,
    status: "to-be-confirmed",
    isDemo: false,
  },
  {
    slug: "sails-academic-network",
    title: "SAILS Academic Network",
    pillar: "academics",
    summary: "Peer-to-peer academic support across year levels.",
    purpose: "Connect students so academic knowledge is shared, not siloed.",
    objectives: [
      "Share reviewers and study materials",
      "Connect students who can help each other",
    ],
    beneficiaries: "All BSMT students",
    participation: TBC,
    status: "to-be-confirmed",
    isDemo: false,
  },
  {
    slug: "cadet-mentorship-program",
    title: "Cadet Mentorship Program",
    pillar: "leadership",
    summary: "Guidance from experienced cadets for those who follow.",
    purpose: "Pair students with mentors for guidance and example.",
    objectives: [
      "Support new and struggling students",
      "Build a culture of looking after one another",
    ],
    beneficiaries: "Students seeking mentors and cadets willing to mentor",
    participation: TBC,
    status: "to-be-confirmed",
    isDemo: false,
  },
  {
    slug: "sails-leadership-academy",
    title: "SAILS Leadership Academy",
    pillar: "leadership",
    summary: "Training that develops responsible student leaders.",
    purpose: "Develop leadership skills and character among BSMT students.",
    objectives: [
      "Offer leadership training activities",
      "Prepare the next generation of student leaders",
    ],
    beneficiaries: "Students interested in leadership",
    participation: TBC,
    status: "to-be-confirmed",
    isDemo: false,
  },
  {
    slug: "maritime-excellence-program",
    title: "Maritime Excellence Program",
    pillar: "maritime-excellence",
    summary: "Professional development toward the maritime standard.",
    purpose: "Help students grow toward excellence in the maritime profession.",
    objectives: [
      "Connect learning with professional standards",
      "Provide maritime learning resources",
    ],
    beneficiaries: "All BSMT students",
    participation: TBC,
    status: "to-be-confirmed",
    isDemo: false,
  },
  {
    slug: "sails-career-connect",
    title: "SAILS Career Connect",
    pillar: "maritime-excellence",
    summary: "Career preparation for life after the classroom.",
    purpose: "Prepare students for careers in the maritime industry.",
    objectives: [
      "Share resume and interview resources",
      "Share maritime industry information",
    ],
    beneficiaries: "Upper-level students and graduating cadets",
    participation: TBC,
    status: "to-be-confirmed",
    isDemo: false,
  },
  {
    slug: "one-bsmt-community",
    title: "One BSMT Community",
    pillar: "camaraderie",
    summary: "Unity across every year level.",
    purpose: "Bring BSMT students together as one community.",
    objectives: [
      "Organize community activities",
      "Strengthen belonging across year levels",
    ],
    beneficiaries: "All BSMT students",
    participation: TBC,
    status: "to-be-confirmed",
    isDemo: false,
  },
  {
    slug: "student-recognition-program",
    title: "Student Recognition Program",
    pillar: "camaraderie",
    summary: "Recognizing achievement and good example.",
    purpose: "Recognize students who excel and set a good example.",
    objectives: [
      "Accept nominations from the community",
      "Publish recognition only after authorized review",
    ],
    beneficiaries: "All BSMT students",
    participation: TBC,
    status: "to-be-confirmed",
    isDemo: false,
  },
  {
    slug: "sails-digital-hub",
    title: "SAILS Digital Hub",
    pillar: "academics",
    summary: "One place for announcements, resources and services.",
    purpose: "Put organization information and resources in one easy portal.",
    objectives: [
      "Centralize announcements, events and resources",
      "Make student services easy to find on a phone",
    ],
    beneficiaries: "All BSMT students",
    participation: TBC,
    status: "active",
    isDemo: false,
  },
  {
    slug: "sails-transparency",
    title: "SAILS Transparency",
    pillar: "leadership",
    summary: "Open, accountable student governance.",
    purpose:
      "Show students what the organization plans, does and accomplishes.",
    objectives: [
      "Publish approved plans and reports",
      "Share project status openly",
    ],
    beneficiaries: "All BSMT students",
    participation: TBC,
    status: "to-be-confirmed",
    isDemo: false,
  },
];

export const programBySlug = (slug: string) =>
  programs.find((p) => p.slug === slug);

export const programsForPillar = (pillar: string) =>
  programs.filter((p) => p.pillar === pillar);
