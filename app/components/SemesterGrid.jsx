'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Updated semester data based on the Bulletin 2023 (July 2023) for the B.Sc. in Civil Engineering.
// The subjects below are selected to represent core and mandatory courses for each semester.
const semesters = [
  {
    id: '1-1',
    name: '1st Year, 1st Semester',
    icon: '🎓',
    description: 'Fundamental science and introductory engineering concepts including mechanics, mathematics, and technical drawing.',
    subjects: [
      'CE 1101: Engineering Mechanics',
      'Math 1101: Mathematics – I',
      'Phy 1101: Physics – I',
      'Chem 1101: Chemistry – I',
      'EEE 1131: Basic Electrical Technology',
      'CE 1100: Civil Engineering Drawing'
    ]
  },
  {
    id: '1-2',
    name: '1st Year, 2nd Semester',
    icon: '📚',
    description: 'Introduction to surveying, advanced mathematics, communication skills, and computer aided drafting with laboratory work.',
    subjects: [
      'CE 1201: Surveying',
      'Math 1201: Mathematics – II',
      'Hum 1201: Economics',
      'Hum 1203: English',
      'CSE 1231: Numerical Methods & Computer Programming',
      'CE 1200: Computer Aided Drafting',
      'CE 1202: Practical Surveying',
      'Phy 1202: Physics Lab',
      'CSE 1232: Numerical Methods & Comp. Prog. Lab'
    ]
  },
  {
    id: '2-1',
    name: '2nd Year, 1st Semester',
    icon: '📐',
    description: 'Fundamentals of engineering materials, solid mechanics, and geospatial techniques along with communication lab work.',
    subjects: [
      'CE 2101: Engineering Materials',
      'CE 2111: Mechanics of Solids – I',
      'Math 2101: Mathematics – III',
      'Hum 2101: Accounting',
      'Hum 2103: History of Independent Bangladesh',
      'CE 2102: Engineering Materials Sessional',
      'CE 2104: GIS & Remote Sensing Lab',
      'CE 2112: Mechanics of Solids Sessional',
      'Hum 2102: English Communication Lab'
    ]
  },
  {
    id: '2-2',
    name: '2nd Year, 2nd Semester',
    icon: '✏️',
    description: 'Further exploration of soil, fluid, and structural fundamentals with courses in geology, construction details, and surveying techniques.',
    subjects: [
      'CE 2201: Engineering Geology & Geomorphology',
      'CE 2211: Mechanics of Solids – II',
      'CE 2271: Mechanics of Fluids',
      'Math 2201: Mathematics – IV',
      'Hum 2201: Society and Ethics',
      'CE 2200: Details of Constructions',
      'CE 2202: Quantity Surveying',
      'CE 2272: Mechanics of Fluids Sessional'
    ]
  },
  {
    id: '3-1',
    name: '3rd Year, 1st Semester',
    icon: '🧮',
    description: 'Introduction to structural design, environmental engineering, geotechnical principles, and hydrology through both theoretical and lab sessions.',
    subjects: [
      'CE 3111: Structural Analysis & Design – I',
      'CE 3112: Structural Analysis Sessional – I',
      'CE 3113: Design of Concrete Structures – I',
      'CE 3131: Environmental Engineering – I',
      'CE 3141: Geotechnical Engineering – I',
      'CE 3171: Engineering Hydrology'
    ]
  },
  {
    id: '3-2',
    name: '3rd Year, 2nd Semester',
    icon: '📏',
    description: 'Advanced analysis and design with additional focus on concrete structures, transportation fundamentals, and open channel flow studies.',
    subjects: [
      'CE 3211: Structural Analysis & Design – II',
      'CE 3213: Design of Concrete Structures – II',
      'CE 3231: Environmental Engineering – II',
      'CE 3251: Transportation Engineering – I',
      'CE 3271: Open Channel Flow',
      'CE 3212: Design of Concrete Structures Sessional',
      'CE 3214: Computer Aided Analysis & Design of Structures',
      'CE 3272: Open Channel Flow Sessional'
    ]
  },
  {
    id: '4-1',
    name: '4th Year, 1st Semester',
    icon: '🔧',
    description: 'Capstone semester with thesis and project work, deepening of advanced structural, geotechnical, and transportation design skills, and professional practice.',
    subjects: [
      'CE 4000: Thesis',
      'CE 4060: Capstone Project',
      'CE 4103: Professional Practices & Communication Skills',
      'CE 4111: Structural Analysis & Design – III',
      'CE 4113: Pre-stressed Concrete',
      'CE 4141: Geotechnical Engineering – II (Foundation Engineering)',
      'CE 4151: Transportation Engineering – II',
      'CE 4112: Design of Concrete Structures Sessional – II',
      'CE 4152: Transportation Engineering Sessional – I'
    ]
  },
  {
    id: '4-2',
    name: '4th Year, 2nd Semester',
    icon: '🏗️',
    description: 'Final integration semester emphasizing project planning, steel structure design, and interdisciplinary appreciation, with optional courses to refine specialized skills.',
    subjects: [
      'CE 4000: Thesis',
      'CE 4060: Capstone Project',
      'CE 4201: Project Planning & Construction Management',
      'CE 4211: Design of Steel Structures',
      'CE 4202: Architectural, Engineering & Planning Appreciation',
      // Note: Additional division‐wise optional courses (e.g. environmental, geotechnical, transportation, water resources) are available.
      'Optional: CE 4203/CE 4205 or Division‐wise electives'
    ]
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
          <h2 className="text-4xl font-bold text-primary dark:text-blue-400 mt-4 mb-4">
            All Semester Resources
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-xl max-w-2xl mx-auto">
            Explore academic resources organized by semester, reflecting the updated Bulletin 2023 curriculum.
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
              style={{ transition: `all 0.5s ease-out ${index * 0.1}s` }}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{semester.icon}</span>
                  <h3 className="text-xl font-bold text-primary dark:text-blue-400">
                    {semester.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  {semester.description}
                </p>
                <div className="mb-6 flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {semester.subjects.map((subject) => (
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
                  <svg
                    className={`ml-2 w-5 h-5 transition-transform ${
                      hoveredCard === semester.id ? 'translate-x-1' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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