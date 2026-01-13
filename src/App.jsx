import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import FeaturedListings from './components/FeaturedListings';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <FeaturedListings />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
