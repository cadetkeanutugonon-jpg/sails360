import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Section";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-white">
      <Container>
        <ol className="flex flex-wrap items-center gap-1 py-3 text-sm text-slate-soft">
          <li>
            <Link href="/" className="hover:text-ocean hover:underline">
              Home
            </Link>
          </li>
          {items.map((c, i) => (
            <li key={c.label} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              {c.href && i < items.length - 1 ? (
                <Link href={c.href} className="hover:text-ocean hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-navy">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
