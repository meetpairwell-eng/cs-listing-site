import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                {/* Logo - Agent Initials */}
                <div className="navbar-logo">
                    <span className="logo-initials">{SITE_CONFIG.agentInitials}</span>
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
                    <li><a onClick={() => scrollToSection('about')}>ABOUT</a></li>
                    <li><a onClick={() => scrollToSection('listings')}>PROPERTIES</a></li>
                    <li><a onClick={() => scrollToSection('services')}>SERVICES</a></li>
                    <li><a onClick={() => scrollToSection('contact')}>LET'S CONNECT</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
