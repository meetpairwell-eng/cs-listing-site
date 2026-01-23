import { Link } from 'react-router-dom';
import useFavorites from '../../../hooks/useFavorites';

const PropertyCard = ({ listing, onSelect, isSelected }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(listing.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(listing.id);
    };

    const handleCardClick = () => {
        if (onSelect) {
            onSelect(listing);
        }
    };

    const isMLSProperty = listing.source === 'mls';
    const isOffMarket = listing.isOffMarket === true;

    return (
        <Link
            to={`/property/${listing.id}`}
            className={`property-card ${isSelected ? 'selected' : ''}`}
            onClick={handleCardClick}
        >
            <div className="property-image">
                <img src={listing.image} alt={listing.address} />
                <button
                    className={`favorite-btn ${favorite ? 'active' : ''}`}
                    onClick={handleFavoriteClick}
                    aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <svg viewBox="0 0 24 24" fill={favorite ? '#ff4d4d' : 'none'} stroke={favorite ? '#ff4d4d' : 'currentColor'} strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
                {listing.status === 'Sold' && (
                    <div className="property-status-badge">SOLD</div>
                )}
                {isOffMarket && (
                    <div className="property-off-market-badge">OFF-MARKET</div>
                )}
            </div>
            <div className="property-details">
                <div className="property-price">{listing.priceFormatted || listing.price}</div>
                <div className="property-address">{listing.address}</div>
                <div className="property-specs">
                    {listing.beds} bd | {listing.baths} ba | {listing.sqftFormatted || listing.sqft} sqft
                </div>
                {isMLSProperty && listing.mlsId && (
                    <div className="property-mls">
                        MLS®: {listing.mlsId}
                    </div>
                )}
            </div>
        </Link>
    );
};

export default PropertyCard;
