export const site = {
  name: "Cleverbits Technology",
  shortName: "Cleverbits",
  tagline: "Making it all work.",
  description:
    "Proactive IT support, security, and remote monitoring for tech-dependent homes and individuals in Ryde, NSW.",
  url: "https://www.cleverbits.com.au",
  locale: "en-AU",
  area: {
    city: "Ryde",
    region: "NSW",
    country: "Australia",
    summary: "Ryde, NSW and nearby northern suburbs.",
  },
  contact: {
    email: "",
    phone: "",
    note: "Email and phone will be added here once they are confirmed. Until then, use the contact form — it opens your email app with the details filled in.",
  },
  brand: {
    useUploadedLogo: true,
    logoSrc: "/brand/logo.png",
    logomarkSrc: "/brand/logo.png",
    /**
     * Field colour sampled from the production lockup (not a design-system
     * token). Use only when the square plate should dissolve into a matching
     * band — do not recolor the PNG itself.
     */
    field: "#0e0e68",
    mint: "#00eeba",
  },
  nav: [
    { href: "/services/", label: "Services" },
    { href: "/about/", label: "About" },
    { href: "/contact/", label: "Contact" },
  ],
} as const;

export const services = [
  {
    id: "support",
    title: "Proactive IT support",
    summary:
      "We look after the computers, phones, and network a household actually uses — and we try to catch problems before they interrupt the day.",
    detail:
      "Support here means a named person who already knows your setup. We document what you have, agree what is in scope, and handle the routine work: updates, backups, new devices, and the odd thing that just stops behaving. When something does break, we start from context rather than a blank ticket.",
    includes: [
      "Device and home-network setup that matches how you actually work",
      "Agreed maintenance windows instead of surprise after-hours calls",
      "A written picture of the household kit we are responsible for",
    ],
  },
  {
    id: "security",
    title: "Security",
    summary:
      "Practical protection for the accounts, backups, and devices that hold your life — explained in plain language, including what we will not do.",
    detail:
      "We reduce the obvious ways a home gets compromised: weak account recovery, reused passwords, unpatched devices, and backups that have never been tested. We will tell you what is worth doing now, what can wait, and where a specialist (or a different product) is the honest answer.",
    includes: [
      "Account hardening and password-manager setup",
      "Backup checks you can actually restore from",
      "A short written risk note after we have seen the environment",
    ],
  },
  {
    id: "monitoring",
    title: "Remote monitoring",
    summary:
      "Continuous visibility of the kit that matters. When something drifts, we already have context — we do not wait for you to notice first.",
    detail:
      "Remote monitoring means we watch health signals on the devices and network you ask us to cover: disk space, failed updates, offline backups, unusual login patterns we can see. It is not a promise that nothing will ever fail. It is a promise that we will see the early signs and tell you what we are doing about them.",
    includes: [
      "Coverage limited to the devices we have agreed in writing",
      "Alerts that come to us first, with a human follow-up when it matters",
      "A regular status note so you are not left guessing",
    ],
  },
] as const;

export const principles = [
  {
    title: "Reliable delivery",
    body: "We say what we will do, then do it. If a date or a scope needs to move, you hear it from us before you have to ask.",
  },
  {
    title: "Transparent scope and pricing",
    body: "You see the work and the cost before we start. No surprise line items, and no vague “it depends” where a range would do.",
  },
  {
    title: "Long-term relationships",
    body: "We would rather know your setup than treat every call as a one-off. Continuity is the product — not a stack of disconnected jobs.",
  },
] as const;

export const audience = {
  title: "Who this is for",
  body: "Tech-dependent homes and individuals around Ryde — people whose work, family, and daily life run on technology, and who want it looked after without a helpdesk runaround.",
};

export const layoutOptions = [
  {
    id: "split-field",
    name: "Split on the logo field",
    recommended: true,
    summary:
      "Light header with the square plate as a badge. Hero uses the lockup’s own navy so a large mark can sit beside the tagline without a colour-clash box.",
    useWhen: "Default corporate homepage. The mark stays a mark; the words do the selling.",
  },
  {
    id: "field-chrome",
    name: "Continuous navy chrome",
    recommended: false,
    summary:
      "Header and hero share the lockup field colour. The square edge disappears and the house + wordmark read as type on a field.",
    useWhen: "If you want the first screen to feel like the logo file, not a brochure laid on top of it.",
  },
  {
    id: "poster",
    name: "Centered poster",
    recommended: false,
    summary:
      "Light header. Full-width navy hero with the lockup centred and the tagline underneath.",
    useWhen: "A launch or campaign beat. Strong, a bit ceremonial — less efficient for scanning services.",
  },
  {
    id: "editorial",
    name: "Editorial plate",
    recommended: false,
    summary:
      "Everything stays on the slate canvas. The square lockup sits as an object on the left; copy on the right.",
    useWhen: "If you want the navy reserved for the mark only, and the page to stay closer to the design-system surfaces.",
  },
] as const;

export type LayoutId = (typeof layoutOptions)[number]["id"];
