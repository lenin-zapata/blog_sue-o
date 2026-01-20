import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://amoralcrecer.com'

  // 1. Obtenemos todos los posts de Sanity
  const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current, publishedAt }`)

  // 2. Creamos las URLs de los posts
  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // 3. Devolvemos las URLs fijas + los posts
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...postUrls,
  ]
}