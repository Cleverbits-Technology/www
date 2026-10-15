# Cleverbits Technology

Public website for **Cleverbits Technology**.

**Making it all work.** Proactive IT support, security, and remote monitoring for tech-dependent homes and individuals in Ryde, NSW.

## Design system

This site consumes the [`business-primary`](https://github.com/andrewkriley/design-system) profile from [andrewkriley/design-system](https://github.com/andrewkriley/design-system) (`v0.1.0`), the slot GUIDELINES.md assigns to a flagship corporate site.

- Pin: [`design-system.lock.json`](design-system.lock.json)
- Tokens are resolved at build time by [`scripts/sync-design-system.mjs`](scripts/sync-design-system.mjs) (same flatten / `{a.b.c}` resolve path as the design-system demo)
- Generated output: `src/generated/design-tokens.css` and `src/generated/design-system.ts`
- Copy follows the profile `purpose`, `values`, `tone`, and `voice` (including `theyAllSoundLike`)

Do not point this site at the `therileys-team` DEMO pattern. That token set is for product UIs, not this brand.

## Logo

The production lockup lives at [`public/brand/logo.png`](public/brand/logo.png). It is a complete square (house, bits, stacked wordmark on `#0e0e68`). Do not typeset the name beside it or recolor the file.

Four homepage treatments are compared at `/layouts`. The live homepage uses **Split on the logo field**.

Contact email and phone live in `src/data/site.ts` — leave them empty until they are confirmed.

## Local development

Requires Node 20.9+ (22 is pinned in `.node-version`).

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run tokens      # resolve business-primary + shared tokens into CSS
npm run typecheck
npm run lint
npm run build
```

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js App Router (static export) |
| UI | React and TypeScript |
| Styling | Tailwind CSS v4 driven by design-system tokens |
| Hosting | Cloudflare Workers Static Assets |

## Cloudflare deploy

The app is a Worker serving the static export in `out/`. Custom domains are declared in `wrangler.jsonc`:

- https://www.cleverbits.com.au
- https://cleverbits.com.au

```bash
npm run deploy
```

Workers Builds (canonical, once this repo is connected in the Cloudflare dashboard):

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Node version | `22` |

`cleverbits.com.au` is already on Cloudflare nameservers. The first deploy creates the Worker custom-domain DNS records for the apex and `www`.

## K3s (local / homelab testing)

Static nginx image + Traefik Ingress, applied to whatever `kubectl` context is current.

```bash
# from a machine that can reach the cluster (node or workstation with kubeconfig)
npm run k3s:deploy
# or:
K3S_HOST=www.cleverbits.home.therileys.team ./scripts/k3s-deploy.sh
```

That builds `www-cleverbits:local`, imports it into k3s containerd when the `k3s` CLI is present, and applies [`deploy/k3s`](deploy/k3s).

Without LAN DNS:

```bash
kubectl -n cleverbits-www port-forward svc/www-cleverbits 8080:80
```

Change the Ingress host by setting `K3S_HOST` or editing `deploy/k3s/ingress.yaml`. Default: `www.cleverbits.home.therileys.team`.
