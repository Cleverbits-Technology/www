import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-surface-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <BrandLogo size="footer" />
          <p className="mt-4 text-sm text-text-secondary">
            {site.tagline} {site.description}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-xs font-semibold tracking-[0.08em] text-text-muted uppercase">
              Pages
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-link no-underline hover:text-link-hover">
                  Home
                </Link>
              </li>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-link no-underline hover:text-link-hover">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-[0.08em] text-text-muted uppercase">
              Service area
            </h2>
            <p className="mt-3 text-sm text-text-secondary">{site.area.summary}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border-subtle">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-text-muted sm:px-8">
          © {new Date().getFullYear()} {site.name}.
        </p>
      </div>
    </footer>
  );
}
