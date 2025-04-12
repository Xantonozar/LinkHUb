import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SemesterGrid from './components/SemesterGrid';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <SemesterGrid />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
