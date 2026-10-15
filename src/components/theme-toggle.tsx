"use client";

import { useEffect, useSyncExternalStore } from "react";

type ThemePreference = "light" | "dark";

const storageKey = "theme-preference";
const themeChangeEvent = "theme-preference-change";

function getThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(storageKey);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  window.addEventListener("storage", callback);
  window.addEventListener(themeChangeEvent, callback);
  mediaQuery.addEventListener("change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeChangeEvent, callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function applyTheme(theme: ThemePreference) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<ThemePreference>(
    subscribe,
    getThemePreference,
    () => "light",
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function handleToggle() {
    const updatedTheme = theme === "dark" ? "light" : "dark";

    window.localStorage.setItem(storageKey, updatedTheme);
    applyTheme(updatedTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border-subtle text-text-secondary transition-colors hover:border-brand-accent hover:text-brand-primary"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.2 6.2 4.8 4.8M19.2 19.2l-1.4-1.4M6.2 17.8 4.8 19.2M19.2 4.8l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none">
      <path
        d="M16.5 13.2A6.2 6.2 0 0 1 10.8 7.5 6 6 0 1 0 16.5 13.2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
