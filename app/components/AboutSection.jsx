'use client';

import { useEffect, useRef } from 'react';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === textRef.current) {
              entry.target.classList.add('animate-slideUp');
            }
            if (entry.target === imageRef.current) {
              entry.target.classList.add('animate-fadeIn');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary dark:text-blue-400 mb-4">Our Purpose</h2>
          <p className="text-gray-700 dark:text-gray-300 text-xl max-w-3xl mx-auto">
            Simplifying access to educational resources for engineering excellence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div 
            ref={textRef}
            className="opacity-0"
            style={{ transition: 'all 1s ease-out' }}
          >
            <h3 className="text-3xl font-bold text-primary dark:text-blue-400 mb-6">About Our Resource Hub</h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              The Civil Engineering Resource Hub was created with a clear mission: to eliminate the challenges 
              students face when trying to locate semester-specific academic materials. By centralizing all resources 
              in one accessible platform, we're empowering future engineers to focus on learning rather than searching.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Our platform organizes vital learning materials including lecture notes, past papers, assignments, 
              and supplementary readings by semester (1-1 through 4-2), creating a seamless educational journey 
              throughout your civil engineering program.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
              Developed by civil engineering students for civil engineering students, this hub addresses the specific 
              needs of our department while maintaining an intuitive, user-friendly interface that makes resource 
              discovery effortless.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="border-l-4 border-accent pl-4">
                <p className="text-primary dark:text-blue-400 font-bold">Organized by Semester</p>
                <p className="text-gray-700 dark:text-gray-300">Logical categorization for easy navigation through your academic journey</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <p className="text-primary dark:text-blue-400 font-bold">Updated Regularly</p>
                <p className="text-gray-700 dark:text-gray-300">Fresh resources added as they become available from instructors</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <p className="text-primary dark:text-blue-400 font-bold">One-Click Access</p>
                <p className="text-gray-700 dark:text-gray-300">Direct links to drive folders and documents without complex navigation</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <p className="text-primary dark:text-blue-400 font-bold">Community Driven</p>
                <p className="text-gray-700 dark:text-gray-300">Built and maintained by students who understand your needs</p>
              </div>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="opacity-0 relative h-[500px] rounded-xl overflow-hidden shadow-xl"
            style={{ transition: 'all 1s ease-out 0.3s' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <div className="text-7xl mb-6">🏗️</div>
                <h3 className="text-3xl font-bold mb-4">Civil Engineering Excellence</h3>
                <p className="text-white text-lg mb-6">Building the future through knowledge sharing</p>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/20 p-4 rounded-lg">
                    <div className="text-3xl mb-2">📚</div>
                    <p className="font-bold">8 Semesters</p>
                    <p className="text-white">Comprehensive coverage</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <div className="text-3xl mb-2">📝</div>
                    <p className="font-bold">Course Materials</p>
                    <p className="text-white">Notes, slides & more</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <div className="text-3xl mb-2">🧪</div>
                    <p className="font-bold">Lab Resources</p>
                    <p className="text-white">Practical guidance</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <div className="text-3xl mb-2">📊</div>
                    <p className="font-bold">Past Papers</p>
                    <p className="text-white">Exam preparation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 