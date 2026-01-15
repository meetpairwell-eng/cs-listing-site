import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import FeaturedListings from './components/FeaturedListings';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ContactModal from './components/ContactModal';
import FloatingContactButton from './components/FloatingContactButton';
import PropertySearch from './modules/property-search/PropertySearch';
import FeaturedProperties from './pages/FeaturedProperties';
import Favorites from './pages/Favorites';
import Footer from './components/Footer';
import './App.css';

// Home Page Component
const HomePage = ({ onContactClick }) => (
  <>
    <Hero />
    <Services />
    <About />
    <FeaturedListings />
    <Testimonials />
    <Contact onContactClick={onContactClick} />
    <Footer />
  </>
);

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar onContactClick={() => setIsContactModalOpen(true)} />

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <HomePage
                onContactClick={() => setIsContactModalOpen(true)}
              />
            }
          />

          {/* Property Search */}
          <Route path="/search" element={<PropertySearch />} />

          {/* Featured Properties */}
          <Route
            path="/properties"
            element={
              <>
                <FeaturedProperties />
                <Footer />
              </>
            }
          />

          {/* Favorites */}
          <Route
            path="/favorites"
            element={
              <>
                <Favorites />
                <Footer />
              </>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <FloatingContactButton onClick={() => setIsContactModalOpen(true)} />

        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
