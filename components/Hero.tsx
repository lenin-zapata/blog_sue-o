import Image from 'next/image';
import { Playfair_Display, Inter } from 'next/font/google';
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' });
const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left column: Title, subtitle, CTA */}
        <div>
          <h1 className={`${playfair.className} text-4xl md:text-5xl font-semibold text-[#8E6E77]`}>Mi Blog</h1>
          <p className={`${inter.className} mt-4 text-gray-700`}>Historias, consejos y recursos cálidos para acompañarte en el camino de crecimiento de tu bebé</p>
          <div className="mt-6">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full bg-white text-[#8E6E77] border border-gray-200 px-5 py-2.5 shadow-sm hover:shadow-md"
            >
              COMENZAR A LEER MI BLOG
            </Link>
          </div>
        </div>

        {/* Right column: Image */}
        <div className="relative w-full h-[280px] md:h-[380px]">
          <Image
            src="\pexels-helenalopes-27176050.jpg"
            alt="Madre e hijo leyendo"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
