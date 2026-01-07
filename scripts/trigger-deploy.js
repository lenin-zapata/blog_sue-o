#!/usr/bin/env node

// Simple helper to trigger a Cloudflare Pages deploy hook from local env
// Usage: set env CF_DEPLOY_HOOK_URL and run: node scripts/trigger-deploy.js

const url = process.env.CF_DEPLOY_HOOK_URL;

if (!url) {
  console.error('Error: Set CF_DEPLOY_HOOK_URL in your environment');
  process.exit(1);
}

(async () => {
  try {
    const res = await fetch(url, { method: 'POST' });
    if (res.ok) {
      console.log('Deploy hook triggered successfully');
      process.exit(0);
    }
    console.error('Deploy hook returned status', res.status);
    process.exit(2);
  } catch (err) {
    console.error('Error triggering deploy hook', err);
    process.exit(3);
  }
})();
