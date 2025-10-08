'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative">
        {/* Top pink strip */}
        <div className="bg-[#FE299E] h-12 md:h-16 flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="h-10 md:h-12">
            <Image
              src="/assents/Logo/SVG/Logo secundario Blanco.svg"
              alt="Xispita Logo"
              width={180}
              height={48}
              className="h-10 md:h-12 w-auto"
            />
          </Link>
          <button 
            className="text-[#FFE605] z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Menu Dropdown */}
        {isMenuOpen && (
          <>
            {/* Overlay to close when clicking outside */}
            <div 
              className="fixed inset-0 z-30"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Menu */}
            <div className="absolute top-12 right-4 md:top-16 md:right-6 bg-[#1B3CC0] rounded-lg shadow-lg z-40 p-4 min-w-[200px]">
              <nav className="flex flex-col gap-3">
                <Link 
                  href="#sobre-nosotros" 
                  className="text-white text-sm md:text-base font-bold hover:text-[#FFE605] transition-colors py-2 px-3 rounded hover:bg-[#FE299E] hover:bg-opacity-20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre Nosotros
                </Link>
                <Link 
                  href="#productos" 
                  className="text-white text-sm md:text-base font-bold hover:text-[#FFE605] transition-colors py-2 px-3 rounded hover:bg-[#FE299E] hover:bg-opacity-20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Productos
                </Link>
                <Link 
                  href="#contato" 
                  className="text-white text-sm md:text-base font-bold hover:text-[#FFE605] transition-colors py-2 px-3 rounded hover:bg-[#FE299E] hover:bg-opacity-20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </nav>
            </div>
          </>
        )}
        
        {/* Main blue hero section */}
        <div className="bg-[#1B3CC0] min-h-[400px] md:min-h-[600px] flex flex-col items-start justify-start px-4 md:px-6 pt-0 relative overflow-hidden">
          {/* Centered logo */}
          <div className="text-center mt-1 md:mt-2 w-full">
                  <Image
                    src="/assents/Logo/SVG/Logo principal.svg"
                    alt="Xispita Logo"
                    width={900}
                    height={450}
                    className="mx-auto w-full max-w-[350px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[800px] h-auto"
                    priority
                  />
          </div>
          
          {/* White text and illustration side by side */}
          <div className="w-full -mt-16 md:-mt-32 flex flex-row items-center justify-start gap-1 md:gap-2 lg:gap-3 px-4 md:px-6 lg:px-8">
            {/* White text */}
            <div className="flex-shrink-0 w-full">
              <div 
                className="w-full h-auto max-w-[60vw] min-w-[280px] md:max-w-[50vw] lg:max-w-[45vw]"
              >
                <Image
                  src="/assents/Texto Blanco.svg"
                  alt="Xispita Texto"
                  width={1000}
                  height={250}
                  className="w-full h-auto"
                  style={{
                    transform: isMobile ? 'translateX(-50px)' : 'translateX(100px)'
                  }}
                />
              </div>
            </div>
            
            {/* Illustration 2 */}
            <div className="flex-shrink-0 flex justify-start">
              <div 
                className="w-[220px] h-[220px] md:w-[667px] md:h-[667px]"
              >
                <Image
                  src="/assents/Ilustración 2 - Sin fondo.svg"
                  alt="Xispita Ilustração"
                  width={6000}
                  height={6000}
                  className="w-full h-full"
                  style={{
                    transform: isMobile ? 'translateX(-200px)' : 'translateX(-900px)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About Us Section */}
      <section id="sobre-nosotros" className="bg-[#1B3CC0] min-h-[600px] px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 md:mb-8 text-center md:text-left">SOBRE NOSOTROS</h2>
          
          <p className="text-white text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-4xl leading-relaxed text-center md:text-left">
            Es una marca de bebidas naturales y refrescantes que combina ingredientes exóticos como la pitaya y el coco para ofrecer una experiencia auténtica, saludable y vibrante. Más que una bebida, representa un estilo de vida dinámico y juvenil, inspirado en la frescura, la alegría y la innovación.
          </p>
          
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-[#FE299E] bg-opacity-20 rounded-2xl p-4 md:p-6 h-48 md:h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-[#FE299E] rounded-full mx-auto mb-3 md:mb-4"></div>
                <div className="w-12 md:w-16 h-12 md:h-16 bg-[#FFE605] rounded-lg mx-auto"></div>
              </div>
            </div>
            
            <div className="bg-[#FFE605] bg-opacity-20 rounded-2xl p-4 md:p-6 h-48 md:h-64 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-base md:text-lg font-bold text-[#1B3CC0] mb-2 md:mb-4">VIVÍ A TODO COLOR</h3>
                <h3 className="text-base md:text-lg font-bold text-[#1B3CC0] mb-2 md:mb-4">VIVÍ INTENSO</h3>
                <div className="flex gap-2 justify-center">
                  <div className="w-10 md:w-12 h-12 md:h-16 bg-[#FE299E] rounded"></div>
                  <div className="w-10 md:w-12 h-12 md:h-16 bg-[#99D700] rounded"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#99D700] bg-opacity-20 rounded-2xl p-4 md:p-6 h-48 md:h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 md:w-16 h-16 md:h-20 bg-[#99D700] rounded-lg mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
