import React from 'react';
import { client } from '../../../lib/sanity/client';
// Borramos previewClient y draftMode porque no funcionan en sitios estáticos gratuitos
import { PortableText } from '@portabletext/react';
import portableTextComponents from '../../../components/PortableTextComponents';
import { urlFor } from '../../../lib/sanity/image';
import type { Metadata } from 'next';

// 1. Query optimizada
const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  excerpt,
  publishedAt,
  mainImage,
  body
}`;

// 2. ESTA ES LA CLAVE: Genera las rutas estáticas al momento de "construir"
export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(`*[_type == "post" && defined(slug.current)].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

// 3. Metadatos para SEO (Título y foto en Google/WhatsApp)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(`*[_type=="post" && slug.current==$slug][0]{title, excerpt, mainImage}`, { slug });
  
  return {
    title: post?.title ?? 'Blog Sueño Infantil',
    description: post?.excerpt ?? undefined,
    openGraph: {
      images: post?.mainImage ? [{ url: urlFor(post.mainImage).width(1200).url() }] : undefined,
    },
  } as Metadata;
}

// 4. El componente de la página
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Eliminamos la lógica de "preview". Usamos siempre el cliente normal.
  const { slug } = await params;
  
  const post = await client.fetch(postQuery, { slug });

  // Diseño de "Página no encontrada" un poco más bonito
  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif text-[#8E6E77] mb-4">Post no encontrado</h2>
        <p className="text-gray-600">Lo sentimos, este artículo no está disponible.</p>
        <a href="/blog" className="mt-6 text-[#8E6E77] underline">Volver al Blog</a>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <article className="prose prose-lg mx-auto prose-headings:font-serif prose-headings:text-[#8E6E77] prose-a:text-[#8E6E77]">
        {/* Fecha (Opcional) */}
        {post.publishedAt && (
            <p className="text-sm text-gray-500 mb-4">
                {new Date(post.publishedAt).toLocaleDateString('es-ES', { dateStyle: 'long' })}
            </p>
        )}

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-[#8E6E77] font-serif">
            {post.title}
        </h1>

        {post.mainImage ? (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
             <img 
                src={urlFor(post.mainImage).width(1200).height(600).url()} 
                alt={post.title} 
                className="w-full h-auto object-cover m-0" 
             />
          </div>
        ) : null}

        {/* Aquí se renderiza el contenido, incluyendo tus tarjetas de Amazon */}
        <PortableText value={post.body} components={portableTextComponents as any} />
      </article>
    </main>
  );
}