import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';

export default function PostCard({ post }: { post: any }) {
  // 1. LA LÍNEA MÁGICA:
  // Verificamos: ¿El slug es un texto? Úsalo. ¿Es un objeto? Saca la parte .current
  const rawSlug = post.slug;
  const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug?.current;

  // Si después de eso sigue siendo null, usamos '#' para que no explote
  const validSlug = slug || '#';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {post.mainImage && (
        <div className="h-56 relative overflow-hidden">
          <img 
            src={urlFor(post.mainImage).width(500).height(300).url()} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-[#8E6E77] mb-3 leading-tight">
          {slug ? (
            <Link href={`/blog/${validSlug}`} className="hover:underline">
              {post.title}
            </Link>
          ) : (
            <span>{post.title}</span>
          )}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {post.excerpt}
        </p>

        {slug ? (
          <Link 
            href={`/blog/${validSlug}`} 
            className="inline-block text-[#8E6E77] font-bold uppercase text-xs tracking-wider border-b-2 border-transparent hover:border-[#8E6E77] transition-all w-fit"
          >
            Leer artículo →
          </Link>
        ) : (
          <span className="text-gray-400 text-xs italic">Próximamente</span>
        )}
      </div>
    </div>
  );
}