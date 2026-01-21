import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getListingById } from '../data/listingsService';
import { SITE_CONFIG } from '../config';
import ContactModal from '../components/ContactModal';
import './PropertyDetails.css';
import './PropertyMap.css';
import './PropertyGallery.css';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activePhoto, setActivePhoto] = useState(0);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(1);
    const [slideDirection, setSlideDirection] = useState('left');
    const [showHeroOverlay, setShowHeroOverlay] = useState(true);
    const [thumbnailTrackRef, setThumbnailTrackRef] = useState(null);

    const photosLength = property?.photos?.length || 0;

    const nextHighlight = () => {
        setSlideDirection('left');
        setHighlightIndex(prev => {
            const next = prev + 1;
            // Wraps back to 1 if we exceed the photos length minus 1? 
            // Logic: index 0 is Hero. Valid indices are 1...photosLength-1.
            return next >= photosLength ? 1 : next;
        });
    };

    const prevHighlight = () => {
        setSlideDirection('right');
        setHighlightIndex(prev => {
            const next = prev - 1;
            // distinct photos are index 1 to photosLength-1 (skipping 0)
            return next < 1 ? (photosLength - 1 || 1) : next;
        });
    };

    // Helper to get the "Left" image index (next in queue)
    const getLeftIndex = (currentIndex) => {
        if (!photosLength) return 0;
        const next = currentIndex + 1;
        return next >= photosLength ? 1 : next;
    };

    // Auto-hide hero overlay after 2 seconds
    // Auto-hide hero overlay after 3.5 seconds (starts when content is loaded)
    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setShowHeroOverlay(false);
            }, 3500);

            return () => clearTimeout(timer);
        }
    }, [loading]);

    // Thumbnail scroll handlers
    const scrollThumbnails = (direction) => {
        if (thumbnailTrackRef) {
            const scrollAmount = 300;
            thumbnailTrackRef.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };



    useEffect(() => {
        const loadProperty = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getListingById(id);
                if (!data) {
                    throw new Error('Property not found');
                }
                setProperty(data);
                if (data.photos && data.photos.length > 0) {
                    setActivePhoto(0);
                }
            } catch (err) {
                console.error('Error loading property details:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProperty();
    }, [id]);

    // Ensure we scroll to top when content is ready
    useEffect(() => {
        if (!loading) {
            // Small timeout to ensure DOM is fully rendered/stabilized
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 10);
        }
    }, [loading]);

    if (loading) {
        return (
            <div className="property-details-loading">
                <div className="loader"></div>
                <p>Loading Property Details...</p>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="property-details-error">
                <h2>{error || 'Property Not Found'}</h2>
                <p>We couldn't find the listing you're looking for.</p>
                <Link to="/properties" className="back-btn">Back to Listings</Link>
            </div>
        );
    }

    const getPhotoUrl = (photo) => {
        if (!photo) return '';
        if (photo.startsWith('http')) return photo;
        // Check if SITE_CONFIG.mediaBaseUrl is defined, if not use a fallback or empty string
        const baseUrl = SITE_CONFIG.mediaBaseUrl || '';
        return `${baseUrl}/${photo}`;
    };

    const { raw } = property;
    const photos = property.photos || [];

    // Safe access to nested properties
    const interiorFeatures = Array.isArray(raw.property?.interiorFeatures) ? raw.property.interiorFeatures : [];
    const exteriorFeatures = Array.isArray(raw.property?.exteriorFeatures) ? raw.property.exteriorFeatures : [];
    const systemFeatures = Array.isArray(raw.property?.additionalDetails) ? raw.property.additionalDetails : [];

    return (
        <div className="property-details-page">
            {/* Gallery Section */}
            <section className="property-gallery">
                <div className="gallery-main">
                    {photos.length > 0 ? (
                        <>
                            {/* Dual image setup for smooth crossfade */}
                            <img
                                className="gallery-image current"
                                src={getPhotoUrl(photos[activePhoto])}
                                alt={`${property.address} - view ${activePhoto + 1}`}
                                key={`current-${activePhoto}`}
                            />
                            <img
                                className="gallery-image previous"
                                src={getPhotoUrl(photos[activePhoto === 0 ? photos.length - 1 : activePhoto - 1])}
                                alt="Previous view"
                                key={`prev-${activePhoto}`}
                            />
                        </>
                    ) : (
                        <div className="no-photo">No Photo Available</div>
                    )}

                    {/* Overlay Header - fades out after 2s */}
                    <div className={`hero-overlay ${!showHeroOverlay ? 'hidden' : ''}`}>
                        <div className="hero-content">
                            <h1 className="hero-title">{property.street || property.address}</h1>
                        </div>
                    </div>

                    {/* Photo Navigation Arrows */}
                    {photos.length > 1 && (
                        <>
                            <button
                                className="gallery-nav-btn prev"
                                onClick={() => setActivePhoto(prev => prev === 0 ? photos.length - 1 : prev - 1)}
                                aria-label="Previous photo"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                className="gallery-nav-btn next"
                                onClick={() => setActivePhoto(prev => prev === photos.length - 1 ? 0 : prev + 1)}
                                aria-label="Next photo"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnail Gallery */}
                {photos.length > 1 && (
                    <div className="gallery-thumbnails">
                        {/* Scroll Left Button */}
                        <button
                            className="thumb-scroll-btn scroll-left"
                            onClick={() => scrollThumbnails('left')}
                            aria-label="Scroll thumbnails left"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div
                            className="thumbnails-track"
                            ref={(el) => {
                                setThumbnailTrackRef(el);
                                if (el && activePhoto !== null) {
                                    const activeThumb = el.children[activePhoto];
                                    if (activeThumb) {
                                        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                                    }
                                }
                            }}
                        >
                            {photos.map((photo, index) => (
                                <button
                                    key={index}
                                    className={`thumbnail ${activePhoto === index ? 'active' : ''}`}
                                    onClick={() => setActivePhoto(index)}
                                >
                                    <img src={getPhotoUrl(photo)} alt={`View ${index + 1}`} />
                                </button>
                            ))}
                        </div>

                        {/* Scroll Right Button */}
                        <button
                            className="thumb-scroll-btn scroll-right"
                            onClick={() => scrollThumbnails('right')}
                            aria-label="Scroll thumbnails right"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}
            </section>

            <div className="property-content-container">
                {/* Property Header Area - Elevated and full width of container */}
                <header className="property-content-header">
                    <div className="header-main-info">
                        <div className="address-block">
                            <h2 className="full-address-line1">{property.street || property.address}</h2>
                            <p className="full-address-line2">{property.city}, {property.state} {property.zip}</p>
                        </div>
                        <div className="property-price-main">{property.priceFormatted}</div>
                    </div>
                </header>

                <div className="property-main-content-layout">
                    <div className="property-main-col">
                        {/* Header Info - Stats Only */}
                        <div className="property-stats-bar">
                            <div className="property-badges">
                                <div className="badge-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v11m18-11v11M3 11h18M7 11V7a2 2 0 012-2h6a2 2 0 012 2v4M5 11h14" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span>{property.beds} <span>Beds</span></span>
                                </div>
                                <div className="badge-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 7h10M5 11h14m-12 7h10M4 7v11a1 1 0 001 1h14a1 1 0 001-1V7a1 1 0 00-1-1H5a1 1 0 00-1 1z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span>{property.baths} <span>Baths</span></span>
                                </div>
                                <div className="badge-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3V3zm6 6v6m6-6v6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <span>{property.sqftFormatted} <span>Sq. Ft.</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Remarks/Description */}
                        <section className="property-description">
                            <h3>About this property</h3>
                            <p>{raw.remarks || "An exceptional property offering a blend of luxury and comfort in one of the most sought-after neighborhoods."}</p>
                        </section>

                        {/* Property Features */}
                        <section className="property-features">
                            <h3>Key Features</h3>
                            <div className="features-grid">
                                <div className="feature-group">
                                    <h4>Interior</h4>
                                    <ul>
                                        {interiorFeatures.length > 0 ? (
                                            interiorFeatures.map((f, i) => <li key={i}>{f}</li>)
                                        ) : (
                                            <>
                                                {raw.property?.flooring && <li>Flooring: {raw.property.flooring}</li>}
                                                {raw.property?.fireplaces > 0 && <li>Fireplaces: {raw.property.fireplaces}</li>}
                                                <li>Standard luxury interior</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                                <div className="feature-group">
                                    <h4>Exterior</h4>
                                    <ul>
                                        {exteriorFeatures.length > 0 ? (
                                            exteriorFeatures.map((f, i) => <li key={i}>{f}</li>)
                                        ) : (
                                            <>
                                                {raw.property?.lotSize && <li>Lot Size: {raw.property.lotSize}</li>}
                                                {raw.property?.construction && <li>Construction: {raw.property.construction}</li>}
                                                <li>Professionally landscaped</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* MLS Info */}
                        <section className="property-mls-info">
                            <div className="mls-data-item">
                                <span>MLS® Number:</span>
                                <span>{property.mlsId}</span>
                            </div>
                            <div className="mls-data-item">
                                <span>Property Type:</span>
                                <span>{property.type}</span>
                            </div>
                            <div className="mls-data-item">
                                <span>Year Built:</span>
                                <span>{property.yearBuilt || 'N/A'}</span>
                            </div>
                            <div className="mls-data-item">
                                <span>Status:</span>
                                <span>{property.status}</span>
                            </div>
                        </section>

                        <div className="mls-disclaimer">
                            Listing courtesy of {property.office?.name || raw.office?.name || 'MLS Participating Broker'}. Data provided by SimplyRETS. All information deemed reliable but not guaranteed.
                        </div>

                    </div>
                </div>
            </div>

            {/* Contact Banner - Full Width */}
            <div className="contact-banner">
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


            {/* Property Location Map */}
            <section className="property-map-section">
                <iframe
                    title="Property Location"
                    width="100%"
                    height="600"
                    style={{ border: 0, display: 'block' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${SITE_CONFIG.googleMaps.apiKey}&q=${encodeURIComponent(property.address)}&zoom=17&maptype=roadmap`}
                />
            </section>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </div >
    );
};

export default PropertyDetails;
