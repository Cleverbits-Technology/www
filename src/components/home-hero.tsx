import { BrandLogo } from "@/components/brand-logo";
import { ButtonLink } from "@/components/button-link";
import { type LayoutId, site } from "@/data/site";

type HomeHeroProps = {
  layout?: LayoutId;
};

export function HomeHero({ layout = "split-field" }: HomeHeroProps) {
  if (layout === "poster") {
    return (
      <section className="bg-[var(--logo-field)] text-white">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <BrandLogo size="poster" linked={false} />
          <p className="mt-8 text-sm font-semibold tracking-[0.12em] text-[var(--logo-mint)] uppercase">
            {site.area.city}, {site.area.region}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <HeroActions />
          </div>
        </div>
      </section>
    );
  }

  if (layout === "editorial") {
    return (
      <section className="bg-surface-page">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-[minmax(0,18rem)_1fr]">
          <BrandLogo size="hero" linked={false} />
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-brand-accent uppercase">
              {site.area.city}, {site.area.region}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance text-brand-primary sm:text-5xl">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
              {site.description} You work with a named person who already knows the setup — not a
              ticket queue.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact/" variant="accent">
                Start a conversation
              </ButtonLink>
              <ButtonLink href="/services/" variant="ghost">
                See services
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (layout === "field-chrome") {
    return (
      <section className="bg-[var(--logo-field)] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,18rem)_1fr]">
          <BrandLogo size="hero" linked={false} />
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-[var(--logo-mint)] uppercase">
              {site.area.city}, {site.area.region}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              {site.description} You work with a named person who already knows the setup — not a
              ticket queue.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <HeroActions />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--logo-field)] text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,20rem)_1fr]">
        <BrandLogo size="hero" linked={false} />
        <div>
          <p className="text-sm font-semibold tracking-[0.12em] text-[var(--logo-mint)] uppercase">
            {site.area.city}, {site.area.region}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            {site.description} You work with a named person who already knows the setup — not a
            ticket queue.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <HeroActions />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroActions() {
  return (
    <>
      <ButtonLink href="/contact/" variant="accent">
        Start a conversation
      </ButtonLink>
      <ButtonLink href="/services/" variant="inverse">
        See services
      </ButtonLink>
    </>
  );
}
