import { useState } from 'react';
import { mockListings } from '../modules/property-search/api/mockData';
import useFavorites from '../hooks/useFavorites';
import OptimizedImage from '../components/common/OptimizedImage';
import './Favorites.css';

const Favorites = () => {
    const { favorites, toggleFavorite } = useFavorites();

    // Get favorite listings
    const favoriteListings = mockListings.filter(listing =>
        favorites.includes(listing.id)
    );

    const formatPrice = (price) => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(1)}M`;
        }
        return `$${price.toLocaleString()}`;
    };

    return (
        <div className="favorites-page">
            <section className="favorites-hero">
                <div className="container">
                    <h1>MY FAVORITES</h1>
                    <p>{favorites.length} {favorites.length === 1 ? 'Property' : 'Properties'} Saved</p>
                </div>
            </section>

            <section className="favorites-content">
                <div className="container">
                    {favoriteListings.length === 0 ? (
                        <div className="favorites-empty">
                            <div className="empty-icon">♥</div>
                            <h2>No Favorites Yet</h2>
                            <p>Start adding properties to your favorites to see them here.</p>
                        </div>
                    ) : (
                        <div className="favorites-grid">
                            {favoriteListings.map((listing) => (
                                <div key={listing.id} className="favorite-card">
                                    <div className="favorite-image">
                                        <OptimizedImage src={listing.image} alt={listing.address} width={800} />
                                        <button
                                            className="favorite-btn active"
                                            onClick={() => toggleFavorite(listing.id)}
                                            aria-label="Remove from favorites"
                                        >
                                            ♥
                                        </button>
                                        <div className="property-status">{listing.status}</div>
                                    </div>
                                    <div className="favorite-details">
                                        <div className="favorite-price">{formatPrice(listing.price)}</div>
                                        <div className="favorite-address">
                                            {listing.address}
                                            <br />
                                            {listing.city}, {listing.state} {listing.zipCode}
                                        </div>
                                        <div className="favorite-specs">
                                            {listing.beds} BD | {listing.baths} BA | {listing.sqftFormatted} SQ.FT.
                                        </div>
                                        <div className="favorite-type">{listing.propertyType}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Favorites;
