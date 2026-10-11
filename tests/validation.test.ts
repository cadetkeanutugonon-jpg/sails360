import { describe, expect, it } from "vitest";
import {
  concernSchema,
  contactSchema,
  feedbackSchema,
  nominationSchema,
} from "@/lib/validation/forms";

describe("feedbackSchema", () => {
  it("accepts anonymous feedback with no name or email", () => {
    const r = feedbackSchema.safeParse({
      name: "",
      email: "",
      message: "Please add more reviewers.",
    });
    expect(r.success).toBe(true);
  });

  it("rejects a malformed email and a too-short message", () => {
    const r = feedbackSchema.safeParse({ name: "", email: "nope", message: "short" });
    expect(r.success).toBe(false);
  });
});

describe("concernSchema", () => {
  it("requires the consent checkbox", () => {
    const r = concernSchema.safeParse({
      message: "This is a real concern I want to raise.",
      contact: "",
    });
    expect(r.success).toBe(false);
  });

  it("accepts a concern with consent and no contact details", () => {
    const r = concernSchema.safeParse({
      message: "This is a real concern I want to raise.",
      contact: "",
      consent: "on",
    });
    expect(r.success).toBe(true);
  });
});

describe("contactSchema", () => {
  it("requires a valid email", () => {
    const r = contactSchema.safeParse({
      name: "Ana",
      email: "ana-at-example",
      message: "Hello, I have a question.",
    });
    expect(r.success).toBe(false);
  });
});

describe("nominationSchema", () => {
  it("requires a meaningful reason", () => {
    expect(
      nominationSchema.safeParse({ nominee: "Juan", reason: "good", yourName: "" }).success,
    ).toBe(false);
    expect(
      nominationSchema.safeParse({
        nominee: "Juan",
        reason: "Consistently helps classmates prepare for exams.",
        yourName: "",
      }).success,
    ).toBe(true);
  });
});
