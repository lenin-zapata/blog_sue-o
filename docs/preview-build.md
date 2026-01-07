# Build-time Previews (how it works)

We implemented a build-time preview workflow so that Cloudflare Pages preview builds can include draft content from Sanity.

How it works:
- The build script `npm run build:preview` sets `BUILD_PREVIEW=true` during the build.
- When `BUILD_PREVIEW` is set, our Sanity client uses `previewClient` (with `SANITY_API_TOKEN` and `useCdn: false`) and fetches drafts at build time.
- Cloudflare Pages must have `BUILD_PREVIEW=true` set in its **Preview** environment variables for preview builds.

Security note:
- Only use `BUILD_PREVIEW` in protected preview branches or controlled environments; draft content will be publicly visible once built.
