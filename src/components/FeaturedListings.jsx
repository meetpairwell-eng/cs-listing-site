import { Link } from 'react-router-dom';
import { getNotableSales } from '../data/listingsService';
import { SITE_CONFIG } from '../config';
import useFavorites from '../hooks/useFavorites';
import './FeaturedListings.css';

const FeaturedListings = () => {
    // Get notable sales (manually curated featured properties)
    const listings = getNotableSales(4);
    const { isFavorite, toggleFavorite } = useFavorites();

    const getMediaUrl = (filename) => {
        return `${SITE_CONFIG.mediaBaseUrl}/${filename}`;
    };

    const handleFavoriteClick = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
    };

    return (
        <section id="listings" className="section listings-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2>NOTABLE SALES</h2>
                </div>

                <div className="listings-grid">
                    {listings.map((listing) => {
                        const favorite = isFavorite(listing.id);
                        return (
                            <Link
                                key={listing.id}
                                to={`/property/${listing.id}`}
                                className="listing-card"
                            >
                                <div className="listing-image">
                                    <img
                                        src={getMediaUrl(listing.heroImage)}
                                        alt={listing.title}
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
                                        }}
                                    />
                                    <button
                                        className={`favorite-btn ${favorite ? 'active' : ''}`}
                                        onClick={(e) => handleFavoriteClick(e, listing.id)}
                                        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                                    >
                                        <svg viewBox="0 0 24 24" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                    </button>
                                    <div className="listing-status">{listing.status}</div>
                                    {listing.customBadge && (
                                        <div className="listing-badge">{listing.customBadge}</div>
                                    )}
                                </div>

                                <div className="listing-content">
                                    <h3 className="listing-title">{listing.title}</h3>
                                    <p className="listing-address">{listing.address}</p>
                                    <p className="listing-specs">
                                        {listing.specs.beds} BD | {listing.specs.baths} BA | {listing.specs.sqft} SQ.FT.
                                    </p>
                                    <div className="listing-price">{listing.price}</div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedListings;
