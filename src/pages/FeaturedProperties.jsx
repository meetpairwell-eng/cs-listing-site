import { useState, useEffect } from 'react';
import { mockListings } from '../modules/property-search/api/mockData';
import './FeaturedProperties.css';

const FeaturedProperties = () => {
    const [featuredListings, setFeaturedListings] = useState([]);
    const [soldListings, setSoldListings] = useState([]);

    useEffect(() => {
        // Filter listings by status
        const featured = mockListings.filter(listing =>
            listing.status === 'For sale' || listing.status === 'Active'
        );
        const sold = mockListings.filter(listing =>
            listing.status === 'Sold'
        );

        setFeaturedListings(featured.slice(0, 6)); // Show first 6 featured
        setSoldListings(sold.slice(0, 6)); // Show first 6 sold
    }, []);

    const formatPrice = (price) => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(1)}M`;
        }
        return `$${price.toLocaleString()}`;
    };

    const PropertyCard = ({ listing }) => (
        <div className="featured-property-card">
            <div className="featured-property-image">
                <img src={listing.image} alt={listing.address} />
                <div className="featured-property-status">
                    <span className="status-badge">{listing.status}</span>
                    {listing.mlsId && (
                        <span className="mls-badge">MLS® {listing.mlsId}</span>
                    )}
                </div>
            </div>
            <div className="featured-property-info">
                <h3 className="featured-property-price">{formatPrice(listing.price)}</h3>
                <p className="featured-property-address">{listing.address}</p>
                <div className="featured-property-details">
                    <span>{listing.beds} BD</span>
                    <span>{listing.baths} BA</span>
                    <span>{listing.sqft.toLocaleString()} Sq.Ft.</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="featured-properties-page">
            {/* Hero Section */}
            <section className="featured-hero">
                <div className="featured-hero-content">
                    <h1>FEATURED PROPERTIES</h1>
                </div>
            </section>

            {/* Featured Properties Grid */}
            <section className="featured-section">
                <div className="featured-container">
                    <h2 className="featured-section-title">For Sale</h2>
                    <div className="featured-grid">
                        {featuredListings.map((listing) => (
                            <PropertyCard key={listing.id} listing={listing} />
                        ))}
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
