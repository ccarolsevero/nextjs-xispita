'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ['/assents/1.png', '/assents/2.png', '/assents/3.png'];
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id) {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => {
                const newSet = new Set(prev);
                newSet.add(entry.target.id);
                return newSet;
              });
            } else {
              setVisibleSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete(entry.target.id);
                return newSet;
              });
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    // Wait for DOM to be ready
    setTimeout(() => {
      const elements = document.querySelectorAll('[data-animate-scroll]');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative">
        {/* Top yellow strip */}
        <div className="bg-[#FFE605] h-12 md:h-16 flex items-center justify-between px-4 md:px-6 fixed top-0 left-0 right-0 z-50">
          <Link href="/" className="h-10 md:h-12">
        <Image
              src="/assents/Logo/SVG/Logo Secundario Negro.svg"
              alt="Xispita Logo"
          width={180}
              height={48}
              className="h-10 md:h-12 w-auto"
              style={{ filter: 'brightness(0) saturate(100%) invert(23%) sepia(97%) saturate(6476%) hue-rotate(322deg) brightness(99%) contrast(99%)' }}
            />
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6">
            <Link 
              href="#sobre-nosotros" 
              className="text-[#FE299E] text-base font-extrabold hover:text-[#1B3CC0] transition-colors"
              style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
            >
              Sobre Nosotros
            </Link>
            <Link 
              href="#productos" 
              className="text-[#FE299E] text-base font-extrabold hover:text-[#1B3CC0] transition-colors"
              style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
            >
              Productos
            </Link>
            <Link 
              href="#contato" 
              className="text-[#FE299E] text-base font-extrabold hover:text-[#1B3CC0] transition-colors"
              style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
            >
              Contacto
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="text-[#FE299E] z-50 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="absolute top-12 right-4 md:top-16 md:right-6 bg-[#FE299E] rounded-lg shadow-lg z-40 p-4 min-w-[200px]">
              <nav className="flex flex-col gap-3">
                <Link 
                  href="#sobre-nosotros" 
                  className="text-white text-sm md:text-base font-extrabold hover:text-[#FFE605] transition-colors py-2 px-3 rounded hover:bg-white hover:bg-opacity-20"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
                >
                  Sobre Nosotros
                </Link>
                <Link 
                  href="#productos" 
                  className="text-white text-sm md:text-base font-extrabold hover:text-[#FFE605] transition-colors py-2 px-3 rounded hover:bg-white hover:bg-opacity-20"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
                >
                  Productos
                </Link>
                <Link 
                  href="#contato" 
                  className="text-white text-sm md:text-base font-extrabold hover:text-[#FFE605] transition-colors py-2 px-3 rounded hover:bg-white hover:bg-opacity-20"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
                >
                  Contacto
                </Link>
              </nav>
            </div>
          </>
        )}
        
        {/* Main blue hero section */}
        <div className="bg-[#1B3CC0] min-h-[400px] md:min-h-[600px] flex flex-col items-start justify-start px-4 md:px-6 pt-12 md:pt-16 relative overflow-hidden">
          {/* Centered logo */}
          <div className="text-center mt-1 md:mt-2 w-full">
                  <Image
                    src="/assents/Logo/SVG/Logo principal.svg"
                    alt="Xispita Logo"
                    width={900}
                    height={450}
                    className="mx-auto w-full max-w-[350px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[650px] xl:max-w-[800px] h-auto"
                    priority
                  />
          </div>
          
          {/* White text and illustration side by side */}
          <div className="w-full -mt-16 md:-mt-32 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-8 px-4 md:px-6 lg:px-8">
            {/* White text */}
            <div className="flex-1 w-full md:min-w-0 animate-slide-in-left">
              <Image
                src="/assents/Texto Blanco.svg"
                alt="Xispita Texto"
                width={1000}
                height={250}
                className="w-full h-auto max-w-[400px] md:max-w-none mx-auto md:mx-0"
              />
            </div>
            
            {/* Illustration 2 */}
            <div className="flex-shrink-0 -mt-8 md:mt-0 animate-slide-in-right">
              <div className="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[450px] xl:w-[500px]">
                <Image
                  src="/assents/Ilustración 2 - Sin fondo.svg"
                  alt="Xispita Ilustração"
                  width={6000}
                  height={6000}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Products Title Section */}
      <section id="productos" className="bg-[#FFE605] py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 
            className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-center"
            style={{ fontFamily: 'var(--font-bricolage-extrabold)', opacity: '0.25' }}
          >
            CONOCÉ NUESTROS PRODUCTOS
          </h2>
        </div>
      </section>

      {/* Pitaya Section */}
      <section className="bg-[#FE299E] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex items-center justify-center px-4 py-8 md:py-12 lg:py-16">
        <div className="w-[90%] flex items-center justify-center">
          <h2 
            id="pitaya-text"
            data-animate-scroll
            className={`text-black text-[28vw] sm:text-[26vw] md:text-[22vw] lg:text-[20vw] font-extrabold leading-none text-center transition-all duration-1500 ${visibleSections.has('pitaya-text') ? 'opacity-15 translate-x-0' : 'opacity-0 -translate-x-full'}`}
            style={{ 
              fontFamily: 'var(--font-bricolage-extrabold)'
            }}
          >
            PITAYA
          </h2>
        </div>
      </section>

      {/* Limonada de Coco Section */}
      <section className="bg-[#99D700] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex items-center justify-center px-4 py-8 md:py-12 lg:py-16">
        <div className="w-[90%] flex items-center justify-center">
          <div className="text-center">
            <h2 
              id="limonada-text-1"
              data-animate-scroll
              className={`text-black text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[14vw] font-extrabold leading-none transition-all duration-1500 ${visibleSections.has('limonada-text-1') ? 'opacity-15 translate-x-0' : 'opacity-0 -translate-x-full'}`}
              style={{ 
                fontFamily: 'var(--font-bricolage-extrabold)'
              }}
            >
              LIMONADA
            </h2>
            <h2 
              id="limonada-text-2"
              data-animate-scroll
              className={`text-black text-[18vw] sm:text-[16vw] md:text-[15vw] lg:text-[14vw] font-extrabold leading-none transition-all duration-1500 delay-300 ${visibleSections.has('limonada-text-2') ? 'opacity-15 translate-x-0' : 'opacity-0 -translate-x-full'}`}
              style={{ 
                fontFamily: 'var(--font-bricolage-extrabold)'
              }}
            >
              DE COCO
            </h2>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="sobre-nosotros" className="bg-[#FFE605] min-h-[500px] sm:min-h-[550px] md:min-h-[600px] px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black mb-6 md:mb-8 text-center" style={{ fontFamily: 'var(--font-bricolage-extrabold)', opacity: '0.25' }}>SOBRE NOSOTROS</h2>
          
          <p className="text-black text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed text-center">
            Es una marca de bebidas naturales y refrescantes que combina ingredientes exóticos como la pitaya y el coco para ofrecer una experiencia auténtica, saludable y vibrante. Más que una bebida, representa un estilo de vida dinámico y juvenil, inspirado en la frescura, la alegría y la innovación.
          </p>
          
          {/* Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-[6px]">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {images.map((img, index) => (
                  <div key={index} className="min-w-full">
          <Image
                      src={img}
                      alt={`Slide ${index + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto rounded-[6px]"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-3 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-3 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index ? 'bg-black w-8' : 'bg-black bg-opacity-30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="bg-[#FE299E] min-h-[400px] px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black mb-6 md:mb-8 text-center"
            style={{ fontFamily: 'var(--font-bricolage-extrabold)', opacity: '0.25' }}
          >
            CONTACTO
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-8">
            {/* Contact Information */}
            <div className="flex-1 text-white space-y-4 md:space-y-6 text-center md:text-left">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}>
                  Email
                </h3>
                <p className="text-base sm:text-lg md:text-xl break-words">contacto@xispita.com</p>
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}>
                  Teléfono
                </h3>
                <p className="text-base sm:text-lg md:text-xl">+54 11 1234-5678</p>
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}>
                  Redes Sociales
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-base sm:text-lg md:text-xl">
                  <a href="#" className="hover:text-[#FFE605] transition-colors">Instagram</a>
                  <a href="#" className="hover:text-[#FFE605] transition-colors">Facebook</a>
                  <a href="#" className="hover:text-[#FFE605] transition-colors">TikTok</a>
                </div>
              </div>
            </div>
            
            {/* Illustration */}
            <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] flex-shrink-0">
          <Image
                src="/assents/Ilustración 1 - Sin fondo.svg"
                alt="Xispita Ilustração"
                width={400}
                height={400}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFE605] py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="h-12">
          <Image
                src="/assents/Logo/SVG/Logo Secundario Negro.svg"
                alt="Xispita Logo"
                width={180}
                height={48}
                className="h-12 w-auto"
                style={{ filter: 'brightness(0) saturate(100%) invert(23%) sepia(97%) saturate(6476%) hue-rotate(322deg) brightness(99%) contrast(99%)' }}
              />
            </div>
            
            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-6 text-[#FE299E]">
              <Link href="#sobre-nosotros" className="hover:text-[#1B3CC0] transition-colors font-extrabold" style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}>
                Sobre Nosotros
              </Link>
              <Link href="#productos" className="hover:text-[#1B3CC0] transition-colors font-extrabold" style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}>
                Productos
              </Link>
              <Link href="#contato" className="hover:text-[#1B3CC0] transition-colors font-extrabold" style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}>
                Contacto
              </Link>
            </nav>
            
            {/* Copyright */}
            <div className="text-black text-sm md:text-base">
              © 2025 Xispita. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
