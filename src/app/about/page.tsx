import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { principles, site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Who ${site.name} is, who we work with, and how we make decisions.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-sm font-semibold tracking-[0.12em] text-brand-accent uppercase">About</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-primary">
        A local practice for the systems people actually live on
      </h1>
      <div className="prose-content">
        <p>
          {site.name} is the operating entity for this work. The offer is narrow on purpose:
          proactive IT support, security, and remote monitoring for tech-dependent homes and
          individuals in {site.area.city}, {site.area.region}.
        </p>
        <p>
          “Making it all work” is not a slogan we hide behind. It is the job: keep the household and
          personal technology you rely on understandable, maintained, and recoverable — then stay
          around long enough that the next problem is cheaper to solve than the last.
        </p>
        <h2>How decisions get made</h2>
        <p>
          We separate what we know from what we think. Recommendations come with the reason. If
          there is a trade-off — cost versus convenience, convenience versus risk — we name it
          instead of papering it over with a product name.
        </p>
      </div>

      <ul className="mt-10 space-y-5">
        {principles.map((principle) => (
          <li
            key={principle.title}
            className="rounded-[var(--radius-lg)] border border-border-subtle bg-surface-card p-5"
          >
            <h2 className="text-base font-semibold text-text-primary">{principle.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{principle.body}</p>
          </li>
        ))}
      </ul>

      <div className="prose-content">
        <h2>A named human</h2>
        <p>
          Communications come from a person, not an anonymous mailbox. That is a trust choice, not a
          branding exercise: if something is late, scoped wrong, or not our work, you know who is
          accountable.
        </p>
      </div>

      <div className="mt-10">
        <ButtonLink href="/contact/">Get in touch</ButtonLink>
      </div>
    </div>
  );
}
