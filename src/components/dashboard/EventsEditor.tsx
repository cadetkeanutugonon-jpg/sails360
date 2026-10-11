"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/Section";
import { events as seed } from "@/data/demo";
import { formatDateTime } from "@/lib/utilities/cn";
import { useLocalCollection } from "@/lib/utilities/useLocalCollection";
import type { EventItem, PublicationStatus } from "@/types/content";

const categories: EventItem["category"][] = ["Workshop", "Orientation", "Community", "Forum"];

export function EventsEditor() {
  const { items, save, reset } = useLocalCollection<EventItem>("sails-demo-events", seed);
  const [toDelete, setToDelete] = useState<EventItem | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function setItemStatus(slug: string, next: PublicationStatus) {
    save(items.map((e) => (e.slug === slug ? { ...e, status: next } : e)));
    setNotice(`Marked as ${next}. An event is confirmed only when published.`);
  }

  function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") ?? "").trim();
    const when = String(f.get("startsAt") ?? "");
    if (title.length < 3) return setError("Title must be at least 3 characters.");
    if (!when || Number.isNaN(new Date(when).getTime())) return setError("Choose a valid date and time.");
    const item: EventItem = {
      slug: `event-${Date.now().toString(36)}`,
      title,
      category: String(f.get("category")) as EventItem["category"],
      summary: String(f.get("summary") ?? "").trim() || "Details to be confirmed.",
      startsAt: new Date(when).toISOString(),
      location: String(f.get("location") ?? "").trim() || "To be announced",
      status: "draft",
      isDemo: true,
    };
    save([item, ...items]);
    setError("");
    setNotice("Draft event created. It is not confirmed until you publish it.");
    e.currentTarget.reset();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-navy">Events</h1>
        <Button variant="ghost" onClick={() => { reset(); setNotice("Reset to sample data."); }}>
          Reset demo data
        </Button>
      </div>
      <p className="text-sm text-slate-soft">
        Demo editor: changes stay in this browser and do not appear on the
        public site until the backend is connected.
      </p>

      <Card>
        <h2 className="font-bold text-navy">New event</h2>
        <form onSubmit={onCreate} className="mt-4 grid gap-4 sm:grid-cols-2" noValidate>
          <div className="sm:col-span-2">
            <label htmlFor="e-title" className="mb-1 block text-sm font-semibold text-navy">Title</label>
            <input id="e-title" name="title" required className="min-h-11 w-full rounded-lg border border-line px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="e-when" className="mb-1 block text-sm font-semibold text-navy">Date and time</label>
            <input id="e-when" name="startsAt" type="datetime-local" required className="min-h-11 w-full rounded-lg border border-line px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="e-cat" className="mb-1 block text-sm font-semibold text-navy">Category</label>
            <select id="e-cat" name="category" className="min-h-11 w-full rounded-lg border border-line bg-white px-3 text-sm">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="e-loc" className="mb-1 block text-sm font-semibold text-navy">Location <span className="font-normal text-slate-soft">(optional)</span></label>
            <input id="e-loc" name="location" className="min-h-11 w-full rounded-lg border border-line px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="e-sum" className="mb-1 block text-sm font-semibold text-navy">Summary <span className="font-normal text-slate-soft">(optional)</span></label>
            <input id="e-sum" name="summary" className="min-h-11 w-full rounded-lg border border-line px-3 text-sm" />
          </div>
          {error && <p role="alert" className="text-sm font-medium text-red-700 sm:col-span-2">{error}</p>}
          <div className="sm:col-span-2"><Button type="submit">Save as draft</Button></div>
        </form>
      </Card>

      <p role="status" aria-live="polite" className="min-h-5 text-sm text-slate-soft">{notice}</p>

      {items.length === 0 ? (
        <EmptyState title="No events" message="Create one above." />
      ) : (
        <ul className="space-y-3">
          {items.map((e) => (
            <li key={e.slug}>
              <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={e.status === "published" ? "ocean" : "neutral"}>{e.status}</Badge>
                    <Badge>{e.category}</Badge>
                  </div>
                  <p className="mt-1 font-semibold text-navy">{e.title}</p>
                  <p className="text-xs text-slate-soft">{formatDateTime(e.startsAt)} · {e.location}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {e.status !== "published" && <Button variant="secondary" onClick={() => setItemStatus(e.slug, "published")}>Publish</Button>}
                  {e.status === "published" && <Button variant="ghost" onClick={() => setItemStatus(e.slug, "draft")}>Unpublish</Button>}
                  {e.status !== "archived" && <Button variant="ghost" onClick={() => setItemStatus(e.slug, "archived")}>Archive</Button>}
                  <Button variant="ghost" onClick={() => setToDelete(e)}>Delete</Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete event?"
        message={toDelete ? `“${toDelete.title}” will be removed from this demo editor.` : ""}
        confirmLabel="Delete"
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) {
            save(items.filter((x) => x.slug !== toDelete.slug));
            setNotice("Event deleted.");
          }
          setToDelete(null);
        }}
      />
    </div>
  );
}
