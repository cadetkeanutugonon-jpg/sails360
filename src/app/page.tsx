import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, DemoBadge } from "@/components/ui/Badge";
import { Card, LinkCard } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { pillars } from "@/data/pillars";
import { programs } from "@/data/programs";
import { publishedAnnouncements, publishedEvents } from "@/data/demo";
import { site } from "@/data/site";
import { formatDate, formatDateTime } from "@/lib/utilities/cn";

export default function HomePage() {
  const news = publishedAnnouncements().slice(0, 3);
  const upcoming = publishedEvents().slice(0, 3);
  const featured = programs.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy bg-chart text-white">
        <Compass
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-96 w-96 text-white/5"
          strokeWidth={0.75}
        />
        <Container className="relative py-16 sm:py-24">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">
            BSMT Student Leadership Platform
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
            One crew.
            <br />
            One direction.
            <br />
            <span className="text-gold">One standard.</span>
          </h1>
          <p className="mt-6 text-xl font-semibold text-white/90">
            {site.commitments}
          </p>
          <p className="mt-4 max-w-xl text-white/75">
            SAILS 360 brings academic support, leadership, welfare,
            camaraderie and maritime excellence together for every BSMT
            student.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/programs">Explore Our Programs</ButtonLink>
            <ButtonLink href="/sails-360" variant="outline-light">
              Discover SAILS 360
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Who and how */}
      <Section>
        <SectionHeading
          eyebrow="What SAILS does"
          title="Five pillars. One BSMT community."
          description="SAILS serves BSMT students. You can browse everything without an account and join in through programs, events and feedback."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <LinkCard key={p.slug} href={`/sails-360/${p.slug}`}>
              <h3 className="text-lg font-bold text-navy">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-soft">{p.tagline}</p>
            </LinkCard>
          ))}
        </div>
      </Section>

      {/* Programs */}
      <Section tone="mist">
        <SectionHeading
          eyebrow="Platform programs"
          title="Ten programs, one direction"
          description="Details marked “to be confirmed” will be filled in by officers."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <LinkCard key={p.slug} href={`/programs/${p.slug}`}>
              <h3 className="font-bold text-navy">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-soft">{p.summary}</p>
            </LinkCard>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1 font-semibold text-ocean hover:underline"
          >
            See all ten programs <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Section>

      {/* Announcements + events */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Latest announcements" />
            <ul className="space-y-4">
              {news.map((a) => (
                <li key={a.slug}>
                  <Card>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge tone="ocean">{a.category}</Badge>
                      {a.isDemo && <DemoBadge />}
                    </div>
                    <h3 className="font-bold text-navy">
                      <Link
                        href={`/announcements/${a.slug}`}
                        className="hover:underline"
                      >
                        {a.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-slate-soft">
                      {formatDate(a.publishedAt)}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Upcoming events" />
            <ul className="space-y-4">
              {upcoming.map((e) => (
                <li key={e.slug}>
                  <Card>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge tone="gold">{e.category}</Badge>
                      {e.isDemo && <DemoBadge />}
                    </div>
                    <h3 className="font-bold text-navy">
                      <Link
                        href={`/events/${e.slug}`}
                        className="hover:underline"
                      >
                        {e.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-slate-soft">
                      {formatDateTime(e.startsAt)} · {e.location}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Feedback CTA */}
      <Section tone="navy">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold">Your voice sets our course.</h2>
          <p className="mt-3 text-white/80">
            Share a suggestion, or raise a private concern. They are separate
            on purpose, and we explain who can see each one.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/feedback">Give feedback</ButtonLink>
            <ButtonLink href="/digital-hub" variant="outline-light">
              Open the Digital Hub
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
