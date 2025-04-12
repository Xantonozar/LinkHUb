'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const semesters = [
  { id: '1-1', name: '1st Year, 1st Semester', link: '/semester/1-1', available: true },
  { id: '1-2', name: '1st Year, 2nd Semester', link: '/semester/1-2', available: false },
  { id: '2-1', name: '2nd Year, 1st Semester', link: '/semester/2-1', available: false },
  { id: '2-2', name: '2nd Year, 2nd Semester', link: '/semester/2-2', available: false },
  { id: '3-1', name: '3rd Year, 1st Semester', link: '/semester/3-1', available: false },
  { id: '3-2', name: '3rd Year, 2nd Semester', link: '/semester/3-2', available: false },
  { id: '4-1', name: '4th Year, 1st Semester', link: '/semester/4-1', available: false },
  { id: '4-2', name: '4th Year, 2nd Semester', link: '/semester/4-2', available: false },
];

// Social media links
const socialLinks = {
  github: 'https://github.com/yourusername/civil-engineering-hub',
  linkedin: 'https://linkedin.com/school/your-university',
  facebook: 'https://facebook.com/your-university-engineering-department',
  twitter: 'https://twitter.com/your-university-engineering',
};

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSemesterGroup, setActiveSemesterGroup] = useState(null);
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  
  // Handle scroll behavior for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu on window resize (to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      
      if (modalRef.current && !modalRef.current.contains(event.target) && showUnavailableModal) {
        setShowUnavailableModal(false);
      }
    };

    if (dropdownOpen || showUnavailableModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, showUnavailableModal]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Group semesters by year
  const semestersByYear = {
    '1': semesters.filter(s => s.id.startsWith('1-')),
    '2': semesters.filter(s => s.id.startsWith('2-')),
    '3': semesters.filter(s => s.id.startsWith('3-')),
    '4': semesters.filter(s => s.id.startsWith('4-')),
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close dropdown if mobile menu is being closed
    if (mobileMenuOpen) setDropdownOpen(false);
  };
  
  const toggleSemesterGroup = (year) => {
    if (activeSemesterGroup === year) {
      setActiveSemesterGroup(null);
    } else {
      setActiveSemesterGroup(year);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const handleSemesterClick = (semester, e) => {
    if (!semester.available) {
      e.preventDefault();
      setSelectedSemester(semester);
      setShowUnavailableModal(true);
      return false;
    }
    
    setDropdownOpen(false);
    // If it's available, the Link component will handle the navigation
  };

  return (
    <nav 
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
        scrolled 
          ? 'bg-slate-900/90 py-3 px-4 shadow-xl' 
          : 'bg-transparent py-5 px-6'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-white font-bold text-xl transition-all hover:text-purple-400 flex items-center group"
        >
          <div className="w-10 h-10 mr-3 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-lg flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-purple-500/40 transition-all duration-300">
            <svg className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <span className="whitespace-nowrap">Civil Engineering Hub</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className="nav-link text-white/90 hover:text-white relative py-2 overflow-hidden group"
          >
            <span className="relative z-10 font-medium">Home</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleDropdown}
              className="nav-link text-white/90 hover:text-white flex items-center focus:outline-none py-2 relative group overflow-hidden"
            >
              <span className="relative z-10 font-medium">Semesters</span>
              <svg 
                className={`ml-1 w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
            
            {dropdownOpen && (
              <div 
                className="absolute top-full mt-2 -left-4 w-[650px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl py-4 px-6 z-50 grid grid-cols-4 gap-4 border border-slate-700 backdrop-blur-lg"
              >
                {Object.entries(semestersByYear).map(([year, yearSemesters]) => (
                  <div key={year} className="space-y-2">
                    <h3 className="text-purple-400 text-sm font-semibold mb-2">Year {year}</h3>
                    {yearSemesters.map((semester) => (
                      <Link
                        key={semester.id}
                        href={semester.available ? semester.link : "#"}
                        className={`block px-3 py-2 text-sm ${semester.available ? 'text-white/80 hover:text-white hover:bg-purple-900/30' : 'text-white/50 hover:text-white/70 hover:bg-purple-900/20'} rounded-lg transition-all duration-200`}
                        onClick={(e) => handleSemesterClick(semester, e)}
                      >
                        {semester.name.split(',')[1]}
                        {!semester.available && (
                          <span className="ml-2 px-1.5 py-0.5 text-[10px] font-semibold bg-gray-700/50 rounded text-gray-300">SOON</span>
                        )}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Link 
            href="/about" 
            className="nav-link text-white/90 hover:text-white relative py-2 overflow-hidden group"
          >
            <span className="relative z-10 font-medium">About</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          
          <Link 
            href="/contact"
            className="nav-link text-white/90 hover:text-white relative py-2 overflow-hidden group"
          >
            <span className="relative z-10 font-medium">Contact</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          
          <a 
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.481C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
            GitHub
          </a>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
           
            className="text-white focus:outline-none z-50 relative"
            aria-label="Toggle mobile menu"
          >
            <div className={`w-6 h-6 flex flex-col justify-center items-center relative`}>
              <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ease-out ${mobileMenuOpen ? 'absolute rotate-45' : 'mb-1.5'}`}></span>
              <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ease-out ${mobileMenuOpen ? 'opacity-0' : 'mb-1.5'}`}></span>
              <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ease-out ${mobileMenuOpen ? 'absolute -rotate-45' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-slate-900/95 backdrop-blur-md z-40 md:hidden transition-all duration-500 ease-in-out ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="container mx-auto px-6 pt-24 pb-16 h-full overflow-y-auto flex flex-col">
          <div className="space-y-6">
            <Link 
              href="/" 
              className="block text-white text-xl font-medium py-3 border-b border-gray-700/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <div>
              <button 
                className="flex items-center justify-between w-full text-white text-xl font-medium py-3 border-b border-gray-700/50"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>Semesters</span>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {dropdownOpen && (
                <div className="py-3 pl-4 space-y-4">
                  {Object.entries(semestersByYear).map(([year, yearSemesters]) => (
                    <div key={year} className="space-y-1">
                      <button 
                        className="flex items-center justify-between w-full text-white/80 text-base font-medium py-2"
                        onClick={() => toggleSemesterGroup(year)}
                      >
                        <span>Year {year}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-300 ${activeSemesterGroup === year ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                      
                      {activeSemesterGroup === year && (
                        <div className="pl-4 space-y-2 pt-1 pb-2">
                          {yearSemesters.map((semester) => (
                            <Link
                              key={semester.id}
                              href={semester.available ? semester.link : "#"}
                              className={`flex items-center text-sm ${semester.available ? 'text-white/70 hover:text-white' : 'text-white/50 hover:text-white/70'} py-1.5`}
                              onClick={(e) => {
                                handleSemesterClick(semester, e);
                                if (semester.available) setMobileMenuOpen(false);
                              }}
                            >
                              {semester.name.split(',')[1]}
                              {!semester.available && (
                                <span className="ml-2 px-1.5 py-0.5 text-[10px] font-semibold bg-gray-700/50 rounded text-gray-300">SOON</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              href="/about" 
              className="block text-white text-xl font-medium py-3 border-b border-gray-700/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <Link 
              href="/contact" 
              className="block text-white text-xl font-medium py-3 border-b border-gray-700/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          
          <div className="mt-auto pt-8">
            <a 
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.481C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>
              GitHub
            </a>
            
            <div className="flex justify-center space-x-6 mt-8">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transform hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.481C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
                </svg>
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transform hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"></path>
                </svg>
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transform hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Unavailable Semester Modal */}
      {showUnavailableModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-6 max-w-md w-full border border-slate-700 transform transition-all"
            style={{ animation: 'popIn 0.3s forwards' }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-white/70 mb-6">
                {selectedSemester?.name} resources are not yet available. We're working on adding them soon!
              </p>
              <button
                onClick={() => setShowUnavailableModal(false)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </nav>
  );
} 