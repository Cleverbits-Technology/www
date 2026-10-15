import type { Metadata } from "next";

import { BrandLogo } from "@/components/brand-logo";
import { HomeHero } from "@/components/home-hero";
import { layoutOptions, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Logo layouts",
  description: `Compare homepage treatments of the ${site.name} lockup.`,
  robots: { index: false, follow: false },
};

export default function LayoutsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <p className="text-sm font-semibold tracking-[0.12em] text-brand-accent uppercase">
        Working notes
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-primary">
        Four ways to place the lockup
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
        The uploaded file is a complete square: house, bits, and stacked wordmark on its own navy
        field ({site.brand.field}). It should not sit beside extra typeset “Cleverbits”, and it
        should not be dropped onto the design-system navy ({`#0f2744`}) — the two blues do not
        match, so the square would read as a clash box.
      </p>
      <p className="mt-4 max-w-2xl text-text-secondary">
        The live homepage uses <strong>Split on the logo field</strong>. Say which of these you want
        as the default and we will lock it. A house-only mark (no stacked type) would also help the
        header — at 56–64px the wordmark inside this PNG is close to its limit.
      </p>

      <div className="mt-12 space-y-16">
        {layoutOptions.map((option) => (
          <article key={option.id} id={option.id} className="scroll-mt-24">
            <div className="mb-4 flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
                {option.name}
              </h2>
              {option.recommended ? (
                <span className="rounded-[var(--radius-full)] bg-brand-accent px-2.5 py-0.5 text-xs font-semibold text-text-on-accent">
                  On the homepage now
                </span>
              ) : null}
            </div>
            <p className="max-w-3xl text-text-secondary">{option.summary}</p>
            <p className="mt-2 max-w-3xl text-sm text-text-muted">{option.useWhen}</p>
            <div className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface-card shadow-[var(--shadow-soft)]">
              <MockChrome tone={option.id === "field-chrome" ? "field" : "light"} />
              <HomeHero layout={option.id} />
              <div className="border-t border-border-subtle bg-surface-page px-5 py-6 text-sm text-text-muted">
                Services, principles, and the rest of the page stay the same below the fold.
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function MockChrome({ tone }: { tone: "light" | "field" }) {
  const onField = tone === "field";
  return (
    <div
      className={
        onField
          ? "flex items-center justify-between gap-4 border-b border-white/15 bg-[var(--logo-field)] px-5 py-3"
          : "flex items-center justify-between gap-4 border-b border-border-subtle bg-surface-card px-5 py-3"
      }
      aria-hidden="true"
    >
      <BrandLogo size="header" linked={false} />
      <div className="hidden gap-4 text-sm font-semibold sm:flex">
        {site.nav.map((item) => (
          <span key={item.href} className={onField ? "text-white/80" : "text-text-secondary"}>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
