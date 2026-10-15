#!/usr/bin/env node
/**
 * Consume andrewkriley/design-system the way CONSUME.md + the demo describe.
 *
 * This site uses the business-primary brand-voice profile: manifest + token
 * file merged with shared.json. Token `{a.b.c}` references are resolved here
 * and emitted as CSS variables / TypeScript metadata.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PIN_PATH = path.join(ROOT, "design-system.lock.json");
const DS_ROOT = path.join(ROOT, "node_modules", "design-system");
const OUT_DIR = path.join(ROOT, "src", "generated");

const SITE_TOKEN_MAP = {
  "brand-primary": "color.brand.primary",
  "brand-secondary": "color.brand.primaryMuted",
  "brand-accent": "color.brand.accent",
  "brand-accent-soft": "color.brand.accentSoft",
  "surface-page": "color.brand.surfaceAlt",
  "surface-card": "color.brand.surface",
  "surface-muted": "color.brand.surfaceAlt",
  "text-primary": "color.semantic.text",
  "text-secondary": "color.semantic.textMuted",
  "text-muted": "color.semantic.textMuted",
  "text-inverse": "color.semantic.onPrimary",
  "text-on-accent": "color.semantic.onAccent",
  "link": "color.semantic.link",
  "link-hover": "color.semantic.linkHover",
  "radius-sm": "radius.sm",
  "radius-md": "radius.md",
  "radius-lg": "radius.lg",
  "radius-full": "radius.full",
  "font-heading": "font.heading",
  "font-body": "font.body",
  "font-size-xs": "font.size.xs",
  "font-size-sm": "font.size.sm",
  "font-size-md": "font.size.md",
  "font-size-lg": "font.size.lg",
  "font-size-xl": "font.size.xl",
  "font-size-2xl": "font.size.2xl",
  "font-size-3xl": "font.size.3xl",
  "space-xs": "space.xs",
  "space-sm": "space.sm",
  "space-md": "space.md",
  "space-lg": "space.lg",
  "space-xl": "space.xl",
  "space-2xl": "space.2xl",
};

const PALETTE = [
  {
    name: "Primary",
    path: "color.brand.primary",
    token: "brand-primary",
    className: "bg-brand-primary",
    usage: "Navy — institutional trust. Hero, header wordmark, primary buttons.",
  },
  {
    name: "Primary muted",
    path: "color.brand.primaryMuted",
    token: "brand-secondary",
    className: "bg-brand-secondary",
    usage: "Hover state for primary actions and link colour.",
  },
  {
    name: "Accent",
    path: "color.brand.accent",
    token: "brand-accent",
    className: "bg-brand-accent",
    usage: "Teal — progress and clarity. Badges, rules, secondary emphasis.",
  },
  {
    name: "Accent soft",
    path: "color.brand.accentSoft",
    token: "brand-accent-soft",
    className: "bg-brand-accent-soft",
    usage: "Soft teal for chips and highlight surfaces.",
  },
  {
    name: "Surface",
    path: "color.brand.surface",
    token: "surface-card",
    className: "bg-surface-card",
    usage: "Cards and raised panels.",
  },
  {
    name: "Surface alt",
    path: "color.brand.surfaceAlt",
    token: "surface-page",
    className: "bg-surface-page",
    usage: "Page canvas and recessed bands.",
  },
];

function readJson(absPath) {
  return JSON.parse(fs.readFileSync(absPath, "utf8"));
}

function dsPath(repoRelative) {
  return path.join(DS_ROOT, repoRelative);
}

function flattenTokens(tree, prefix = "", out = {}) {
  for (const key of Object.keys(tree)) {
    if (key.startsWith("$")) continue;
    const node = tree[key];
    const tokenPath = prefix ? `${prefix}.${key}` : key;
    if (node && typeof node === "object" && !Array.isArray(node) && "value" in node) {
      out[tokenPath] = { ...node, path: tokenPath };
    } else if (node && typeof node === "object" && !Array.isArray(node)) {
      flattenTokens(node, tokenPath, out);
    }
  }
  return out;
}

function resolveOne(flat, tokenPath, seen) {
  const node = flat[tokenPath];
  if (!node) throw new Error(`Unknown token reference: ${tokenPath}`);
  if (node.resolvedValue !== undefined) return node.resolvedValue;
  if (seen.has(tokenPath)) {
    throw new Error(`Cyclic token reference at ${tokenPath}`);
  }
  seen.add(tokenPath);
  const match = typeof node.value === "string" && node.value.match(/^\{([\w.]+)\}$/);
  if (!match) {
    node.resolvedValue = node.value;
    return node.value;
  }
  const resolved = resolveOne(flat, match[1], seen);
  node.resolvedValue = resolved;
  node.refPath = match[1];
  return resolved;
}

function resolveAllTokens(flat) {
  for (const tokenPath of Object.keys(flat)) {
    resolveOne(flat, tokenPath, new Set());
  }
  return flat;
}

function deepMerge(a, b) {
  const out = { ...a };
  for (const key of Object.keys(b)) {
    if (
      b[key] &&
      typeof b[key] === "object" &&
      !("value" in b[key]) &&
      a[key] &&
      typeof a[key] === "object"
    ) {
      out[key] = deepMerge(a[key], b[key]);
    } else {
      out[key] = b[key];
    }
  }
  return out;
}

function cssValue(value) {
  return typeof value === "number" ? `${value}px` : value;
}

function tokenValue(flat, tokenPath, mode = "light") {
  const darkPath = `dark.${tokenPath}`;
  const node = mode === "dark" && flat[darkPath] ? flat[darkPath] : flat[tokenPath];
  if (!node) throw new Error(`Missing token ${tokenPath}`);
  return cssValue(node.resolvedValue);
}

function jsString(value) {
  return JSON.stringify(value);
}

function cssDecl(name, value, indent = "  ") {
  const property = name === "color-scheme" ? name : `--${name}`;
  return `${indent}${property}: ${value};`;
}

function cssBlock(selector, vars) {
  const body = vars.map(([name, value]) => cssDecl(name, value)).join("\n");
  return `${selector} {\n${body}\n}`;
}

function siteVars(flat, mode) {
  const mapped = Object.entries(SITE_TOKEN_MAP).map(([name, tokenPath]) => [
    name,
    tokenValue(flat, tokenPath, mode),
  ]);

  // business-primary dark tokens flip surface/surfaceAlt onto the shared
  // neutral ramp. Keep the canvas darker than raised cards in both modes.
  if (mode === "dark") {
    const setVar = (name, value) => {
      const index = mapped.findIndex(([key]) => key === name);
      if (index >= 0) mapped[index][1] = value;
    };
    setVar("surface-page", tokenValue(flat, "color.brand.surface", "dark"));
    setVar("surface-card", tokenValue(flat, "color.brand.surfaceAlt", "dark"));
    setVar("surface-muted", tokenValue(flat, "color.brand.surfaceAlt", "dark"));
  }

  const accent = tokenValue(flat, "color.brand.accent", mode);
  const primary = tokenValue(flat, "color.brand.primary", mode);
  mapped.push(["brand-accent-soft-fill", `color-mix(in srgb, ${accent} 16%, transparent)`]);
  mapped.push(["border-subtle", `color-mix(in srgb, ${primary} 12%, transparent)`]);
  mapped.push([
    "shadow-soft",
    mode === "dark" ? "0 12px 32px rgb(0 0 0 / 0.35)" : "0 12px 32px rgb(15 39 68 / 0.08)",
  ]);
  mapped.push(["color-scheme", mode]);
  return mapped;
}

function indentBlock(text, spaces = 2) {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => (line ? pad + line : line))
    .join("\n");
}

function writeGeneratedCss(pin, flat) {
  const header = `/* AUTO-GENERATED from ${pin.repo}@${pin.ref} (${pin.profileId} profile). Do not edit. */`;
  const light = siteVars(flat, "light");
  const dark = siteVars(flat, "dark");

  return `${header}

${cssBlock(":root", light)}

@media (prefers-color-scheme: dark) {
${indentBlock(cssBlock(':root:not([data-theme="light"])', dark))}
}

${cssBlock('html[data-theme="light"]', light)}

${cssBlock('html[data-theme="dark"]', dark)}
`;
}

function writeGeneratedTs(pin, manifest, flat) {
  const swatches = PALETTE.map((swatch) => ({
    name: swatch.name,
    token: swatch.token,
    path: swatch.path,
    hex: tokenValue(flat, swatch.path, "light"),
    darkHex: tokenValue(flat, swatch.path, "dark"),
    usage: swatch.usage,
    className: swatch.className,
  }));

  return `/* AUTO-GENERATED from ${pin.repo}@${pin.ref} (${pin.profileId}). Do not edit. */

export const designSystemSource = {
  kind: "profile",
  repo: ${jsString(pin.repo)},
  ref: ${jsString(pin.ref)},
  url: ${jsString(pin.url)},
  consumeDoc: ${jsString(`https://github.com/${pin.repo}/blob/${pin.ref}/design-system/tooling/CONSUME.md`)},
  profileId: ${jsString(pin.profileId)},
} as const;

export const designSystemProfile = {
  id: ${jsString(manifest.id)},
  name: ${jsString(manifest.name)},
  tagline: ${jsString(manifest.tagline)},
  purpose: ${jsString(manifest.purpose)},
  values: ${JSON.stringify(manifest.values, null, 2)} as const,
  tone: ${JSON.stringify(manifest.tone, null, 2)},
  voice: ${JSON.stringify(manifest.voice, null, 2)},
} as const;

export const designSystemPalette = ${JSON.stringify(swatches, null, 2)} as const;
`;
}

function main() {
  if (!fs.existsSync(DS_ROOT)) {
    throw new Error(
      "Missing node_modules/design-system. Run npm install so the pinned github:andrewkriley/design-system dependency is present.",
    );
  }

  const pin = readJson(PIN_PATH);
  if (pin.kind !== "profile" || !pin.profileId) {
    throw new Error("design-system.lock.json must set kind=profile and profileId.");
  }

  const manifestIndex = readJson(dsPath("design-system/manifests/index.json"));
  const tokenIndex = readJson(dsPath("design-system/tokens/index.json"));
  const sharedTokens = readJson(dsPath(tokenIndex.shared));

  const manifestPath = manifestIndex.profiles.find((entry) =>
    entry.endsWith(`/${pin.profileId}.json`),
  );
  if (!manifestPath) {
    throw new Error(`Profile ${pin.profileId} is not listed in manifests/index.json`);
  }

  const manifest = readJson(dsPath(manifestPath));
  const setPath = tokenIndex.sets[manifest.tokenSetId];
  if (!setPath) {
    throw new Error(`No token set for tokenSetId ${manifest.tokenSetId}`);
  }

  const profileTokens = readJson(dsPath(setPath));
  const merged = deepMerge(sharedTokens, profileTokens);
  const flat = resolveAllTokens(flattenTokens(merged));

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const cssPath = path.join(OUT_DIR, "design-tokens.css");
  const tsPath = path.join(OUT_DIR, "design-system.ts");
  fs.writeFileSync(cssPath, writeGeneratedCss(pin, flat));
  fs.writeFileSync(tsPath, writeGeneratedTs(pin, manifest, flat));

  console.log(`Wrote ${path.relative(ROOT, cssPath)}`);
  console.log(`Wrote ${path.relative(ROOT, tsPath)}`);
  console.log(`Pinned ${pin.repo}@${pin.ref} profile=${pin.profileId}`);
}

main();
