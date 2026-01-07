import { createClient } from 'next-sanity';
import { previewClient as _previewClient } from './preview';

export function createSanityClient({ usePreview = false } = {}) {
  if (usePreview || process.env.BUILD_PREVIEW === 'true') {
    return _previewClient;
  }

  return createClient({
    // projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    // dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: 'sdejpl9x',
    dataset: 'production',
    apiVersion: '2025-01-01',
    useCdn: true,
  });
}

export const client = createSanityClient();
