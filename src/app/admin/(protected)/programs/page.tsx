import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { pillarBySlug } from "@/data/pillars";
import { programs } from "@/data/programs";

export const metadata: Metadata = { title: "Admin programs" };

export default function AdminProgramsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold text-navy">Programs</h1>
      <p className="text-sm text-slate-soft">
        Read-only for now. Titles are fixed to the official ten. The pillar
        mapping is an assumption pending confirmation.
      </p>
      <div className="overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Platform programs and their pillars</caption>
          <thead className="bg-mist text-navy">
            <tr>
              <th scope="col" className="px-4 py-3">Program</th>
              <th scope="col" className="px-4 py-3">Pillar</th>
              <th scope="col" className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((p) => (
              <tr key={p.slug} className="border-t border-line">
                <td className="px-4 py-3 font-medium text-navy">{p.title}</td>
                <td className="px-4 py-3">{pillarBySlug(p.pillar)?.title}</td>
                <td className="px-4 py-3">
                  <Badge>{p.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
