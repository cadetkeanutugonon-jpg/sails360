import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Badge, DemoBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState, PageHeader, Section } from "@/components/ui/Section";
import { publishedResources } from "@/data/demo";
import { formatDate } from "@/lib/utilities/cn";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  const items = publishedResources().filter((r) => r.access === "public");
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Resources library"
        description="Public study materials and references. Restricted documents are never listed here."
      />
      <Breadcrumbs items={[{ label: "Resources" }]} />
      <Section>
        {items.length === 0 ? (
          <EmptyState title="No resources yet" message="Approved files will appear here." />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((r) => (
              <li key={r.slug}>
                <Card className="h-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="ocean">{r.category}</Badge>
                    <Badge>{r.fileType}</Badge>
                    {r.isDemo && <DemoBadge />}
                  </div>
                  <h2 className="mt-3 flex items-start gap-2 font-bold text-navy">
                    <FileText className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                    {r.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-soft">{r.description}</p>
                  <p className="mt-2 text-xs text-slate-soft">
                    Added {formatDate(r.uploadedAt)}
                  </p>
                  <p className="mt-3 text-sm font-medium text-slate-soft">
                    Download unavailable: no file is attached to demo entries.
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
