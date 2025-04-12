'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Mock data for semester resources
const semesterData = {
  '1-1': {
    name: '1st Year, 1st Semester',
    icon: '🎓',
    description: 'Foundation courses for civil engineering students',
    resources: [
      { id: 1, title: 'Fall \'23', type: 'Course Materials', url: 'https://drive.google.com/drive/mobile/folders/1XI7m2t2nSgwSU8UCOnW0xFQXojOmrM6-' },
      { id: 2, title: 'Spring \'24', type: 'Lecture Notes', url: 'https://drive.google.com/drive/folders/1U40jaJW-J5ZKptSnMhIU53dTYUfbCOg8' },
      { id: 3, title: 'Spring \'23', type: 'Past Papers', url: 'https://drive.google.com/drive/mobile/folders/12Kx8W9dzdtW2dB7sSRgujaum69buaKk4?fbclid=IwZXh0bgNhZW0CMTEAAR5i05m3VQMDR9iPo3emvOKUnLL7Jt-gMjFFbAhP74bgo90Zxzm7dlZ-y0JX2Q_aem_V5kZDdnUPMhYkt_9wFGVxg' },
      { id: 4, title: 'Zaki Bhai', type: 'Reference Materials', url: 'https://drive.google.com/drive/u/0/mobile/folders/1JgS4K0UtlgujfiJx5c9IAMgmLyfMUiek?fbclid=IwZXh0bgNhZW0CMTEAAR5i05m3VQMDR9iPo3emvOKUnLL7Jt-gMjFFbAhP74bgo90Zxzm7dlZ-y0JX2Q_aem_V5kZDdnUPMhYkt_9wFGVxg&sort=13&direction=a' },
{
id: 5, title: 'Syllabus Tracker', type: 'Application', url:'https://adib3111.github.io/tracker-civil' },
    ]
  },
  '1-2': {
    name: '1st Year, 2nd Semester',
    icon: '📚',
    description: 'Core fundamental studies in engineering principles',
    resources: [
    
    ]
  },
  '2-1': {
    name: '2nd Year, 1st Semester',
    icon: '📐',
    description: 'Intermediate engineering and specialized topics',
    resources: [
      
    ]
  },
  '2-2': {
    name: '2nd Year, 2nd Semester',
    icon: '✏️',
    description: 'Advanced theoretical concepts and applications',
    resources: [
     
    ]
  },
  '3-1': {
    name: '3rd Year, 1st Semester',
    icon: '🧮',
    description: 'Specialized civil engineering disciplines',
    resources: [
  
    ]
  },
  '3-2': {
    name: '3rd Year, 2nd Semester',
    icon: '📏',
    description: 'Applied engineering and project planning',
    resources: [
      
    ]
  },
  '4-1': {
    name: '4th Year, 1st Semester',
    icon: '🔧',
    description: 'Advanced design and specialized applications',
    resources: [
     
    ]
  },
  '4-2': {
    name: '4th Year, 2nd Semester',
    icon: '🏗️',
    description: 'Capstone projects and professional preparation',
    resources: [
     
    ]
  },
};

// Resource type icons mapping
const typeIcons = {
  'Course Materials': '📘',
  'Lecture Notes': '📝',
  'Past Papers': '📄',
  'Reference Materials': '📚',
  'Exam Prep': '✏️',
  'Assignments': '📋',
  'Supplementary': '📌',
  'Practical': '🔬',
  'Coursework': '📑',
  'Project': '🏗️',
  'Professional': '👔',
  'Reference': '📖'
};

export default function SemesterPage({ params }) {
  // Unwrap params using React.use
  const unwrappedParams = React.use(params);
  const { semesterId } = unwrappedParams;
  
  const [animatedItems, setAnimatedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  const semester = semesterData[semesterId] || {
    name: 'Unknown Semester',
    icon: '📚',
    description: 'Semester resources',
    resources: []
  };

  // Animation for resources on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedItems(prev => [...prev, entry.target.getAttribute('data-id')]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.resource-item').forEach(item => {
      observer.observe(item);
    });

    return () => {
      document.querySelectorAll('.resource-item').forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  // Mouse movement tracking for header
  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      {/* Header with parallax effect */}
      <div 
        ref={containerRef}
        className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950 py-28 px-6 text-white overflow-hidden"
      >
        {/* Dynamic background gradient */}
        <div 
          className="absolute inset-0 z-0 opacity-50"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(138, 43, 226, 0.4) 0%, rgba(0, 0, 0, 0) 70%)`
          }}
        ></div>
        
        {/* SVG Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <svg className="svg-background h-full w-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <pattern id="blueprint" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.7" />
              <circle cx="15" cy="15" r="2" fill="none" stroke="white" strokeWidth="0.7" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#blueprint)" />
          </svg>
        </div>
        
        {/* Floating particles in header */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, index) => (
            <div
              key={index}
              className="absolute rounded-full bg-purple-300/20"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatParticle ${Math.random() * 10 + 15}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center mb-8 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-300 group shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <div className="flex items-center mb-4">
            <span className="text-5xl mr-4 bg-purple-800/30 p-3 rounded-lg backdrop-blur-sm shadow-lg">{semester.icon}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-shadow">{semester.name}</h1>
          </div>
          
          <p className="text-xl text-white/90 max-w-2xl mb-6 drop-shadow-md">
            {semester.description}
          </p>
          
          <div className="inline-block py-1 px-4 bg-purple-500/90 backdrop-blur-sm rounded-full text-sm font-medium shadow-lg">
            {semester.resources.length} {semester.resources.length === 1 ? 'RESOURCE' : 'RESOURCES'} AVAILABLE
          </div>
        </div>
      </div>
      
      {/* Resources List */}
      <div className="flex-grow py-16 px-6 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {semester.resources.map((resource, index) => (
              <div
                key={resource.id}
                data-id={`resource-${resource.id}`}
                className={`resource-item group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
                  animatedItems.includes(`resource-${resource.id}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } hover:-translate-y-2 hover:border-purple-500/30 dark:hover:border-purple-400/30`}
                style={{ 
                  transition: `all 0.5s ease-out ${index * 0.1}s`
                }}
                onMouseEnter={() => setSelectedItem(resource.id)}
                onMouseLeave={() => setSelectedItem(null)}
              >
                <div className="p-6">
                  <div className="absolute top-0 right-0 p-3">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md ${
                      selectedItem === resource.id ? 'bg-purple-600 text-white scale-110' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'
                    } transition-all duration-300`}>
                      {typeIcons[resource.type] || '📄'}
                    </div>
                  </div>
                  
                  <div className="mb-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                    {resource.type}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-purple-800 dark:group-hover:text-purple-300 transition-colors duration-300">
                    {resource.title}
                  </h3>
                  
                  <div className="h-[2px] w-full bg-gradient-to-r from-purple-400/30 to-transparent mb-5 mt-5 group-hover:from-purple-500 transition-colors duration-300"></div>
                  
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative overflow-hidden flex items-center justify-between w-full py-3 px-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg text-gray-700 dark:text-gray-200 font-medium transition-all duration-300 group-hover:pl-6 shadow-sm group-hover:shadow-md"
                  >
                    <span>Access Resource</span>
                    <svg 
                      className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {semester.resources.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 px-6">
              <div className="text-6xl mb-6 animate-bounce">📚</div>
              <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-4">No Resources Yet</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-lg mx-auto">
                Resources for this semester will be added soon. Check back later or contact the administrator for more information.
              </p>
              <Link 
                href="/"
                className="mt-8 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick semester navigation */}
      {semester.resources.length > 0 && (
        <div className="bg-gradient-to-r from-gray-900 to-slate-950 text-white border-t border-gray-800 py-10 px-6">
          <div className="container mx-auto">
            <h3 className="text-lg font-bold text-white/90 mb-6">Navigate to Other Semesters</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {Object.entries(semesterData).map(([id, sem]) => (
                <Link
                  key={id}
                  href={`/semester/${id}`}
                  className={`py-2 px-3 text-sm rounded-lg transition-all duration-300 text-center ${
                    id === semesterId
                      ? 'bg-purple-700 text-white font-medium shadow-md hover:shadow-lg'
                      : 'bg-gray-800/70 text-white/80 hover:bg-gray-700 hover:text-white shadow-sm hover:shadow-md'
                  }`}
                >
                  {sem.name.split(' ').pop()+" "}{id}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
} 