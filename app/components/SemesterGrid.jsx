'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const semesters = [
  { 
    id: '1-1', 
    name: '1st Year, 1st Semester', 
    icon: '🎓',
    description: 'Foundation courses and introductory engineering concepts',
    subjects: ['Physics', 'Chemistry', 'Math', 'Intro to Engineering']
  },
  { 
    id: '1-2', 
    name: '1st Year, 2nd Semester', 
    icon: '📚',
    description: 'Core fundamental studies in engineering principles',
    subjects: ['Calculus', 'Mechanics', 'Graphics', 'Programming']
  },
  { 
    id: '2-1', 
    name: '2nd Year, 1st Semester', 
    icon: '📐',
    description: 'Intermediate engineering and specialized topics',
    subjects: ['Structures', 'Materials', 'Fluid Mechanics', 'Surveying']
  },
  { 
    id: '2-2', 
    name: '2nd Year, 2nd Semester', 
    icon: '✏️',
    description: 'Advanced theoretical concepts and applications',
    subjects: ['Soil Mechanics', 'Hydraulics', 'Construction', 'Design']
  },
  { 
    id: '3-1', 
    name: '3rd Year, 1st Semester', 
    icon: '🧮',
    description: 'Specialized civil engineering disciplines',
    subjects: ['Structural Analysis', 'Geotechnical', 'Transportation', 'Environment']
  },
  { 
    id: '3-2', 
    name: '3rd Year, 2nd Semester', 
    icon: '📏',
    description: 'Applied engineering and project planning',
    subjects: ['Concrete Design', 'Steel Design', 'Water Resources', 'Highway Engineering']
  },
  { 
    id: '4-1', 
    name: '4th Year, 1st Semester', 
    icon: '🔧',
    description: 'Advanced design and specialized applications',
    subjects: ['Advanced Structures', 'Foundation Engineering', 'Urban Planning', 'Management']
  },
  { 
    id: '4-2', 
    name: '4th Year, 2nd Semester', 
    icon: '🏗️',
    description: 'Capstone projects and professional preparation',
    subjects: ['Design Project', 'Professional Ethics', 'Construction Management', 'Research']
  },
];

export default function SemesterGrid() {
  const [animatedCards, setAnimatedCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedCards(prev => [...prev, entry.target.getAttribute('data-id')]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    document.querySelectorAll('.semester-card').forEach(card => {
      observer.observe(card);
    });

    return () => {
      document.querySelectorAll('.semester-card').forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="semesters" className="relative py-24 px-6 bg-white dark:bg-gray-900">
      {/* SVG Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <svg className="svg-background w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <pattern id="blueprint-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
            <circle cx="15" cy="15" r="2" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="bg-primary/10 text-primary dark:text-blue-400 text-sm font-medium py-1 px-3 rounded-full">
            CENTRALIZED RESOURCES
          </span>
          <h2 className="text-4xl font-bold text-primary dark:text-blue-400 mt-4 mb-4">All Semester Resources</h2>
          <p className="text-gray-700 dark:text-gray-300 text-xl max-w-2xl mx-auto">
            Access all your academic resources organized by semester with just one click
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {semesters.map((semester, index) => (
            <div
              key={semester.id}
              data-id={semester.id}
              onMouseEnter={() => setHoveredCard(semester.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`semester-card bg-card-bg dark:bg-gray-800 border-2 ${
                hoveredCard === semester.id 
                  ? 'border-accent shadow-accent/20' 
                  : 'border-gray-200 dark:border-gray-700'
              } rounded-xl overflow-hidden shadow-lg ${
                animatedCards.includes(semester.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transition: `all 0.5s ease-out ${index * 0.1}s`
              }}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{semester.icon}</span>
                  <h3 className="text-xl font-bold text-primary dark:text-blue-400">{semester.name}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  {semester.description}
                </p>
                
                <div className="mb-6 flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {semester.subjects.map(subject => (
                      <span 
                        key={subject} 
                        className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 text-xs py-1 px-2 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link 
                  href={`/semester/${semester.id}`}
                  className={`mt-auto py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    hoveredCard === semester.id
                      ? 'bg-accent text-white'
                      : 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400'
                  }`}
                >
                  <span>View Resources</span>
                  <svg className={`ml-2 w-5 h-5 transition-transform ${
                    hoveredCard === semester.id ? 'translate-x-1' : ''
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Can't find what you're looking for? <a href="#contact" className="text-accent hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
}