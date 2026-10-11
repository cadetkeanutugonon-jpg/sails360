import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utilities/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-navy hover:bg-[#e0a210]",
  secondary: "bg-ocean text-white hover:bg-[#155a8d]",
  ghost: "text-ocean hover:bg-mist",
  "outline-light": "border border-white/60 text-white hover:bg-white/10",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...props} />
  );
}
