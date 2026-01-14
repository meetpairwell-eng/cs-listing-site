import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config';
import './FloatingContactButton.css';

const FloatingContactButton = ({ onClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling past hero section (typically 100vh)
            const heroHeight = window.innerHeight;
            setIsVisible(window.scrollY > heroHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <button className="floating-contact-btn" onClick={onClick} aria-label="Connect with Cole">
            <span className="floating-btn-text">LET'S CONNECT</span>
            <svg className="floating-btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L8 15M8 15L15 8M8 15L1 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
};

export default FloatingContactButton;
