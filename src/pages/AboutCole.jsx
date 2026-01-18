import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import ContactModal from '../components/ContactModal';
import './AboutCole.css';

const AboutCole = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // Helper to get media URL - supports both R2 and fallback URLs
    const getMediaUrl = (r2Path, fallbackUrl) => {
        if (r2Path && SITE_CONFIG.mediaBaseUrl) {
            return `${SITE_CONFIG.mediaBaseUrl}/${r2Path}`;
        }
        return fallbackUrl;
    };

    const keyHighlights = [
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 15l-2 5L7 8l5 2 5-2-3 12-2-5z" />
                    <circle cx="12" cy="12" r="10" />
                </svg>
            ),
            title: 'Award-Winning Service',
            description: 'Recognized excellence in real estate'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
            ),
            title: 'Market Expertise',
            description: 'Deep knowledge of Dallas luxury market'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            title: 'Client-First Approach',
            description: 'Personalized service for every client'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            ),
            title: 'Proven Track Record',
            description: 'Millions in successful transactions'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            ),
            title: 'Neighborhood Specialist',
            description: 'Expert in Dallas premier communities'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ),
            title: 'Five-Star Reviews',
            description: 'Consistently top-rated by clients'
        }
    ];

    const showcaseItems = [
        {
            r2Path: 'about/showcase-1.jpg',
            fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80',
            title: 'Luxury Property Marketing',
            description: 'Expertly crafted marketing strategies that showcase your property\'s unique features and attract qualified buyers in the Dallas luxury market.'
        },
        {
            r2Path: 'about/showcase-2.jpg',
            fallback: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1000&q=80',
            title: 'White-Glove Client Service',
            description: 'Personalized attention and seamless communication throughout every step of your real estate journey, ensuring a stress-free experience.'
        },
        {
            r2Path: 'about/showcase-3.jpg',
            fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
            title: 'Market Expertise & Results',
            description: 'Deep knowledge of Dallas neighborhoods combined with proven negotiation skills to achieve exceptional results for my clients.'
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
                                Born and raised in Dallas, Cole Swearingen offers an insider's mastery of the DFW Metroplex that few can match. His professional foundation as a Sales Director for the nation's largest hospitality firm instilled in him a client-first philosophy, but his performance over the last several years has cemented his reputation as one of the region's most resilient and sought-after advisors.
                            </p>
                            <p>
                                Since joining Compass and the Laguna Residential Group in 2018, Cole has excelled in market conditions that many found insurmountable. While the industry navigated the volatility of the pandemic and the pressure of shifting interest rates, Cole's business thrived. He became a trusted anchor for his clients during these challenging cycles, proving that a disciplined, data-driven approach yields results regardless of the economic climate.
                            </p>
                            <p>
                                His track record speaks for itself, with a portfolio of record-breaking sales that spans the most prestigious enclaves of the city, from the timeless estates of Highland Park and Lakewood to the rapidly expanding luxury landscapes of Frisco and Richardson. Cole's ability to identify value in both established and emerging markets allows him to guide his clients toward opportunities that others might overlook.
                            </p>
                            <p>
                                Beyond the transaction, Cole's technical expertise is bolstered by deep-rooted connections with Dallas' most respected builders and award-winning designers. This knowledge allows him to see beyond the aesthetic, understanding the craftsmanship and structural integrity that define a truly elite property.
                            </p>
                            <p>
                                In a market where information is the ultimate advantage, Cole's collaboration with a tight-knit circle of top-producing agents ensures his clients have a front-row seat to the exclusive, off-market landscape. Whether he is navigating a high-stakes negotiation or consulting on a custom new build, Cole remains a tenacious advocate and a sophisticated guide in the Dallas market.
                            </p>
                            <button onClick={() => setIsContactModalOpen(true)} className="cole-cta-button">
                                GET IN TOUCH
                            </button>
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

            {/* Showcase Section */}
            <section className="cole-showcase">
                <div className="container">
                    <h2 className="section-title">A Glimpse Into My Work</h2>
                    <p className="gallery-subtitle">Showcasing excellence in every transaction</p>
                    <div className="showcase-list">
                        {showcaseItems.map((item, index) => (
                            <div key={index} className={`showcase-item ${index % 2 === 1 ? 'reverse' : ''}`}>
                                <div className="showcase-image">
                                    <img
                                        src={getMediaUrl(item.r2Path, item.fallback)}
                                        alt={item.title}
                                        onError={(e) => {
                                            e.target.src = item.fallback;
                                        }}
                                    />
                                </div>
                                <div className="showcase-content">
                                    <h3 className="showcase-title">{item.title}</h3>
                                    <p className="showcase-description">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </div>
    );
};

export default AboutCole;
