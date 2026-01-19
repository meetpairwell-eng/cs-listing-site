import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPropertyById } from '../api/idxService';
import { SITE_CONFIG } from '../config';
import ContactModal from '../components/ContactModal';
import './PropertyDetails.css';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activePhoto, setActivePhoto] = useState(0);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    useEffect(() => {
        const loadProperty = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchPropertyById(id);
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
        window.scrollTo(0, 0);
    }, [id]);

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
                        <img src={photos[activePhoto]} alt={`${property.address} - view ${activePhoto + 1}`} />
                    ) : (
                        <div className="no-photo">No Photo Available</div>
                    )}

                    {/* Overlay Header */}
                    <div className="hero-overlay">
                        <div className="hero-content">
                            <h1 className="hero-title">{property.street || property.address}</h1>
                        </div>
                    </div>
                </div>
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

                        {/* Contact Banner - Solid and Wide */}
                        <div className="contact-banner">
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
                </div>
            </div>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </div>
    );
};

export default PropertyDetails;
