#!/usr/bin/env node

// Check published posts via Sanity HTTP API
const fs = require('fs');
const path = require('path');

// Try to load env vars from .env.local if not present
const loadEnv = () => {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) return;
    const k = m[1];
    let v = m[2] || '';
    // Remove quotes
    if (v.startsWith("\"") && v.endsWith('\"')) v = v.slice(1, -1);
    if (v.startsWith("'") && v.endsWith("'")) v = v.slice(1, -1);
    if (!process.env[k]) process.env[k] = v;
  });
};

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local');
  process.exit(1);
}

const groq = encodeURIComponent(`*[_type=="post" && defined(slug.current)] | order(publishedAt desc)[0...50]{title, "slug": slug.current, publishedAt}`);
const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${groq}`;

(async () => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log('Status:', res.status);
    if (json.result) {
      console.log('Posts found:', json.result.length);
      json.result.forEach((p) => console.log('-', p.slug, '—', p.title, '(', p.publishedAt, ')'));
    } else {
      console.log('No result field in response:', JSON.stringify(json, null, 2));
    }
  } catch (err) {
    console.error('Error fetching from Sanity API', err);
    process.exit(1);
  }
})();
