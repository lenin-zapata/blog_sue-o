import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Importamos las fuentes
import "./globals.css"; // <--- IMPORTANTE: Si esto falta, todo se ve feo
import Navbar from "@/components/Navbar"; // Asegúrate de tener este componente o créalo

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Blog de Crianza y Sueño Infantil | Creciendo con Amor",
  description: "Consejos para la crianza y el sueño de tu bebé con amor y dedicación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#FAF9F6] text-gray-800 antialiased`}>
        {/* Aquí va el Navbar fijo arriba */}
        <Navbar /> 
        
        {/* Este main controla que el contenido no pegue con los bordes */}
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        
        {/* Un footer sencillo */}
        <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-200 mt-12">
          © {new Date().getFullYear()} Creciendo con Amor
        </footer>
      </body>
    </html>
  );
}