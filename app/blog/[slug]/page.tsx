import React from 'react';
import { client } from '../../../lib/sanity/client'; // Ajusta la ruta si tu carpeta lib está más lejos
import { PortableText } from '@portabletext/react';
import portableTextComponents from '../../../components/PortableTextComponents';
import { urlFor } from '../../../lib/sanity/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// =================================================================
// ESTA ES LA FUNCIÓN QUE CLOUDFLARE DICE QUE FALTA (NO LA BORRES)
// =================================================================
export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)].slug.current`;
  const slugs = await client.fetch(query);

  // Si no hay posts, devolvemos un array vacío y no pasa nada
  if (!slugs) return [];

  return slugs.map((slug: string) => ({
    slug: slug,
  }));
}
// =================================================================

// Metadatos para Google/Redes Sociales
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(`*[_type=="post" && slug.current==$slug][0]{title, excerpt, mainImage}`, { slug });
  
  return {
    title: post?.title ?? 'Artículo del Blog',
    description: post?.excerpt ?? undefined,
  };
}

// El contenido de la página del artículo
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
      <article className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold text-[#8E6E77] mb-6">{post.title}</h1>
        
        {post.mainImage && (
          <div className="mb-8 rounded-xl overflow-hidden">
             <img 
                src={urlFor(post.mainImage).width(1200).url()} 
                alt={post.title} 
                className="w-full object-cover" 
             />
          </div>
        )}

        <div className="mt-8">
            <PortableText value={post.body} components={portableTextComponents as any} />
        </div>
      </article>
    </main>
  );
}