import React from 'react';
import Link from 'next/link';
import { client } from '../../lib/sanity/client';
import { urlFor } from '../../lib/sanity/image';

export const revalidate = 60; // ISR-ish: revalidate every minute

export default async function BlogIndex() {
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    title,
    excerpt,
    "slug": slug.current,
    mainImage
  }`;

  const posts = await client.fetch(query);

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">No hay artículos aún</h2>
        <p className="mt-4 text-gray-600">Crea un post en Sanity Studio y publícalo para que aparezca aquí.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mt-6 text-3xl md:text-4xl font-serif font-bold text-[#8E6E77] text-center mb-6">
        Últimos artículos
      </h1>
      <div className="grid gap-6">
        {posts.map((p: any) => (
          <article key={p.slug} className="bg-white rounded-md p-4 shadow-sm border">
            <div className="flex gap-4 items-start">
              {p.mainImage ? (
                <img src={urlFor(p.mainImage).width(300).height(200).url()} alt={p.title} className="w-44 h-28 object-cover rounded-md" />
              ) : null}
              <div>
                <h3 className="text-lg font-semibold"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
                {p.excerpt ? <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p> : null}
                <div className="mt-3">
                  <Link href={`/blog/${p.slug}`} className="text-lilac-500 underline">Leer artículo →</Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
