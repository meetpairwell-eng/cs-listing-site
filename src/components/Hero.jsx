import { SITE_CONFIG } from '../config';
import './Hero.css';

const Hero = () => {
    const videoUrl = `${SITE_CONFIG.mediaBaseUrl}/${SITE_CONFIG.heroVideo}`;

    return (
        <section id="home" className="hero">
            {/* Video Background */}
            <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={videoUrl} type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="hero-overlay"></div>

            {/* Content */}
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-name">{SITE_CONFIG.agentName.toUpperCase()}</h1>
                    <p className="hero-subtitle">LUXURY ESTATES AGENT</p>
                    <p className="hero-license">{SITE_CONFIG.agentLicense}</p>
                    <a href="#listings" className="btn-hero">
                        SEARCH HOMES
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
