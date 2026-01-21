import { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getListingById } from '../data/listingsService';
import { SITE_CONFIG } from '../config';
import ContactModal from '../components/ContactModal';
import './PropertyPhotoGrid.css';
import './PropertyDetails.css'; // Reuse banner styles

const PropertyPhotoGrid = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // Scroll to top immediately
    useLayoutEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [id]);

    useEffect(() => {
        const loadProperty = async () => {
            try {
                setLoading(true);
                const data = await getListingById(id);
                if (data) {
                    setProperty(data);
                }
            } catch (err) {
                console.error('Error loading property:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProperty();
    }, [id]);

    const getPhotoUrl = (photo) => {
        if (!photo) return '';
        if (photo.startsWith('http') || photo.startsWith('/')) return photo;
        const baseUrl = SITE_CONFIG.mediaBaseUrl || '';
        return `${baseUrl}/${photo}`;
    };

    if (loading) {
        return <div className="loading-screen">Loading...</div>;
    }

    if (!property) {
        return <div>Property not found</div>;
    }

    const photos = property.photos || [];

    return (
        <div className="photo-grid-page">
            <header className="photo-grid-header">
                <div className="photo-grid-header-content">
                    <Link to={`/property/${id}`} className="back-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Property
                    </Link>
                    <div className="grid-address">
                        <h1>{property.street || property.address}</h1>
                        <p>{property.city}, {property.state}</p>
                    </div>
                </div>
            </header>

            <main className="photo-grid-container">
                <div className="photo-grid">
                    {photos.map((photo, index) => (
                        <div key={index} className="photo-grid-item">
                            <img src={getPhotoUrl(photo)} alt={`View ${index + 1}`} loading="lazy" />
                        </div>
                    ))}
                </div>

                {/* Contact Banner Reuse */}
                <div className="contact-banner" style={{ marginTop: '80px', marginBottom: '0' }}>
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
            </main>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </div>
    );
};

export default PropertyPhotoGrid;
