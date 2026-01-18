import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import './AboutCole.css';

const AboutCole = () => {
    // Helper to get media URL - supports both R2 and fallback URLs
    const getMediaUrl = (r2Path, fallbackUrl) => {
        if (r2Path && SITE_CONFIG.mediaBaseUrl) {
            return `${SITE_CONFIG.mediaBaseUrl}/${r2Path}`;
        }
        return fallbackUrl;
    };

    const keyHighlights = [
        {
            icon: '🏆',
            title: 'Award-Winning Service',
            description: 'Recognized excellence in real estate'
        },
        {
            icon: '💼',
            title: 'Market Expertise',
            description: 'Deep knowledge of Dallas luxury market'
        },
        {
            icon: '🤝',
            title: 'Client-First Approach',
            description: 'Personalized service for every client'
        },
        {
            icon: '📊',
            title: 'Proven Track Record',
            description: 'Millions in successful transactions'
        },
        {
            icon: '🏘️',
            title: 'Neighborhood Specialist',
            description: 'Expert in Dallas premier communities'
        },
        {
            icon: '⭐',
            title: 'Five-Star Reviews',
            description: 'Consistently top-rated by clients'
        }
    ];

    const galleryImages = [
        {
            r2Path: 'about/gallery-1.jpg',
            fallback: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
            alt: 'Professional headshot'
        },
        {
            r2Path: 'about/gallery-2.jpg',
            fallback: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
            alt: 'Luxury property showcase'
        },
        {
            r2Path: 'about/gallery-3.jpg',
            fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            alt: 'Client consultation'
        },
        {
            r2Path: 'about/gallery-4.jpg',
            fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            alt: 'Property interior'
        }
    ];

    return (
        <div className="about-cole-page">
            {/* Hero Section */}
            <section className="cole-hero">
                <div className="container">
                    <div className="cole-hero-grid">
                        <div className="cole-hero-content">
                            <h1 className="cole-hero-title">Meet Cole Swearingen</h1>
                            <p className="cole-hero-subtitle">
                                Your trusted partner in Dallas luxury real estate. With a passion for excellence
                                and a commitment to personalized service, I help clients navigate the market
                                with confidence and achieve their real estate goals.
                            </p>
                            <Link to="/contact" className="btn-primary">Let's Connect</Link>
                        </div>
                        <div className="cole-hero-image">
                            <img
                                src={getMediaUrl('about/hero-image.jpg', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80')}
                                alt="Luxury home"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Content Section */}
            <section className="cole-about-content">
                <div className="container">
                    <div className="cole-about-grid">
                        <div className="cole-about-text">
                            <h2>About Cole</h2>
                            <p>
                                As a dedicated real estate professional with Compass, I bring a unique blend of
                                market expertise, innovative marketing strategies, and unwavering commitment to
                                client success. My approach is built on understanding your unique needs and
                                delivering results that exceed expectations.
                            </p>
                            <p>
                                With years of experience in the Dallas luxury market, I've developed deep
                                relationships within the community and an intimate knowledge of the area's most
                                desirable neighborhoods. Whether you're buying your dream home or selling a
                                cherished property, I provide the guidance and support you need every step of
                                the way.
                            </p>
                            <p>
                                My commitment to excellence has earned recognition from clients and peers alike.
                                I believe in transparent communication, strategic thinking, and going above and
                                beyond to ensure your real estate journey is smooth and successful.
                            </p>
                            <Link to="/contact" className="btn-secondary">Get in Touch</Link>
                        </div>
                        <div className="cole-about-image">
                            <img
                                src={getMediaUrl('about/about-image.jpg', 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80')}
                                alt="Cole Swearingen professional"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Highlights Section */}
            <section className="cole-highlights">
                <div className="container">
                    <h2 className="section-title">Why Work With Me</h2>
                    <div className="highlights-grid">
                        {keyHighlights.map((highlight, index) => (
                            <div key={index} className="highlight-card">
                                <div className="highlight-icon">{highlight.icon}</div>
                                <h3 className="highlight-title">{highlight.title}</h3>
                                <p className="highlight-description">{highlight.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="cole-gallery">
                <div className="container">
                    <h2 className="section-title">A Glimpse Into My Work</h2>
                    <p className="gallery-subtitle">Showcasing excellence in every transaction</p>
                    <div className="gallery-grid">
                        {galleryImages.map((image, index) => (
                            <div key={index} className="gallery-item">
                                <img
                                    src={getMediaUrl(image.r2Path, image.fallback)}
                                    alt={image.alt}
                                    onError={(e) => {
                                        e.target.src = image.fallback;
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutCole;
