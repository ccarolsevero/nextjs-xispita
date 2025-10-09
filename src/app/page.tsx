'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentLimonadaSlide, setCurrentLimonadaSlide] = useState(0);
  const images = ['/assents/1.png', '/assents/2.png', '/assents/3.png', '/assents/Design5.png', '/assents/Design6.png', '/assents/Design7.png'];
  const productImages = [
    '/assents/Fotos de productos/Botella 1.png',
    '/assents/Fotos de productos/Lata 1.png',
    '/assents/Fotos de productos/Lata de plástico 1.png'
  ];
  const limonadaImages = [
    '/assents/Fotos de productos/Botella 2.png',
    '/assents/Fotos de productos/Lata 2.png',
    '/assents/Fotos de productos/Lata de plástico 2.png'
  ];
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
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // Add visible class to trigger animation
            element.classList.add('visible');
            if (element.id) {
              setVisibleSections((prev) => new Set([...prev, element.id]));
            }
          } else {
            // Remove visible class to reset animation
            element.classList.remove('visible');
            if (element.id) {
              setVisibleSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete(element.id);
                return newSet;
              });
            }
          }
        });
      },
      { 
        threshold: 0.01,
        rootMargin: '100px 0px 100px 0px'
      }
    );

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('[data-animate-scroll]');
      elements.forEach((el) => observer.observe(el));
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextProductSlide = () => {
    setCurrentProductSlide((prev) => (prev + 1) % productImages.length);
  };

  const prevProductSlide = () => {
    setCurrentProductSlide((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const nextLimonadaSlide = () => {
    setCurrentLimonadaSlide((prev) => (prev + 1) % limonadaImages.length);
  };

  const prevLimonadaSlide = () => {
    setCurrentLimonadaSlide((prev) => (prev - 1 + limonadaImages.length) % limonadaImages.length);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
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
              href="#productos" 
              className="text-[#FE299E] text-base font-extrabold hover:text-[#1B3CC0] transition-colors"
              style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
            >
              Productos
            </Link>
            <Link 
              href="#sobre-nosotros" 
              className="text-[#FE299E] text-base font-extrabold hover:text-[#1B3CC0] transition-colors"
              style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
            >
              Sobre Nosotros
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
            className="text-[#FE299E] z-50 md:hidden relative w-6 h-6 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            <div className="w-6 flex flex-col gap-1.5 transition-all duration-300">
              <span 
                className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span 
                className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span 
                className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Menu Dropdown */}
        {isMenuOpen && (
          <>
            {/* Overlay to close when clicking outside */}
            <div 
              className="fixed inset-0 z-30 top-12 md:top-16"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Menu */}
            <div className="fixed top-12 right-4 md:top-16 md:right-6 bg-[#FE299E] rounded-lg shadow-lg z-40 p-4 min-w-[200px]">
              <nav className="flex flex-col gap-3">
                <Link 
                  href="#productos" 
                  className="text-white text-sm md:text-base font-extrabold hover:text-[#FFE605] transition-colors py-2 px-3 rounded hover:bg-white hover:bg-opacity-20"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
                >
                  Productos
                </Link>
                <Link 
                  href="#sobre-nosotros" 
                  className="text-white text-sm md:text-base font-extrabold hover:text-[#FFE605] transition-colors py-2 px-3 rounded hover:bg-white hover:bg-opacity-20"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
                >
                  Sobre Nosotros
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
              <div className="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[450px] xl:w-[500px] md:-translate-x-32 lg:-translate-x-40 xl:-translate-x-48">
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
            className="text-black text-[28vw] sm:text-[26vw] md:text-[22vw] lg:text-[20vw] font-extrabold leading-none text-center flex"
            style={{ 
              fontFamily: 'var(--font-bricolage-extrabold)',
              opacity: '0.15'
            }}
          >
            <span 
              id="pitaya-text-left"
              data-animate-scroll
              className={`transition-all duration-1500 ${visibleSections.has('pitaya-text-left') ? 'translate-x-0' : '-translate-x-full opacity-0'}`}
            >
              PIT
            </span>
            <span 
              id="pitaya-text-right"
              data-animate-scroll
              className={`transition-all duration-1500 ${visibleSections.has('pitaya-text-right') ? 'translate-x-0' : 'translate-x-full opacity-0'}`}
            >
              AYA
            </span>
          </h2>
        </div>
      </section>

      {/* New Pink Section */}
      <section className="bg-[#FE299E] min-h-[400px] px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            {/* Product Slider - Right Side */}
            <div className="relative max-w-md w-full md:w-1/2 flex-shrink-0">
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentProductSlide * 100}%)` }}
              >
                {productImages.map((img, index) => (
                  <div key={index} className="min-w-full">
            <Image
                      src={img}
                      alt={`Producto ${index + 1}`}
                      width={500}
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Previous Button */}
            <button
              onClick={prevProductSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-[#FE299E] rounded-full p-2 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Next Button */}
            <button
              onClick={nextProductSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-[#FE299E] rounded-full p-2 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProductSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentProductSlide === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
            
            {/* Product Description - Right Side */}
            <div className="flex-1 text-white">
              <h3 
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-center md:text-left"
                style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
              >
                Xispita de Pitaya
              </h3>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-center md:text-left">
                <span className="font-bold">Refrescante, vibrante y naturalmente deliciosa.</span>
                <br/><br/>
                Nuestra Xispita de pitaya combina el sabor exótico de esta fruta tropical con un toque de frescura que despierta todos tus sentidos. Es la elección perfecta para quienes buscan una bebida diferente, llena de color, energía y alegría. ¡Déjate llevar por su encanto rosa y siente cómo cada sorbo te llena de vida!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Limonada de Coco Section with Text Background */}
      <section className="bg-[#99D700] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex items-center justify-center px-4 py-8 md:py-12 lg:py-16">
        <div className="w-[90%] flex items-center justify-center">
          <h2 
            className="text-black text-[12vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] font-extrabold leading-none text-center flex"
            style={{ 
              fontFamily: 'var(--font-bricolage-extrabold)',
              opacity: '0.15'
            }}
          >
            <span 
              id="limonada-text-left"
              data-animate-scroll
              className={`transition-all duration-1500 ${visibleSections.has('limonada-text-left') ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
            >
              COCO&nbsp;Y&nbsp;
            </span>
            <span 
              id="limonada-text-right"
              data-animate-scroll
              className={`transition-all duration-1500 ${visibleSections.has('limonada-text-right') ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            >
              LIMÓN
            </span>
          </h2>
        </div>
      </section>

      {/* Limonada Product Details Section */}
      <section className="bg-[#99D700] min-h-[400px] px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            {/* Product Slider - Right Side */}
            <div className="relative max-w-md w-full md:w-1/2 flex-shrink-0">
              <div className="overflow-hidden rounded-lg">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentLimonadaSlide * 100}%)` }}
                >
                  {limonadaImages.map((img, index) => (
                    <div key={index} className="min-w-full">
                      <Image
                        src={img}
                        alt={`Limonada Producto ${index + 1}`}
                        width={500}
                        height={500}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Previous Button */}
              <button
                onClick={prevLimonadaSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-[#99D700] rounded-full p-2 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Next Button */}
              <button
                onClick={nextLimonadaSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-[#99D700] rounded-full p-2 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {limonadaImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentLimonadaSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentLimonadaSlide === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Product Description - Right Side */}
            <div className="flex-1 text-white">
              <h3 
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-center md:text-left"
                style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}
              >
                Xispita de Coco y Limón
              </h3>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-center md:text-left">
                <span className="font-bold">Suave, cremosa y con un giro cítrico irresistible.</span>
                <br/><br/>
                Xispita de coco y limón une lo mejor de dos mundos: la frescura del limón y la suavidad tropical del coco. Una combinación equilibrada y deliciosa que te transporta directo a la playa, sin moverte de donde estás. ¡Naturalmente refrescante, ligera y simplemente deliciosa!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="sobre-nosotros" className="bg-[#FFE605] min-h-[500px] sm:min-h-[550px] md:min-h-[600px] px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black mb-6 md:mb-8 text-center" style={{ fontFamily: 'var(--font-bricolage-extrabold)', opacity: '0.25' }}>SOBRE NOSOTROS</h2>
          
          <p className="text-black text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed text-center">
            En Xispita celebramos la frescura, la alegría y el sabor natural de la vida. Somos una marca que nace con la idea de ofrecer bebidas auténticas, llenas de color, energía y buen gusto.
            <br/><br/>
            Creemos que cada momento puede volverse especial con algo sencillo: una bebida natural que te conecte con lo que te hace bien. Por eso cuidamos cada detalle, desde la elección de los ingredientes hasta la experiencia de disfrutarla.
            <br/><br/>
            Xispita es más que una marca. Es una invitación a disfrutar lo natural, a vivir con buena vibra y a compartir la frescura de lo auténtico.
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
              <Link href="#productos" className="hover:text-[#1B3CC0] transition-colors font-extrabold" style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}>
                Productos
              </Link>
              <Link href="#sobre-nosotros" className="hover:text-[#1B3CC0] transition-colors font-extrabold" style={{ fontFamily: 'var(--font-bricolage-extrabold)' }}>
                Sobre Nosotros
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
