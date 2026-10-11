import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader, Section } from "@/components/ui/Section";

export interface InfoBlock {
  title: string;
  body: string;
  /** Marks content that still needs verified information. */
  pending?: boolean;
}

/** Reusable landing page: header, breadcrumbs, content blocks, optional actions. */
export function InfoPage({
  eyebrow,
  title,
  description,
  blocks,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  blocks: InfoBlock[];
  actions?: { href: string; label: string }[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <Breadcrumbs items={[{ label: title }]} />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {blocks.map((b) => (
            <Card key={b.title}>
              {b.pending && <Badge tone="demo">To be confirmed</Badge>}
              <h2 className={`font-bold text-navy ${b.pending ? "mt-3" : ""}`}>
                {b.title}
              </h2>
              <p className="mt-2 text-sm text-slate-soft">{b.body}</p>
            </Card>
          ))}
        </div>
        {actions && (
          <div className="mt-8 flex flex-wrap gap-3">
            {actions.map((a, i) => (
              <ButtonLink key={a.href} href={a.href} variant={i === 0 ? "primary" : "ghost"}>
                {a.label}
              </ButtonLink>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
