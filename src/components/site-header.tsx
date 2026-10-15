"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

type SiteHeaderProps = {
  tone?: "light" | "field";
};

export function SiteHeader({ tone = "light" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onField = tone === "field";

  return (
    <header
      className={
        onField
          ? "sticky top-0 z-20 border-b border-white/15 bg-[var(--logo-field)]"
          : "sticky top-0 z-20 border-b border-border-subtle bg-surface-card/95 backdrop-blur"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <BrandLogo size="header" />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const current = pathname.endsWith("/") ? pathname : `${pathname}/`;
            const active = current === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold no-underline transition-colors ${
                  onField
                    ? active
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:text-white"
                    : active
                      ? "bg-surface-muted text-brand-primary"
                      : "text-text-secondary hover:text-brand-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {onField ? null : <ThemeToggle />}
          <button
            type="button"
            className={
              onField
                ? "inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-white/25 text-white md:hidden"
                : "inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border-subtle text-text-secondary md:hidden"
            }
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <MenuIcon open={open} />
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className={
            onField
              ? "border-t border-white/15 px-5 py-3 md:hidden"
              : "border-t border-border-subtle px-5 py-3 md:hidden"
          }
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  onField
                    ? "rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold text-white no-underline"
                    : "rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold text-text-primary no-underline"
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none">
      {open ? (
        <path
          d="M6 6l12 12M18 6 6 18"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M5 7h14M5 12h14M5 17h14"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
