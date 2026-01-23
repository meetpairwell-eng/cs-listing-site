import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import ContactModal from '../components/ContactModal';
import Contact from '../components/Contact';
import './AboutCole.css';
import './PropertyDetails.css'; // For contact-banner styles

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

    const showcaseItems = SITE_CONFIG.aboutCole?.showcaseImages || [];

    return (
        <div className="about-cole-page">
            {/* Hero Section */}
            <section className="cole-hero">
                <div className="cole-hero-background">
                    <img
                        src={getMediaUrl(SITE_CONFIG.aboutCole?.heroImage?.r2Path, SITE_CONFIG.aboutCole?.heroImage?.fallback)}
                        alt="Luxury home"
                        onError={(e) => {
                            e.target.src = SITE_CONFIG.aboutCole?.heroImage?.fallback;
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
                                As a Dallas native, Cole Swearingen offers his clients a genuine "insider" perspective on the DFW Metroplex. His background as a Sales Director in the hospitality industry shaped his client-first approach, ensuring that everyone he works with feels supported and heard. Since joining Compass and the Laguna Residential Group in 2018, Cole has built a reputation for being a reliable and resilient advisor, helping people find their way through the city's competitive real estate market with ease.
                            </p>
                            <p>
                                Cole's local expertise is backed by strong relationships with respected builders and designers, giving him a great eye for quality construction and home potential. He stays connected with a close circle of top agents to make sure his clients get a first look at great properties, including those not yet on the market.
                            </p>
                            <p>
                                When he isn't busy with real estate, Cole loves exploring the local Dallas food scene or traveling the world to gain inspiration from different cultures and architecture - experiences he uses to bring fresh, creative ideas back home to his clients.
                            </p>
                            <button onClick={() => setIsContactModalOpen(true)} className="cole-cta-button">
                                GET IN TOUCH
                            </button>
                        </div>
                        <div className="cole-about-image">
                            <img
                                src={getMediaUrl(SITE_CONFIG.aboutCole?.headshot?.r2Path, SITE_CONFIG.aboutCole?.headshot?.fallback)}
                                alt="Cole Swearingen professional"
                                onError={(e) => {
                                    e.target.src = SITE_CONFIG.aboutCole?.headshot?.fallback;
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
                    <h2 className="section-title">DEFINING THE PROFESSIONAL STANDARD</h2>
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

            {/* Elevated Showcase Section (V2) */}
            <section className="cole-showcase-elevated">
                <div className="elevated-header">
                    <h2 className="section-title" style={{ color: '#000', marginBottom: '1rem' }}>ELEVATED EDIT (V2)</h2>
                    <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#666' }}>Comparing styles - this content uses zero-gap layout + parallax effect.</p>
                </div>

                {showcaseItems.map((item, index) => (
                    <div key={index} className={`elevated-row ${index % 2 === 1 ? 'reverse' : ''}`}>
                        <div className="elevated-image">
                            <img
                                src={getMediaUrl(item.r2Path, item.fallback)}
                                alt={item.title}
                                onError={(e) => {
                                    e.target.src = item.fallback;
                                }}
                            />
                        </div>
                        <div className="elevated-text-panel">
                            <div className="elevated-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Contact Banner Reuse */}
            <div className="contact-banner" style={{ marginTop: '0', marginBottom: '0' }}>
                <div className="contact-banner-inner">
                    <div className="banner-content">
                        <img src={`${SITE_CONFIG.mediaBaseUrl}/${SITE_CONFIG.headshot}`} alt={SITE_CONFIG.agentName} className="banner-thumb" />
                        <div className="banner-text">
                            <p>Presented by</p>
                            <h3>{SITE_CONFIG.agentName}</h3>
                            <p>{SITE_CONFIG.agency}</p>
                        </div>
                    </div>
                    <div className="banner-cta">
                        <button className="banner-btn" onClick={() => setIsContactModalOpen(true)}>Inquire about this home</button>
                        <div className="banner-links">
                            <a href={`tel:${SITE_CONFIG.agentPhone?.replace(/\D/g, '')}`}>{SITE_CONFIG.agentPhone}</a>
                            <a href={`mailto:${SITE_CONFIG.agentEmail}`}>{SITE_CONFIG.agentEmail}</a>
                        </div>
                    </div>
                </div>
            </div>

            <Contact onContactClick={() => setIsContactModalOpen(true)} />

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </div>
    );
};

export default AboutCole;
