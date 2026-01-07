export function articleJsonLd({
  headline,
  description,
  image,
  datePublished,
  authorName,
  url,
}: {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  authorName?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image ? [image] : undefined,
    datePublished,
    author: authorName ? { '@type': 'Person', name: authorName } : undefined,
    mainEntityOfPage: url ? { '@type': 'WebPage', '@id': url } : undefined,
  };
}
