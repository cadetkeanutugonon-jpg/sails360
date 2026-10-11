import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Section";
import { footerNav, mainNav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 font-heading text-lg font-bold text-gold">
            {site.slogan}
          </p>
          <p className="mt-1 text-sm text-white/70">{site.commitments}</p>
        </div>
        <nav aria-label="Explore">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gold">
            Explore
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {mainNav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-white/80 hover:text-white">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="More">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gold">
            More
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {footerNav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-white/80 hover:text-white">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-4 text-xs text-white/60">
          {site.disclaimer}
        </Container>
      </div>
    </footer>
  );
}
