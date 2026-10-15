#!/usr/bin/env node
/**
 * Deploy the production Worker. Accepts either Cloudflare's standard
 * CLOUDFLARE_API_TOKEN or this environment's CF_WORKER_API secret.
 */
import { spawnSync } from "node:child_process";

const token = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_WORKER_API;
if (!token) {
  console.error(
    "Missing Cloudflare token. Set CF_WORKER_API or CLOUDFLARE_API_TOKEN on the Cloud Agent environment, then start a new agent so the secret is injected.",
  );
  process.exit(1);
}

const env = { ...process.env, CLOUDFLARE_API_TOKEN: token };
const result = spawnSync("npx", ["wrangler", "deploy"], {
  stdio: "inherit",
  env,
});
process.exit(result.status ?? 1);
