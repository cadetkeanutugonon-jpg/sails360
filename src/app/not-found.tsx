import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-ocean">404</p>
      <h1 className="mt-2 text-3xl font-extrabold text-navy">
        We could not find that page
      </h1>
      <p className="mt-3 text-slate-soft">
        It may have moved, or it has not been published yet.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/digital-hub" variant="ghost">
          Open the Digital Hub
        </ButtonLink>
      </div>
    </Container>
  );
}
