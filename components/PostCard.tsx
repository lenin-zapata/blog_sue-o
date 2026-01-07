import Link from 'next/link';
import Image from 'next/image';
import { Playfair_Display, Inter } from 'next/font/google';
import { urlFor } from '@/lib/sanity/image';

const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' });
const inter = Inter({ subsets: ['latin'], display: 'swap' });

type Post = {
  _id: string;
  title: string;
  excerpt?: string;
  slug?: { current: string };
  mainImage?: any;
};

export default function PostCard({ post }: { post: Post }) {
  const href = post.slug?.current ? `/blog/${post.slug.current}` : '/blog';
  const hasImage = !!post.mainImage;
  const imageUrl = hasImage ? urlFor(post.mainImage).width(1200).height(800).fit('crop').url() : 'https://picsum.photos/1200/800?random=3';

  return (
    <article className="rounded-t-xl overflow-hidden bg-white shadow-sm">
      {/* Top half: image */}
      <div className="relative w-full h-40 sm:h-48 md:h-52">
        <Image src={imageUrl} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
      </div>

      {/* Bottom half: sage green background */}
      <div className="bg-[#8D6E63] p-4">
        <h3 className={`${playfair.className} text-white text-lg md:text-xl font-semibold`}>{post.title}</h3>
        {post.excerpt ? (
          <p className={`${inter.className} mt-2 text-white/90 text-sm line-clamp-3`}>{post.excerpt}</p>
        ) : null}
        <div className="mt-4">
          <Link href={href} className="font-semibold text-white underline underline-offset-4">Leer Más</Link>
        </div>
      </div>
    </article>
  );
}
