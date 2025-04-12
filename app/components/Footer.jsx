export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Civil Engineering Hub</h3>
            <p className="text-white/80 mb-4">
              Your centralized platform for civil engineering academic resources.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/80 hover:text-white hover:underline transition-all">Home</a></li>
              <li><a href="#semesters" className="text-white/80 hover:text-white hover:underline transition-all">Semesters</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white hover:underline transition-all">About</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white hover:underline transition-all">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-white/80 mb-2">Civil Engineering Department</p>
            <p className="text-white/80 mb-2">Email: civil.engineering@university.edu</p>
            <p className="text-white/80">Phone: +123 456 7890</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Civil Engineering Department. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 