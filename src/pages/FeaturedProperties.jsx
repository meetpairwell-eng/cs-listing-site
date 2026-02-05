import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveListings, getSoldListings } from '../data/listingsService';
import './FeaturedProperties.css';

const FeaturedProperties = () => {
    const navigate = useNavigate();
    const [featuredListings, setFeaturedListings] = useState([]);
    const [soldListings, setSoldListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);

                // Get manual active and sold listings from our service
                const activeData = await getActiveListings();
                const soldData = await getSoldListings();

                setFeaturedListings(activeData);
                setSoldListings(soldData);
            } catch (error) {
                console.error('Error loading property portfolio:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, []);

    const PropertyCard = ({ listing }) => (
        <div
            className="featured-property-card"
            onClick={() => navigate(`/property/${listing.id}`)}
            style={{ cursor: 'pointer' }}
        >
            <div className="featured-property-image">
                <img src={listing.image} alt={listing.address} />
                <div className="featured-property-status">
                    <span className="status-badge">{listing.status}</span>
                </div>
            </div>
            <div className="featured-property-info">
                <div className="featured-property-price">{listing.priceFormatted}</div>
                <div className="featured-property-address">{listing.address}</div>
                <div className="featured-property-details">
                    <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v11m18-11v11M3 11h18M7 11V7a2 2 0 012-2h6a2 2 0 012 2v4M5 11h14" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span>{listing.beds}</span>
                    </div>
                    <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 7h10M5 11h14m-12 7h10M4 7v11a1 1 0 001 1h14a1 1 0 001-1V7a1 1 0 00-1-1H5a1 1 0 00-1 1z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span>{listing.baths}</span>
                    </div>
                    <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3V3zm6 6v6m6-6v6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span>{listing.sqftFormatted} <small>SQFT</small></span>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="featured-properties-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <p>Loading Curated Properties...</p>
            </div>
        );
    }

    return (
        <div className="featured-properties-page">
            {/* Hero Section */}
            <section className="featured-hero">
                <div className="featured-hero-content">
                    <h1>PORTFOLIO</h1>
                </div>
            </section>

            {/* Featured Properties Grid */}
            <section className="featured-section">
                <div className="featured-container">
                    <h2 className="featured-section-title">Active Listings</h2>
                    <div className="featured-grid">
                        {featuredListings.length > 0 ? (
                            featuredListings.map((listing) => (
                                <PropertyCard key={listing.id} listing={listing} />
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No demo properties found in this price range.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Sold Properties Grid */}
            {soldListings.length > 0 && (
                <section className="featured-section">
                    <div className="featured-container">
                        <h2 className="featured-section-title">Sold Properties</h2>
                        <div className="featured-grid">
                            {soldListings.map((listing) => (
                                <PropertyCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default FeaturedProperties;
