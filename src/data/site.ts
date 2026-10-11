export const site = {
  name: "SAILS 360",
  slogan: "One crew. One direction. One standard.",
  commitments: "Listen. Develop. Unite.",
  description:
    "SAILS 360 is a student leadership platform for BSMT students: academic support, leadership, welfare, camaraderie and maritime excellence.",
  /** Not an official institutional website unless authorized. */
  disclaimer:
    "SAILS 360 is a student organization platform. This is not an official institutional website.",
};

export interface NavItem {
  href: string;
  label: string;
}

export const mainNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/sails-360", label: "SAILS 360" },
  { href: "/programs", label: "Programs" },
  { href: "/announcements", label: "Announcements" },
  { href: "/events", label: "Events" },
  { href: "/resources", label: "Resources" },
  { href: "/digital-hub", label: "Digital Hub" },
];

export const footerNav: NavItem[] = [
  { href: "/recognition", label: "Student Recognition" },
  { href: "/maritime-excellence", label: "Maritime Excellence" },
  { href: "/career-connect", label: "Career Connect" },
  { href: "/transparency", label: "Transparency" },
  { href: "/feedback", label: "Feedback & Support" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Notice" },
];
