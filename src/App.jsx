import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import FeaturedListings from './components/FeaturedListings';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ContactModal from './components/ContactModal';
import FloatingContactButton from './components/FloatingContactButton';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="App">
      <Navbar onContactClick={() => setIsContactModalOpen(true)} />
      <Hero />
      <Services />
      <About />
      <FeaturedListings />
      <Testimonials />
      <Contact onContactClick={() => setIsContactModalOpen(true)} />
      <Footer />

      <FloatingContactButton onClick={() => setIsContactModalOpen(true)} />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}

export default App;
