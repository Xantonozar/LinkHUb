'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef(null);
  const ctaRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Bounce effect for CTA button
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-bounce');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.7 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  // Generate random particles
  useEffect(() => {
    if (!isClient) return;
    
    const generateParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 30); // Adjust count based on screen size
      const newParticles = [];
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // % position
          y: Math.random() * 100, // % position
          size: Math.random() * 30 + 5, // 5-35px
          duration: Math.random() * 20 + 10, // 10-30s
          delay: Math.random() * 5, // 0-5s delay
          opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5 opacity
          glow: Math.random() > 0.7, // 30% chance to have glow effect
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      generateParticles();
    };
    
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  // Mouse movement tracking
  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isClient]);

  // Calculate background gradient based on mouse position
  const calculateGradient = () => {
    if (!isClient || !containerRef.current) {
      return `radial-gradient(circle at 50% 50%, var(--primary) 0%, #062d42 80%)`;
    }
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const x = (mousePosition.x / width) * 100;
    const y = (mousePosition.y / height) * 100;
    
    return `radial-gradient(circle at ${x}% ${y}%, var(--primary) 0%, #062d42 80%)`;
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ 
        background: calculateGradient(),
        transition: "background 0.3s ease-out"
      }}
    >
      {/* Particles background */}
      <div className="absolute inset-0 particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full particle ${particle.glow ? "glow" : ""}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `rgba(255, 255, 255, ${particle.opacity})`,
              animationDuration: `${particle.duration}s, ${particle.duration * 0.8}s${particle.glow ? ", 3s" : ""}`,
              animationDelay: `${particle.delay}s, ${particle.delay}s${particle.glow ? ", 0s" : ""}`,
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </div>

      {/* SVG Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-10 pointer-events-none">
        <svg className="svg-background h-full w-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.3" />
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
            <pattern id="tech-circuit" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="90" cy="90" r="2" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="90" cy="10" r="2" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="10" cy="90" r="2" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="5" fill="none" stroke="white" strokeWidth="0.5" />
              
              <line x1="10" y1="10" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
              <line x1="90" y1="90" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
              <line x1="90" y1="10" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
              <line x1="10" y1="90" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
              
              <rect x="45" y="20" width="10" height="10" fill="none" stroke="white" strokeWidth="0.5" />
              <rect x="20" y="45" width="10" height="10" fill="none" stroke="white" strokeWidth="0.5" />
              <rect x="70" y="45" width="10" height="10" fill="none" stroke="white" strokeWidth="0.5" />
              <rect x="45" y="70" width="10" height="10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)" />
          <rect width="100%" height="100%" fill="url(#tech-circuit)" opacity="0.7" />
        </svg>
      </div>

      {/* Cursor tracer */}
      {isClient && (
        <div
          className="cursor-tracer"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        />
      )}

      {/* Content */}
      <div className="container mx-auto relative z-20 px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left text-white animate-slideRight">
            <span className="inline-block py-1 px-3 bg-accent/80 text-white text-sm font-medium rounded-full mb-6 animate-pulse">
              SAVE TIME. BOOST PRODUCTIVITY.
            </span>
            
            <h1 className="hero-text text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Centralized Academic Resources for Civil Engineering
            </h1>
            
            <p className="sub-headline text-lg md:text-xl font-light mb-8 max-w-xl leading-relaxed text-white/90">
              Access all your semester-specific links in one place—streamline your studies and boost your productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
              <a 
                href="#semesters" 
                ref={ctaRef}
                className="cta-button inline-block bg-accent text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-accent/90 hover:scale-105 hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
                  Explore Semesters
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              
              <div className="flex items-center">
                <span className="text-white/80 text-lg hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">
                  All your resources, just one click away
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-8 mt-12">
              <div className="flex items-center group hover:translate-y-[-5px] transition-all duration-300 cursor-pointer">
                <div className="bg-white/10 rounded-full p-3 mr-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <div className="text-2xl group-hover:rotate-12 transition-transform duration-300">⏱️</div>
                </div>
                <div>
                  <div className="font-bold group-hover:text-accent transition-colors duration-300">Save Time</div>
                  <div className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">Quick access to materials</div>
                </div>
              </div>
              <div className="flex items-center group hover:translate-y-[-5px] transition-all duration-300 cursor-pointer">
                <div className="bg-white/10 rounded-full p-3 mr-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <div className="text-2xl group-hover:rotate-12 transition-transform duration-300">🔄</div>
                </div>
                <div>
                  <div className="font-bold group-hover:text-accent transition-colors duration-300">Centralized Links</div>
                  <div className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">Everything in one place</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center items-center animate-slideLeft">
            <div className="relative w-[500px] h-[500px]">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="w-full h-full flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10 w-full max-w-md hover:border-accent/30 hover:shadow-accent/10 transition-all duration-500">
                  <div className="flex items-center mb-6">
                    <div className="bg-accent/20 rounded-full p-3 mr-4 hover:bg-accent/30 hover:scale-110 transition-all duration-300">
                      <div className="text-3xl hover:rotate-12 transition-transform duration-300">🏗️</div>
                    </div>
                    <div>
                      <div className="font-bold text-xl text-white hover:text-accent transition-colors duration-300">Civil Engineering Hub</div>
                      <div className="text-sm text-white/80 hover:text-white transition-colors duration-300">Organized by semester</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {[1, 2, 3, 4].map(year => (
                      <div 
                        key={year} 
                        className="bg-white/5 rounded-lg p-3 flex items-center hover:bg-white/10 hover:translate-x-1 cursor-pointer transition-all duration-300 group"
                      >
                        <span className="text-lg mr-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          {year === 1 ? '🎓' : year === 2 ? '📚' : year === 3 ? '📐' : '🔧'}
                        </span>
                        <span className="font-medium group-hover:font-bold group-hover:text-white transition-all duration-300">
                          Year {year} Resources
                        </span>
                        <svg 
                          className="ml-auto w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center text-white/60 text-sm hover:text-white hover:font-medium transition-all duration-300 cursor-pointer">
                    8 semesters · 30+ courses · 100+ resources
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
} 