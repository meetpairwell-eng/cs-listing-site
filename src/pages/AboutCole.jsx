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
        }
    ];

    const showcaseItems = [
        {
            r2Path: 'about/showcase-1.jpg',
            fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80',
            title: 'Reliable. Honest. Proven.',
            description: 'People trust Cole as a steady hand, especially when the market feels unpredictable. Whether interest rates are shifting or the economy is changing, he uses real data and honest, friendly communication to keep your home and your future safe. He is known for staying calm under pressure and being easy to work with, which makes a big difference when the process gets emotional. By staying closely connected to Dallas\' top agents, Cole makes sure his clients always have the best information and a clear advantage in our city\'s fast-moving market.'
        },
        {
            r2Path: 'about/showcase-2.jpg',
            fallback: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1000&q=80',
            title: 'Strategic Builder & Developer Partnerships',
            description: 'Cole acts as a technical partner in the new construction and luxury renovation space across the Dallas Metroplex. With extensive experience in ground-up development, he collaborates with builders on floor plan optimization to ensure every square foot aligns with current market demands. From interior design and landscaping to complex renovations, Cole provides the on-the-ground insight needed to curate a product that sells. For developers, he is a strategic asset who understands how to bridge the gap between architectural vision and a successful, high-yield closing.'
        },
        {
            r2Path: 'about/showcase-3.jpg',
            fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
            title: 'Exclusive Access & Insider Intelligence',
            description: 'Cole\'s deep-rooted connections with Dallas\' most prominent figures and top-tier agents put him at the center of the local real estate conversation. By staying active in these elite circles, he understands the private trends of the market and the people driving them. Whether it\'s a new development in Frisco or a shift in the Park Cities, Cole provides his clients with insider knowledge that is clear and helpful. This connected approach gives his clients a real advantage by helping them understand where the luxury market is headed before everyone else.'
        }
    ];

    return (
        <div className="about-cole-page">
            {/* Hero Section */}
            <section className="cole-hero">
                <div className="cole-hero-background">
                    <img
                        src={getMediaUrl('about/hero-image.jpg', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80')}
                        alt="Luxury home"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80';
                        }}
                    />
                    <div className="cole-hero-overlay"></div>
                </div>
                <div className="cole-hero-content">
                    <div className="container">
                        <h1 className="cole-hero-title">MEET COLE</h1>
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
                                A Dallas native with an insider's mastery of the DFW Metroplex, Cole Swearingen brings a sophisticated, hospitality-driven approach to every transaction. His professional foundation as a Sales Director for the nation's largest hospitality firm instilled in him a client-first philosophy that remains the bedrock of his business. Since joining Compass and the Laguna Residential Group in 2018, Cole has meticulously cultivated a reputation for precision and resilience, becoming a trusted advisor for those navigating the city's most prestigious markets.
                            </p>
                            <p>
                                Cole's technical expertise is bolstered by deep-rooted connections with Dallas' most respected builders and award-winning designers, allowing him to see beyond the aesthetic to the craftsmanship of a truly elite property. In a market where information is the ultimate advantage, his collaboration with a tight-knit circle of top-producing agents ensures his clients have a front-row seat to the exclusive, off-market landscape. Whether navigating a high-stakes negotiation or consulting on a custom new build, Cole remains a tenacious advocate and a sophisticated guide.
                            </p>
                            <p>
                                When he isn't scouting the next record-breaking estate, Cole is often found exploring Dallas' ever-evolving food scene, which he finds as fresh and dynamic as the local real estate market. An avid traveler, he frequently ventures across the globe to immerse himself in new cultures and architectural styles. This international perspective continuously expands his mindset, allowing him to bring fresh, innovative ideas back to his clients and the city he calls home.
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
                    <h2 className="section-title">A STRATEGIC ADVANTAGE</h2>
                    <p className="section-subtitle">Expert guidance and deep-rooted Dallas connections, tailored to your unique objectives.</p>
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
