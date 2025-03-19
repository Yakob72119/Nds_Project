'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    startAutoPlay();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const slides = [
    {
      title: "Welcome to NDS Trading Opportunity Hub",
      description: "Your gateway to exceptional services in social media, health, and education",
      image: "/image1.jpeg"
    },
    {
      title: "Innovative Solutions for Your Business",
      description: "Discover our comprehensive range of professional services",
      image: "/image2.jpeg"
    },
    {
      title: "Expert Team, Exceptional Results",
      description: "Join our community of successful businesses",
      image: "image3.jpeg"
    },
    {
      title: "Global Reach, Local Touch",
      description: "Connect with partners worldwide through our network",
      image: "image4.jpeg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  return (
    <section 
      className="relative w-full h-[66vh] flex items-center justify-center text-white overflow-hidden"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Background image with smooth transition */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ 
          backgroundImage: `url(${slides[currentSlide].image})`,
          transform: `scale(1.1)`,
          opacity: 1,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 z-20 text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition"
      >
        ←
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 z-20 text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition"
      >
        →
      </button>

      {/* Content with correct logo path */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <div className="mb-8">
          <Image 
            src="/nds_log.png" 
            alt="NDS Trading Logo" 
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 transform transition-all duration-700 ease-in-out opacity-100">
          {slides[currentSlide].title}
        </h1>
        <p className="text-xl mb-8 transform transition-all duration-700 ease-in-out opacity-100">
          {slides[currentSlide].description}
        </p>
        <button className="px-8 py-3 bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 mx-auto">
          Explore Our Services
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Carousel dots with smooth transitions */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out ${
              currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
  
