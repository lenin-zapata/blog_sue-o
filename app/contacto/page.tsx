import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-[#FAF9F6] py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Cabecera Centrada */}
        <div className="text-center mb-16">
          <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#8E6E77] mb-6`}>
            Hablemos
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            ¿Tienes dudas sobre el crecimiento de tu bebé o quieres saber más sobre mis asesorías?
            Estoy aquí para acompañarte en este proceso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Columna Izquierda: Información */}
          <div className="space-y-8 mt-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className={`${playfair.className} text-2xl font-bold text-[#8E6E77] mb-6`}>
                Información de contacto
              </h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#F3ECF7] rounded-full flex items-center justify-center text-xl group-hover:bg-[#E6DAF0] transition-colors">
                    💌
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Escríbeme</p>
                    <a href="mailto:anamariiajacomel@gmail.com" className="text-gray-800 font-medium hover:text-[#8E6E77] transition-colors">
                      anamariiajacomel@gmail.com
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#F3ECF7] rounded-full flex items-center justify-center text-xl group-hover:bg-[#E6DAF0] transition-colors">
                    📸
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Sígueme</p>
                    <a href="https://tiktok.com" target="_blank" className="text-gray-800 font-medium hover:text-[#8E6E77] transition-colors">
                      @anamariajacomel
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Nota Adicional */}
            <div className="bg-[#6B8E6B]/10 p-6 rounded-2xl border border-[#6B8E6B]/20">
              <p className="text-[#5A7A5A] text-sm">
                <strong>Nota:</strong> Suelo responder los correos dentro de las 24-48 horas hábiles. ¡Gracias por tu paciencia!
              </p>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <form 
            action="https://formspree.io/f/mgovgyyl" 
            method="POST"
            className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Tu Nombre</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#8E6E77] focus:border-transparent outline-none transition-all"
                  placeholder="María Pérez"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Tu Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#8E6E77] focus:border-transparent outline-none transition-all"
                  placeholder="maria@ejemplo.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">¿En qué puedo ayudarte?</label>
                <textarea 
                  name="message" 
                  rows={4} 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#8E6E77] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Cuéntame brevemente sobre tu bebé..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#8E6E77] text-white font-bold py-4 rounded-full hover:bg-[#6D4C55] transform hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}