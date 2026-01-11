import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="font-serif text-xl font-bold text-[#8E6E77]">
          <Link href="/">Creciendo con Amor</Link>
        </div>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-[#8E6E77]">Inicio</Link>
          <Link href="/blog" className="hover:text-[#8E6E77]">Blog</Link>
          {/* <Link href="#sobre-mi" className="hover:text-[#8E6E77]">Soy Ana María</Link> */}
        </div>

        {/* Botón CTA */}
        <Link 
          href="/contacto"
          className="px-5 py-2 bg-[#8E6E77] text-white rounded-full text-sm font-semibold hover:bg-[#7a5e66] transition-colors"
        >
          Contacto
        </Link>
      </div>
    </nav>
  );
}