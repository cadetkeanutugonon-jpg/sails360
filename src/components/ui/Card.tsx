import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utilities/cn";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-white p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function LinkCard({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-xl border border-line bg-white p-6 shadow-sm transition hover:border-ocean hover:shadow-md",
        className,
      )}
    >
      {children}
    </Link>
  );
}
