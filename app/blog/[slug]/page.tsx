import React from 'react';
import { client } from '../../../lib/sanity/client';
import { PortableText } from '@portabletext/react';
import portableTextComponents from '../../../components/PortableTextComponents';
import { urlFor } from '../../../lib/sanity/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// --- ESTA ES LA FUNCIÓN QUE NEXT.JS BUSCA ---
export async function generateStaticParams() {
  // Pedimos a Sanity solo los textos de los slugs (ej: ["mi-post", "otro-post"])
  const query = `*[_type == "post" && defined(slug.current)].slug.current`;
  const slugs = await client.fetch(query);

  // Convertimos esa lista de textos al formato que exige Next.js
  return slugs.map((slug: string) => ({
    slug: slug,
  }));
}
// -------------------------------------------

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(`*[_type=="post" && slug.current==$slug][0]{title, excerpt, mainImage}`, { slug });
  
  return {
    title: post?.title ?? 'Blog Sueño Infantil',
    description: post?.excerpt ?? undefined,
    openGraph: {
      images: post?.mainImage ? [{ url: urlFor(post.mainImage).width(1200).url() }] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt,
    publishedAt,
    mainImage,
    body
  }`;

  const post = await client.fetch(query, { slug });

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <article className="prose prose-lg mx-auto prose-headings:font-serif prose-headings:text-[#8E6E77] prose-a:text-[#8E6E77]">
        {post.publishedAt && (
            <p className="text-sm text-gray-500 mb-4">
                {new Date(post.publishedAt).toLocaleDateString('es-ES', { dateStyle: 'long' })}
            </p>
        )}

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-[#8E6E77] font-serif">
            {post.title}
        </h1>

        {post.mainImage && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
             <img 
                src={urlFor(post.mainImage).width(1200).height(600).url()} 
                alt={post.title} 
                className="w-full h-auto object-cover m-0" 
             />
          </div>
        )}

        <div className="mt-8">
            <PortableText value={post.body} components={portableTextComponents as any} />
        </div>
      </article>
      
      <div className="mt-12 pt-8 border-t border-gray-100">
        <a href="/blog" className="text-[#8E6E77] font-bold hover:underline">
          ← Volver a todos los artículos
        </a>
      </div>
    </main>
  );
}