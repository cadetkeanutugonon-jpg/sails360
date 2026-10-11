import { describe, expect, it } from "vitest";
import { submitForm } from "@/lib/actions/submit";
import type { FormState } from "@/lib/validation/forms";

const idle: FormState = { status: "idle" };

function fd(values: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) f.set(k, v);
  return f;
}

describe("submitForm (demo mode, no Supabase env)", () => {
  it("reports field errors for invalid input", async () => {
    const r = await submitForm("contact", idle, fd({ name: "A", email: "bad", message: "x" }));
    expect(r.status).toBe("error");
    expect(r.fieldErrors).toHaveProperty("email");
    expect(r.fieldErrors).toHaveProperty("message");
  });

  it("validates but honestly says nothing was stored", async () => {
    const r = await submitForm(
      "feedback",
      idle,
      fd({ name: "", email: "", message: "Please add more study reviewers." }),
    );
    expect(r.status).toBe("demo");
    expect(r.message).toMatch(/nothing was sent or stored/i);
  });

  it("silently drops honeypot submissions", async () => {
    const r = await submitForm(
      "contact",
      idle,
      fd({ name: "Bot", email: "bot@example.com", message: "buy now", website: "http://spam" }),
    );
    expect(r.status).toBe("success");
    expect(r.fieldErrors).toBeUndefined();
  });

  it("requires consent for private concerns", async () => {
    const r = await submitForm(
      "concern",
      idle,
      fd({ message: "A concern that is long enough.", contact: "" }),
    );
    expect(r.status).toBe("error");
    expect(r.fieldErrors).toHaveProperty("consent");
  });
});
