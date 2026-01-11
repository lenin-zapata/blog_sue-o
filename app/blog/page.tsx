import { client } from "@/lib/sanity/client";
import PostCard from "@/components/PostCard";
import Hero from "@/components/Hero";

// Esta función busca TODOS los posts
async function getData() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current, // <--- Esto es clave para que el link funcione
    mainImage,
    excerpt,
    publishedAt
  }`;
  
  return await client.fetch(query);
}

export default async function BlogPage() {
  const posts = await getData();

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Título */}
      <div className="mt-8 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#8E6E77]">
          Últimos artículos
        </h1>
      </div>

      {/* Lista de Posts */}
      {posts && posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        // Este es el mensaje que veías antes
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-bold text-gray-600">No se encontraron artículos</h3>
          <p className="text-gray-500 mt-2">
            Verifica que tus posts en Sanity estén en estado "Published" (Verde).
          </p>
        </div>
      )}
    </main>
  );
}