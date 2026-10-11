"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, CalendarDays, FolderOpen, Home, LifeBuoy } from "lucide-react";
import { DemoBadge } from "@/components/ui/Badge";
import { cn, formatDate, formatDateTime } from "@/lib/utilities/cn";
import type { Announcement, EventItem, ResourceItem } from "@/types/content";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "news", label: "News", icon: Bell },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "files", label: "Files", icon: FolderOpen },
  { id: "support", label: "Support", icon: LifeBuoy },
] as const;

type TabId = (typeof tabs)[number]["id"];

const tile =
  "flex min-h-11 items-center justify-between rounded-xl border border-line bg-white p-4 text-left shadow-sm";

export function HubApp({
  announcements,
  events,
  resources,
}: {
  announcements: Announcement[];
  events: EventItem[];
  resources: ResourceItem[];
}) {
  const [tab, setTab] = useState<TabId>("home");

  return (
    <div className="mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-none border-line bg-mist [&_.text-slate-soft]:text-[#475569] sm:my-8 sm:rounded-3xl sm:border sm:shadow-xl">
      <div className="bg-navy bg-chart px-5 pb-6 pt-8 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-gold">
          SAILS Digital Hub
        </p>
        <h1 className="mt-1 text-2xl font-extrabold">Everything in one place</h1>
        <p className="mt-1 text-sm text-white/75">
          Announcements, events, files and support for BSMT students.
        </p>
      </div>

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="min-h-[24rem] space-y-3 p-4"
      >
        {tab === "home" && (
          <>
            <h2 className="font-heading font-bold text-navy">Quick links</h2>
            {(
              [
                ["news", "Latest announcements", announcements.length],
                ["events", "Upcoming events", events.length],
                ["files", "Resources", resources.length],
              ] as const
            ).map(([id, label, count]) => (
              <button key={id} type="button" className={tile} onClick={() => setTab(id)}>
                <span className="font-semibold text-navy">{label}</span>
                <span className="text-sm text-slate-soft">{count}</span>
              </button>
            ))}
            <Link href="/programs" className={tile}>
              <span className="font-semibold text-navy">All ten programs</span>
              <span aria-hidden>›</span>
            </Link>
            <Link href="/transparency" className={tile}>
              <span className="font-semibold text-navy">Transparency</span>
              <span aria-hidden>›</span>
            </Link>
          </>
        )}

        {tab === "news" &&
          announcements.map((a) => (
            <Link key={a.slug} href={`/announcements/${a.slug}`} className="block rounded-xl border border-line bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-ocean">{a.category}</span>
                {a.isDemo && <DemoBadge />}
              </div>
              <p className="mt-1 font-semibold text-navy">{a.title}</p>
              <p className="text-xs text-slate-soft">{formatDate(a.publishedAt)}</p>
            </Link>
          ))}

        {tab === "events" &&
          events.map((e) => (
            <Link key={e.slug} href={`/events/${e.slug}`} className="block rounded-xl border border-line bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-ocean">{e.category}</span>
                {e.isDemo && <DemoBadge />}
              </div>
              <p className="mt-1 font-semibold text-navy">{e.title}</p>
              <p className="text-xs text-slate-soft">{formatDateTime(e.startsAt)}</p>
            </Link>
          ))}

        {tab === "files" && (
          <>
            {resources.map((r) => (
              <div key={r.slug} className="rounded-xl border border-line bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-ocean">
                    {r.category} · {r.fileType}
                  </span>
                  {r.isDemo && <DemoBadge />}
                </div>
                <p className="mt-1 font-semibold text-navy">{r.title}</p>
                <p className="text-xs text-slate-soft">No file attached to demo entries.</p>
              </div>
            ))}
            <Link href="/resources" className="block text-center text-sm font-semibold text-ocean">
              Open the full library
            </Link>
          </>
        )}

        {tab === "support" && (
          <>
            <Link href="/feedback" className={tile}>
              <span className="font-semibold text-navy">Feedback and private concerns</span>
              <span aria-hidden>›</span>
            </Link>
            <Link href="/contact" className={tile}>
              <span className="font-semibold text-navy">Contact an officer</span>
              <span aria-hidden>›</span>
            </Link>
            <Link href="/privacy" className={tile}>
              <span className="font-semibold text-navy">Privacy notice</span>
              <span aria-hidden>›</span>
            </Link>
          </>
        )}
      </div>

      <div
        role="tablist"
        aria-label="Digital Hub sections"
        className="sticky bottom-0 grid grid-cols-5 border-t border-line bg-white"
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            onClick={() => setTab(id)}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium",
              tab === id ? "text-ocean" : "text-slate-soft",
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
