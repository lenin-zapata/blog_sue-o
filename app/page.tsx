import { Playfair_Display } from 'next/font/google';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import { client } from '@/lib/sanity/client';

const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' });

type Post = {
  _id: string;
  title: string;
  excerpt?: string;
  slug?: { current: string };
  mainImage?: any;
};

async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) { _id, title, excerpt, slug, mainImage }`;
  try {
    const data = await client.fetch<Post[]>(query);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();
  const showPosts = posts.length > 0 ? posts : [
    { _id: 'mock-1', title: 'Cómo mejorar las siestas', excerpt: 'Pequeños cambios con gran impacto en el descanso diurno.', slug: { current: '' }, mainImage: null },
    { _id: 'mock-2', title: 'Rutinas nocturnas efectivas', excerpt: 'Pasos simples para noches más tranquilas.', slug: { current: '' }, mainImage: null },
    { _id: 'mock-3', title: 'Ambiente de sueño ideal', excerpt: 'Luz, temperatura y sonidos: guía práctica.', slug: { current: '' }, mainImage: null },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Posts Section */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className={`${playfair.className} text-center text-3xl md:text-4xl font-semibold mb-8`}>Publicaciones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {showPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
