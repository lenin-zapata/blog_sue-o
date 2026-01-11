import { client } from '../../../lib/sanity/client';
// import { PortableText } from '@portabletext/react'; <--- COMENTADO
// import portableTextComponents from '../../../components/PortableTextComponents'; <--- COMENTADO
// import { urlFor } from '../../../lib/sanity/image'; <--- COMENTADO
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)].slug.current`;
  const slugs = await client.fetch(query);
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(`*[_type=="post" && slug.current==$slug][0]{title}`, { slug });
  return { title: post?.title };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Pedimos SOLO el título para probar
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{title}`, { slug });

  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-[#8E6E77] mb-6">{post.title}</h1>
      
      <div className="p-4 bg-yellow-100 text-yellow-800">
        Modo de prueba: Si ves esto, el error estaba en PortableText o Image.
      </div>

      {/* TODO ESTO COMENTADO TEMPORALMENTE PARA QUE NO FALLE
      {post.mainImage && (
        <img src={urlFor(post.mainImage).width(1200).url()} alt={post.title} />
      )}
      <PortableText value={post.body} components={portableTextComponents as any} /> 
      */}
    </main>
  );
}