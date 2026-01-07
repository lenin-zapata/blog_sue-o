#!/usr/bin/env node
// Simple sitemap generator to run after export/build
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local');
  process.exit(1);
}

(async () => {
  try {
    const groq = encodeURIComponent(`*[_type=="post" && defined(slug.current)]{ "slug": slug.current, "publishedAt": publishedAt }`);
    const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${groq}`;
    const res = await fetch(url);
    const json = await res.json();
    const posts = json.result || [];

    const base = process.env.SITE_URL || 'https://your-site.pages.dev';
    const urls = posts.map(p => `${base}/blog/${p.slug}`);
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>`;

    const outDir = path.resolve(process.cwd(), 'out');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
    fs.writeFileSync(path.join(outDir, 'robots.txt'), `Sitemap: ${base}/sitemap.xml\nUser-agent: *\nDisallow:`);
    console.log('Sitemap and robots.txt generated in out/');
  } catch (err) {
    console.error('Error generating sitemap', err);
    process.exit(1);
  }
})();
