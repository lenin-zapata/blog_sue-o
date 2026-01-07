Cloudflare Deployment Checklist

1. Create two deploy hooks in Cloudflare Pages: one for production (main) and one for preview (preview branch). Save the URLs.
2. In GitHub, add secrets:
   - CF_DEPLOY_HOOK_URL
   - CF_PREVIEW_DEPLOY_HOOK_URL
   - NEXT_PUBLIC_SANITY_PROJECT_ID
   - NEXT_PUBLIC_SANITY_DATASET
   - SITE_URL (optional, for sitemap)
3. On Cloudflare Pages UI, for the Preview environment of your project, add an env var `BUILD_PREVIEW=true` so that preview builds include drafts.
4. Optional: Configure `SITE_URL` secret to your production URL (e.g., https://your-site.pages.dev) for sitemap generation.
