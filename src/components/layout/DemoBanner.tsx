import { isDemoMode } from "@/lib/config";

/** Shown whenever the site runs without a connected backend. */
export function DemoBanner() {
  if (!isDemoMode()) return null;
  return (
    <div
      role="note"
      className="bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-900"
    >
      Demo mode: sample content is fictional and no backend is connected.
    </div>
  );
}
