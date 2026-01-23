import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import { SITE_CONFIG } from '../config';
import './Navbar.css';

const Navbar = ({ onContactClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { favoritesCount } = useFavorites();

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
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation then scroll
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

    const handleLogoClick = () => {
        setMobileMenuOpen(false);
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const isSearchPage = location.pathname === '/search';
    const isFavoritesPage = location.pathname === '/favorites';
    const isPhotoGridPage = location.pathname.includes('/photos');

    return (
        <nav className={`navbar ${scrolled || isSearchPage || isFavoritesPage || isPhotoGridPage ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                {/* Logo - Agent Initials */}
                <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
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
                    <li><Link to="/about-cole" onClick={closeMobileMenu}>MEET COLE</Link></li>
                    <li>
                        <Link to="/properties" onClick={closeMobileMenu}>PROPERTIES</Link>
                    </li>
                    <li>
                        <Link to="/search" onClick={closeMobileMenu}>HOME SEARCH</Link>
                    </li>
                    <li>
                        <Link to="/home-valuation" onClick={closeMobileMenu}>HOME VALUATION</Link>
                    </li>
                    <li><a onClick={handleContactClick}>LET'S CONNECT</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
