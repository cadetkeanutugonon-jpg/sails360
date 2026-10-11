"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/Section";
import { announcements as seed } from "@/data/demo";
import { useLocalCollection } from "@/lib/utilities/useLocalCollection";
import type { Announcement, PublicationStatus } from "@/types/content";

const categories: Announcement["category"][] = [
  "General",
  "Academics",
  "Leadership",
  "Welfare",
  "Events",
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

export function AnnouncementsEditor() {
  const { items, save, reset } = useLocalCollection<Announcement>(
    "sails-demo-announcements",
    seed,
  );
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | PublicationStatus>("all");
  const [toDelete, setToDelete] = useState<Announcement | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (a) =>
        (status === "all" || a.status === status) &&
        (!q || a.title.toLowerCase().includes(q)),
    );
  }, [items, query, status]);

  function setItemStatus(slug: string, next: PublicationStatus) {
    save(items.map((a) => (a.slug === slug ? { ...a, status: next } : a)));
    setNotice(`Marked as ${next}.`);
  }

  function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const body = String(form.get("body") ?? "").trim();
    if (title.length < 3) return setError("Title must be at least 3 characters.");
    if (body.length < 10) return setError("Body must be at least 10 characters.");
    const slug = `${slugify(title)}-${Date.now().toString(36)}`;
    const item: Announcement = {
      slug,
      title,
      category: String(form.get("category")) as Announcement["category"],
      excerpt: body.slice(0, 120),
      body: body.split(/\n{2,}/),
      publishedAt: new Date().toISOString().slice(0, 10),
      featured: false,
      status: "draft",
      isDemo: true,
    };
    save([item, ...items]);
    setError("");
    setNotice("Draft created. Publish it when it is ready.");
    e.currentTarget.reset();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-navy">Announcements</h1>
        <Button variant="ghost" onClick={() => { reset(); setNotice("Reset to sample data."); }}>
          Reset demo data
        </Button>
      </div>
      <p className="text-sm text-slate-soft">
        Demo editor: changes stay in this browser and do not appear on the
        public site until the backend is connected.
      </p>

      <Card>
        <h2 className="font-bold text-navy">New announcement</h2>
        <form onSubmit={onCreate} className="mt-4 grid gap-4" noValidate>
          <div>
            <label htmlFor="a-title" className="mb-1 block text-sm font-semibold text-navy">Title</label>
            <input id="a-title" name="title" required className="min-h-11 w-full rounded-lg border border-line px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="a-category" className="mb-1 block text-sm font-semibold text-navy">Category</label>
            <select id="a-category" name="category" className="min-h-11 w-full rounded-lg border border-line bg-white px-3 text-sm">
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="a-body" className="mb-1 block text-sm font-semibold text-navy">Body</label>
            <textarea id="a-body" name="body" rows={4} required className="w-full rounded-lg border border-line px-3 py-2 text-sm" />
          </div>
          {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
          <div><Button type="submit">Save as draft</Button></div>
        </form>
      </Card>

      <div className="grid gap-3 sm:grid-cols-[1fr_12rem]">
        <div>
          <label htmlFor="a-search" className="mb-1 block text-sm font-semibold text-navy">Search</label>
          <input id="a-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} className="min-h-11 w-full rounded-lg border border-line px-3 text-sm" />
        </div>
        <div>
          <label htmlFor="a-status" className="mb-1 block text-sm font-semibold text-navy">Status</label>
          <select id="a-status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="min-h-11 w-full rounded-lg border border-line bg-white px-3 text-sm">
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-5 text-sm text-slate-soft">{notice}</p>

      {visible.length === 0 ? (
        <EmptyState title="No announcements" message="Create one above or change the filters." />
      ) : (
        <ul className="space-y-3">
          {visible.map((a) => (
            <li key={a.slug}>
              <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={a.status === "published" ? "ocean" : "neutral"}>{a.status}</Badge>
                    <Badge>{a.category}</Badge>
                  </div>
                  <p className="mt-1 font-semibold text-navy">{a.title}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {a.status !== "published" && (
                    <Button variant="secondary" onClick={() => setItemStatus(a.slug, "published")}>Publish</Button>
                  )}
                  {a.status === "published" && (
                    <Button variant="ghost" onClick={() => setItemStatus(a.slug, "draft")}>Unpublish</Button>
                  )}
                  {a.status !== "archived" && (
                    <Button variant="ghost" onClick={() => setItemStatus(a.slug, "archived")}>Archive</Button>
                  )}
                  <Button variant="ghost" onClick={() => setToDelete(a)}>Delete</Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete announcement?"
        message={toDelete ? `“${toDelete.title}” will be removed from this demo editor.` : ""}
        confirmLabel="Delete"
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) {
            save(items.filter((a) => a.slug !== toDelete.slug));
            setNotice("Announcement deleted.");
          }
          setToDelete(null);
        }}
      />
    </div>
  );
}
