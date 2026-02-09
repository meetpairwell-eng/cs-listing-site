import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import OptimizedImage from './common/OptimizedImage';
import './Hero.css';
import { useState } from 'react';

const Hero = ({ onContactClick }) => {
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

            {/* Mobile Image (Visible on small screens via CSS) */}
            <OptimizedImage
                src={SITE_CONFIG.heroMobileImage}
                alt="Hero background"
                className="hero-mobile-bg"
                isHero={true}
            />

            {/* Fallback gradient if video fails */}
            {videoError && <div className="hero-video-fallback"></div>}

            {/* Content Area - Single Centered Column */}
            <div className="container hero-container">
                <div className="hero-main-stack">
                    <h1 className="hero-name">{SITE_CONFIG.agentName.toUpperCase()}</h1>
                    <p className="hero-subtitle">REAL ESTATE EXPERT</p>
                    <div className="hero-actions">
                        <button onClick={onContactClick} className="btn-hero">
                            LET'S CONNECT
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
