import type { ReactNode } from "react";
import { cn } from "@/lib/utilities/cn";

type Tone = "neutral" | "gold" | "ocean" | "demo";

const tones: Record<Tone, string> = {
  neutral: "bg-mist text-navy",
  gold: "bg-gold/20 text-navy",
  ocean: "bg-ocean/10 text-ocean",
  demo: "bg-amber-100 text-amber-900 border border-amber-300",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Marks fictional sample content so it is never mistaken for real news. */
export function DemoBadge() {
  return <Badge tone="demo">Demo content</Badge>;
}
