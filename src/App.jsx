import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Awards from './components/Awards';
import FeaturedListings from './components/FeaturedListings';
import Testimonials from './components/Testimonials';
import DesignEditorial from './components/DesignEditorial';
import Contact from './components/Contact';
import ContactModal from './components/ContactModal';
import FloatingContactButton from './components/FloatingContactButton';
import FeaturedProperties from './pages/FeaturedProperties';
import HomeValuation from './pages/HomeValuation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutCole from './pages/AboutCole';
import PropertyDetails from './pages/PropertyDetails';
import PropertyPhotoGrid from './pages/PropertyPhotoGrid';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// Component to handle /connect route
const ConnectPage = ({ onContactClick }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onContactClick();
    navigate('/', { replace: true });
  }, [onContactClick, navigate]);

  return null;
};

// Home Page Component
const HomePage = ({ onContactClick }) => (
  <>
    <Hero onContactClick={onContactClick} />
    <About />
    <Services onContactClick={onContactClick} />
    <FeaturedListings />
    <Testimonials />
    <DesignEditorial />
    <Contact onContactClick={onContactClick} />


    <Awards />
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

          {/* Connect / Contact Aliases */}
          <Route path="/connect" element={<ConnectPage onContactClick={() => setIsContactModalOpen(true)} />} />
          <Route path="/contact" element={<ConnectPage onContactClick={() => setIsContactModalOpen(true)} />} />

          {/* Portfolio (formerly Properties) */}
          <Route
            path="/properties"
            element={
              <>
                <FeaturedProperties />
                <Awards />
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
                <Awards />
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
                <Awards />
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
                <Awards />
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
                <Awards />
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
                <Awards />
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
