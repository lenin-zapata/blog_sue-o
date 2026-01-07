import React from 'react';
import { client } from '../../../lib/sanity/client';
import { previewClient } from '../../../lib/sanity/preview';
import { draftMode } from 'next/headers';
import { PortableText } from '@portabletext/react';
import portableTextComponents from '../../../components/PortableTextComponents';
import { urlFor } from '../../../lib/sanity/image';
import type { Metadata } from 'next';

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  excerpt,
  publishedAt,
  mainImage,
  body
}`;

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(`*[_type == "post" && defined(slug.current)].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params as any;
  const post = await client.fetch(`*[_type=="post" && slug.current==$slug][0]{title, excerpt, mainImage}`, { slug });
  return {
    title: post?.title ?? 'Blog Sueño Infantil',
    description: post?.excerpt ?? undefined,
    openGraph: {
      images: post?.mainImage ? [{ url: urlFor(post.mainImage).width(1200).url() }] : undefined,
    },
  } as Metadata;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const preview = (await draftMode()).isEnabled;
  const { slug } = await params as any;
  const sanClient = preview ? previewClient : client;

  const post = await sanClient.fetch(postQuery, { slug });

  if (!post) return <div>Página no encontrada</div>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <article className="prose prose-lg mx-auto">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        {post.mainImage ? (
          <img src={urlFor(post.mainImage).width(1200).url()} alt={post.title} className="rounded-md mt-4" />
        ) : null}

        <PortableText value={post.body} components={portableTextComponents as any} />
      </article>
    </main>
  );
}
