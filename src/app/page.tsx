import { HomeHero } from "@/components/home-hero";
import { ButtonLink } from "@/components/button-link";
import { audience, principles, services, site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <HomeHero layout="split-field" />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">
            What we look after
          </h2>
          <p className="mt-3 text-text-secondary">
            Three named services. The same judgement on each: say what is in scope, do that work,
            and tell you when something is outside it.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="rounded-[var(--radius-lg)] border border-border-subtle bg-surface-card p-6 shadow-[var(--shadow-soft)]"
            >
              <p className="text-xs font-semibold tracking-[0.08em] text-brand-accent uppercase">
                {service.id === "support"
                  ? "Support"
                  : service.id === "security"
                    ? "Security"
                    : "Monitoring"}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-text-primary">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{service.summary}</p>
              <a
                href={`/services/#${service.id}`}
                className="mt-5 inline-block text-sm font-semibold text-link no-underline hover:text-link-hover"
              >
                Read the detail
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border-subtle bg-surface-card">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">How we work</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title}>
                <h3 className="text-base font-semibold text-text-primary">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-primary">
            {audience.title}
          </h2>
          <p className="mt-3 leading-relaxed text-text-secondary">{audience.body}</p>
          <p className="mt-4 leading-relaxed text-text-secondary">
            If you need a 200-seat helpdesk or a same-hour on-site guarantee across Sydney, we are
            not that firm — and we will say so. If you want the household and personal systems you
            rely on kept in working order, we are.
          </p>
        </div>
        <aside className="rounded-[var(--radius-lg)] border-l-4 border-brand-accent bg-surface-card p-6 shadow-[var(--shadow-soft)]">
          <p className="text-xs font-semibold tracking-[0.08em] text-text-muted uppercase">
            Service area
          </p>
          <p className="mt-2 text-lg font-semibold text-text-primary">{site.area.summary}</p>
          <p className="mt-3 text-sm text-text-secondary">
            Remote work covers the agreed devices wherever they are. On-site work is scheduled for
            the Ryde area when a screen share will not do.
          </p>
          <div className="mt-6">
            <ButtonLink href="/contact/">Get in touch</ButtonLink>
          </div>
        </aside>
      </section>
    </>
  );
}
