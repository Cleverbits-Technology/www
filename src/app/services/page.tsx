import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { services, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: `How ${site.name} delivers proactive IT support, security, and remote monitoring.`,
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-sm font-semibold tracking-[0.12em] text-brand-accent uppercase">
        Services
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-primary">
        Support, security, and monitoring — named and scoped
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-text-secondary">
        These are the three things we do. Terms below are used the same way in conversation, quotes,
        and status notes. If a job sits outside this list, we will say so before we start.
      </p>

      <div className="mt-12 space-y-14">
        {services.map((service) => (
          <article key={service.id} id={service.id} className="scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
              {service.title}
            </h2>
            <p className="mt-3 leading-relaxed text-text-secondary">{service.detail}</p>
            <h3 className="mt-6 text-sm font-semibold tracking-[0.06em] text-text-muted uppercase">
              Typically includes
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary">
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <aside className="mt-14 rounded-[var(--radius-lg)] border border-border-subtle bg-surface-card p-6">
        <h2 className="text-lg font-semibold text-text-primary">What this is not</h2>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          We do not sell a 24/7 on-site guarantee, enterprise SOC coverage, or a one-size package
          with a stock phrase attached. Scope is written down. Pricing is visible before work
          begins. If we are not the right fit, that is part of the first conversation — not a
          discovery you make after a retainer starts.
        </p>
        <div className="mt-5">
          <ButtonLink href="/contact/">Ask about your setup</ButtonLink>
        </div>
      </aside>
    </div>
  );
}
