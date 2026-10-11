import { describe, expect, it } from "vitest";
import { pillars } from "@/data/pillars";
import { programs } from "@/data/programs";
import { announcements, events, resources } from "@/data/demo";
import { footerNav, mainNav } from "@/data/site";

const OFFICIAL_PROGRAMS = [
  "SAILS 360 Student Support",
  "SAILS Academic Network",
  "Cadet Mentorship Program",
  "SAILS Leadership Academy",
  "Maritime Excellence Program",
  "SAILS Career Connect",
  "One BSMT Community",
  "Student Recognition Program",
  "SAILS Digital Hub",
  "SAILS Transparency",
];

describe("official content", () => {
  it("has exactly the five official pillars", () => {
    expect(pillars.map((p) => p.title)).toEqual([
      "Academics",
      "Leadership",
      "Welfare",
      "Camaraderie",
      "Maritime Excellence",
    ]);
  });

  it("has exactly the ten official programs, unrenamed", () => {
    expect(programs.map((p) => p.title).sort()).toEqual([...OFFICIAL_PROGRAMS].sort());
  });

  it("maps every program to a real pillar", () => {
    const slugs = new Set(pillars.map((p) => p.slug));
    for (const p of programs) expect(slugs.has(p.pillar)).toBe(true);
  });

  it("has unique program slugs", () => {
    expect(new Set(programs.map((p) => p.slug)).size).toBe(programs.length);
  });
});

describe("demo content", () => {
  it("marks every sample item as demo", () => {
    for (const item of [...announcements, ...events, ...resources]) {
      expect(item.isDemo).toBe(true);
    }
  });

  it("does not publish demo events with a confirmed location", () => {
    for (const e of events) expect(e.location).toBe("To be announced");
  });
});

describe("navigation", () => {
  it("has no duplicate links", () => {
    const hrefs = [...mainNav, ...footerNav].map((n) => n.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
