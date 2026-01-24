import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import './Hero.css';
import { useState } from 'react';

const Hero = () => {
    const videoUrl = `${SITE_CONFIG.mediaBaseUrl}/${SITE_CONFIG.heroVideo}`;
    const [videoError, setVideoError] = useState(false);

    const handleVideoError = (e) => {
        console.error('❌ Hero video failed to load:', videoUrl);
        console.error('Error details:', e);
        setVideoError(true);
    };

    return (
        <section id="home" className="hero">
            {/* Video Background */}
            {!videoError && (
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={handleVideoError}
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
            )}

            {/* Mobile Image (Visible on small screens via CSS) - ALways render */}
            <img
                src={`${SITE_CONFIG.mediaBaseUrl}/${SITE_CONFIG.heroMobileImage}`}
                alt="Hero background"
                className="hero-mobile-bg"
                onError={(e) => {
                    // Fallback to high-quality unsplash if custom image fails
                    e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80';
                }}
            />

            {/* Fallback gradient if video fails */}
            {videoError && <div className="hero-video-fallback"></div>}

            {/* Content Area - Single Centered Column */}
            <div className="container hero-container">
                <div className="hero-main-stack">
                    <h1 className="hero-name">{SITE_CONFIG.agentName.toUpperCase()}</h1>
                    <p className="hero-subtitle">REAL ESTATE EXPERT</p>
                    <div className="hero-actions">
                        <Link to="/search" className="btn-hero">
                            SEARCH HOMES
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
