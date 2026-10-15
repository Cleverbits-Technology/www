import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <p className="text-sm font-semibold tracking-[0.12em] text-brand-accent uppercase">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-primary">
        That page is not here
      </h1>
      <p className="mt-4 text-text-secondary">
        The address may have changed, or it may never have existed. The pages that do:
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/services/" variant="ghost">
          Services
        </ButtonLink>
        <ButtonLink href="/contact/" variant="ghost">
          Contact
        </ButtonLink>
      </div>
    </div>
  );
}
