import type { ReactNode } from "react";
import { cn } from "@/lib/utilities/cn";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  tone = "white",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "white" | "mist" | "navy";
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 sm:py-16",
        // Secondary text (#64748B) is 4.09:1 on mist, below AA. Darken it here only.
        tone === "mist" && "bg-mist [&_.text-slate-soft]:text-[#475569]",
        tone === "navy" && "bg-navy bg-chart text-white",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow && (
        <p
          className={cn(
            "mb-2 text-xs font-bold uppercase tracking-widest",
            light ? "text-gold" : "text-ocean",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-2xl font-bold sm:text-3xl",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-3", light ? "text-white/80" : "text-slate-soft")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <div className="bg-navy bg-chart text-white">
      <Container className="py-12 sm:py-16">
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-white/80">{description}</p>
        )}
      </Container>
    </div>
  );
}

export function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-white p-8 text-center">
      <p className="font-heading text-lg font-bold text-navy">{title}</p>
      <p className="mt-1 text-sm text-slate-soft">{message}</p>
    </div>
  );
}
