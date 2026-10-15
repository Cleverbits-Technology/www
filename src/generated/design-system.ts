/* AUTO-GENERATED from andrewkriley/design-system@v0.1.0 (business-primary). Do not edit. */

export const designSystemSource = {
  kind: "profile",
  repo: "andrewkriley/design-system",
  ref: "v0.1.0",
  url: "https://github.com/andrewkriley/design-system/tree/v0.1.0",
  consumeDoc: "https://github.com/andrewkriley/design-system/blob/v0.1.0/design-system/tooling/CONSUME.md",
  profileId: "business-primary",
} as const;

export const designSystemProfile = {
  id: "business-primary",
  name: "Primary operating entity",
  tagline: "Replace with the registered business name and positioning line.",
  purpose: "The flagship business through which most client-facing work is delivered. Visual and verbal identity should feel slightly more formal than the personal brand while remaining recognisably part of the same family.",
  values: [
  "Reliable delivery",
  "Transparent scope and pricing posture",
  "Long-term relationships over quick wins"
] as const,
  tone: {
  "primary": "Professional, steady, evidence-led",
  "secondary": [
    "Supportive of client decisions",
    "Decisive on recommendations"
  ],
  "avoid": [
    "Aggressive urgency tactics",
    "Over-promising",
    "Anonymous corporate voice"
  ]
},
  voice: {
  "summary": "Write as the organisation: clear mandates, documented reasoning, and language a busy executive can scan. The personal brand’s plainspoken honesty remains; add structure suitable for proposals, SOWs, and official comms.",
  "theyAllSoundLike": "Readers should sense the same judgment and values as Andrew Riley’s personal voice, with organisation-appropriate formality and third-person or “we” as the default.",
  "do": [
    "Define terms once, use them consistently",
    "Separate opinion from fact",
    "Sign communications with a named human when it helps trust"
  ],
  "dont": [
    "Use stock phrases that could apply to any firm",
    "Obscure accountability"
  ]
},
} as const;

export const designSystemPalette = [
  {
    "name": "Primary",
    "token": "brand-primary",
    "path": "color.brand.primary",
    "hex": "#0f2744",
    "darkHex": "#2563eb",
    "usage": "Navy — institutional trust. Hero, header wordmark, primary buttons.",
    "className": "bg-brand-primary"
  },
  {
    "name": "Primary muted",
    "token": "brand-secondary",
    "path": "color.brand.primaryMuted",
    "hex": "#1a4070",
    "darkHex": "#60a5fa",
    "usage": "Hover state for primary actions and link colour.",
    "className": "bg-brand-secondary"
  },
  {
    "name": "Accent",
    "token": "brand-accent",
    "path": "color.brand.accent",
    "hex": "#0d9488",
    "darkHex": "#0d9488",
    "usage": "Teal — progress and clarity. Badges, rules, secondary emphasis.",
    "className": "bg-brand-accent"
  },
  {
    "name": "Accent soft",
    "token": "brand-accent-soft",
    "path": "color.brand.accentSoft",
    "hex": "#5eead4",
    "darkHex": "#5eead4",
    "usage": "Soft teal for chips and highlight surfaces.",
    "className": "bg-brand-accent-soft"
  },
  {
    "name": "Surface",
    "token": "surface-card",
    "path": "color.brand.surface",
    "hex": "#ffffff",
    "darkHex": "#0c0d0f",
    "usage": "Cards and raised panels.",
    "className": "bg-surface-card"
  },
  {
    "name": "Surface alt",
    "token": "surface-page",
    "path": "color.brand.surfaceAlt",
    "hex": "#f1f5f9",
    "darkHex": "#181a1f",
    "usage": "Page canvas and recessed bands.",
    "className": "bg-surface-page"
  }
] as const;
