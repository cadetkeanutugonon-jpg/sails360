"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/Section";
import type { Pillar, Program } from "@/types/content";

const statusLabel: Record<Program["status"], string> = {
  active: "Active",
  planned: "Planned",
  "to-be-confirmed": "Details to be confirmed",
};

export function ProgramDirectory({
  programs,
  pillars,
}: {
  programs: Program[];
  pillars: Pillar[];
}) {
  const [query, setQuery] = useState("");
  const [pillar, setPillar] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programs.filter(
      (p) =>
        (pillar === "all" || p.pillar === pillar) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q)),
    );
  }, [programs, query, pillar]);

  return (
    <div>
      <form
        role="search"
        aria-label="Filter programs"
        className="mb-6 grid gap-3 sm:grid-cols-[1fr_16rem]"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor="program-search" className="mb-1 block text-sm font-semibold text-navy">
            Search programs
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-soft"
              aria-hidden
            />
            <input
              id="program-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “mentorship”"
              className="min-h-11 w-full rounded-lg border border-line bg-white py-2 pl-9 pr-3 text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="program-pillar" className="mb-1 block text-sm font-semibold text-navy">
            Pillar
          </label>
          <select
            id="program-pillar"
            value={pillar}
            onChange={(e) => setPillar(e.target.value)}
            className="min-h-11 w-full rounded-lg border border-line bg-white px-3 text-sm"
          >
            <option value="all">All pillars</option>
            {pillars.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </form>

      <p className="mb-4 text-sm text-slate-soft" role="status" aria-live="polite">
        Showing {filtered.length} of {programs.length} programs
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title="No programs match"
          message="Try a different search or choose all pillars."
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <li key={p.slug}>
              <Card className="h-full">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="ocean">
                    {pillars.find((x) => x.slug === p.pillar)?.title}
                  </Badge>
                  <Badge tone="neutral">{statusLabel[p.status]}</Badge>
                </div>
                <h3 className="mt-3 text-lg font-bold text-navy">
                  <Link href={`/programs/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-slate-soft">{p.summary}</p>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
