"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { submitForm } from "@/lib/actions/submit";
import type { FormKind, FormState } from "@/lib/validation/forms";
import { cn } from "@/lib/utilities/cn";

export interface FieldConfig {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea" | "checkbox";
  required?: boolean;
  help?: string;
}

const initial: FormState = { status: "idle" };

export function SubmissionForm({
  kind,
  fields,
  submitLabel,
}: {
  kind: FormKind;
  fields: FieldConfig[];
  submitLabel: string;
}) {
  const [state, action, pending] = useActionState(
    submitForm.bind(null, kind),
    initial,
  );

  return (
    <form action={action} noValidate className="space-y-5">
      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {fields.map((f) => {
        const error = state.fieldErrors?.[f.name];
        const id = `${kind}-${f.name}`;
        const describedBy =
          [f.help ? `${id}-help` : "", error ? `${id}-error` : ""]
            .filter(Boolean)
            .join(" ") || undefined;
        const common = {
          id,
          name: f.name,
          required: f.required,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
        };
        return (
          <div key={f.name}>
            {f.type === "checkbox" ? (
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" {...common} className="mt-1 h-5 w-5" />
                <span>{f.label}</span>
              </label>
            ) : (
              <>
                <label htmlFor={id} className="mb-1 block text-sm font-semibold text-navy">
                  {f.label}
                  {!f.required && (
                    <span className="font-normal text-slate-soft"> (optional)</span>
                  )}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    {...common}
                    rows={5}
                    className={cn(
                      "w-full rounded-lg border bg-white px-3 py-2 text-sm",
                      error ? "border-red-600" : "border-line",
                    )}
                  />
                ) : (
                  <input
                    {...common}
                    type={f.type ?? "text"}
                    className={cn(
                      "min-h-11 w-full rounded-lg border bg-white px-3 text-sm",
                      error ? "border-red-600" : "border-line",
                    )}
                  />
                )}
              </>
            )}
            {f.help && (
              <p id={`${id}-help`} className="mt-1 text-xs text-slate-soft">
                {f.help}
              </p>
            )}
            {error && (
              <p id={`${id}-error`} className="mt-1 text-sm font-medium text-red-700">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <Button type="submit" disabled={pending}>
        {pending ? "Checking…" : submitLabel}
      </Button>

      <div role="status" aria-live="polite">
        {state.message && (
          <p
            className={cn(
              "rounded-lg border p-3 text-sm",
              state.status === "error" && "border-red-300 bg-red-50 text-red-800",
              state.status === "demo" && "border-amber-300 bg-amber-50 text-amber-900",
              state.status === "success" && "border-green-300 bg-green-50 text-green-900",
            )}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
