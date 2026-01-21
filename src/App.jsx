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
import HomeValuation from './pages/HomeValuation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutCole from './pages/AboutCole';
import APITestPage from './pages/APITestPage';
import PropertyDetails from './pages/PropertyDetails';
import PropertyPhotoGrid from './pages/PropertyPhotoGrid';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// Home Page Component
const HomePage = ({ onContactClick }) => (
  <>
    <Hero />
    <Services onContactClick={onContactClick} />
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
      <ScrollToTop />
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

          {/* Home Valuation */}
          <Route
            path="/home-valuation"
            element={
              <>
                <HomeValuation onContactClick={() => setIsContactModalOpen(true)} />
                <Footer />
              </>
            }
          />

          {/* Privacy Policy */}
          <Route
            path="/privacy-policy"
            element={
              <>
                <PrivacyPolicy />
                <Footer />
              </>
            }
          />

          {/* About Cole */}
          <Route
            path="/about-cole"
            element={
              <>
                <AboutCole />
                <Footer />
              </>
            }
          />

          {/* Property Details */}
          <Route
            path="/property/:id"
            element={
              <>
                <PropertyDetails />
                <Footer />
              </>
            }
          />

          {/* Property Photo Grid */}
          <Route
            path="/property/:id/photos"
            element={
              <>
                <PropertyPhotoGrid />
                <Footer />
              </>
            }
          />

          {/* API Test Page */}
          <Route
            path="/api-test"
            element={
              <>
                <APITestPage />
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
