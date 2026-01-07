import { createClient } from 'next-sanity';

export const previewClient = createClient({
  // projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  // dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  projectId: 'sdejpl9x',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN, // secreto: debe estar en .env.local y como Secret en Cloudflare
  useCdn: false, // imprescindible para ver borradores
});
