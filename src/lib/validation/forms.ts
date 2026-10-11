import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);
const requiredText = (min: number, max: number, label: string) =>
  z
    .string()
    .trim()
    .min(min, `${label} must be at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

const optionalEmail = z
  .string()
  .trim()
  .max(200)
  .refine((v) => v === "" || z.email().safeParse(v).success, {
    message: "Enter a valid email address or leave it blank.",
  });

export const feedbackSchema = z.object({
  name: text(100),
  email: optionalEmail,
  message: requiredText(10, 2000, "Your message"),
});

export const concernSchema = z.object({
  message: requiredText(10, 4000, "Your concern"),
  contact: text(200),
  consent: z.literal("on", {
    error: "Please confirm you have read how your concern is handled.",
  }),
});

export const contactSchema = z.object({
  name: requiredText(2, 100, "Your name"),
  email: z.email("Enter a valid email address.").max(200),
  message: requiredText(10, 2000, "Your message"),
});

export const nominationSchema = z.object({
  nominee: requiredText(2, 100, "Nominee name"),
  reason: requiredText(20, 2000, "Reason for nomination"),
  yourName: text(100),
});

export const formSchemas = {
  feedback: feedbackSchema,
  concern: concernSchema,
  contact: contactSchema,
  nomination: nominationSchema,
} as const;

export type FormKind = keyof typeof formSchemas;

export interface FormState {
  status: "idle" | "success" | "demo" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}
