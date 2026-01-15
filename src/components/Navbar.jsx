import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config';
import './Navbar.css';

const Navbar = ({ onContactClick, onSearchClick, onHomeClick, onPropertiesClick, currentView }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (mobileMenuOpen && !e.target.closest('.navbar')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileMenuOpen]);

    const scrollToSection = (id) => {
        if (currentView !== 'home') {
            onHomeClick();
            // Wait for view to switch then scroll
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setMobileMenuOpen(false);
    };

    const handleContactClick = () => {
        setMobileMenuOpen(false);
        onContactClick();
    };

    const handleSearchClick = () => {
        setMobileMenuOpen(false);
        onSearchClick();
    };

    const handleHomeClick = () => {
        setMobileMenuOpen(false);
        onHomeClick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePropertiesClick = () => {
        setMobileMenuOpen(false);
        onPropertiesClick();
    };

    return (
        <nav className={`navbar ${scrolled || currentView === 'search' ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                {/* Logo - Agent Initials */}
                <div className="navbar-logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
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
                    <li><a onClick={handlePropertiesClick}>PROPERTIES</a></li>
                    <li><a onClick={handleSearchClick}>HOME SEARCH</a></li>
                    <li><a onClick={() => scrollToSection('services')}>SERVICES</a></li>
                    <li><a onClick={handleContactClick}>LET'S CONNECT</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
